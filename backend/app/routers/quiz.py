"""
Quiz Router
Handles the new quiz assessment flow with branching logic
"""

from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

router = APIRouter()

# ============================================================================
# REQUEST/RESPONSE MODELS
# ============================================================================

class QuizResponse(BaseModel):
    """Quiz response data model"""
    # Quiz ID
    quiz_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    
    # Q1: Time Duration
    pain_duration: Optional[str] = None  # "6_months_or_less" or "more_than_6_months"
    
    # Q2: Treatments
    treatments_tried: Optional[List[str]] = None
    pain_medications_types: Optional[List[str]] = None
    
    # Q3: Conditions
    conditions: Optional[List[str]] = None
    condition_other: Optional[str] = None
    
    # Q4: What's Missing
    missing_activities: Optional[List[str]] = None
    missing_other: Optional[str] = None
    
    # Q5: Urgency
    urgency_level: Optional[str] = None
    
    # Q6: Annual Spending
    annual_spending: Optional[str] = None
    
    # Q7: Questions
    open_questions: Optional[str] = None
    
    # Contact Information
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    
    # Metadata
    qualification_status: Optional[str] = None  # "qualified", "disqualified_too_soon", "disqualified_non_treatable", "manual_review"
    treatable_conditions: Optional[List[str]] = None
    non_treatable_conditions: Optional[List[str]] = None
    
    # Timestamps
    started_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
    
    # Additional fields
    approximate_pain_start_date: Optional[str] = None  # For disqualified_too_soon
    wants_notification: Optional[bool] = None  # For disqualified users


class ContactFormSubmission(BaseModel):
    """Contact form submission from congratulations page"""
    quiz_id: str
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10)
    consent_to_text: bool = True


class QuizAnalysisResponse(BaseModel):
    """Response containing quiz analysis and routing"""
    qualification_status: str
    treatable_conditions: List[str]
    non_treatable_conditions: List[str]
    should_show_primary_cell: bool
    should_show_alternative_primary_cell: bool
    requires_manual_review: bool
    disqualification_reason: Optional[str] = None


# ============================================================================
# CONDITION CATEGORIZATION
# ============================================================================

TREATABLE_CONDITIONS = {
    "chronic_back_pain",
    "chronic_neck_pain",
    "bone_on_bone_joint_pain",
    "old_injury_pain",
    "herniated_bulging_disc",
    "sciatica_constant",
    "spinal_stenosis_spondylosis",
    "si_joint_pain",
    "pelvic_pain",
    "mystery_pain",
}

NON_TREATABLE_CONDITIONS = {
    "chronic_fatigue_syndrome",
    "autoimmune_diseases",
    "fibromyalgia",
    "infectious_diseases",
    "endocrine_disorders",
    "gastrointestinal_disorders",
}


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def analyze_conditions(conditions: List[str], has_other: bool = False) -> QuizAnalysisResponse:
    """
    Analyze selected conditions and determine qualification status
    
    Args:
        conditions: List of condition IDs selected by user
        has_other: Whether user entered a custom "Other" condition
        
    Returns:
        QuizAnalysisResponse with routing information
    """
    condition_set = set(conditions)
    
    # Separate treatable and non-treatable
    treatable = list(condition_set & TREATABLE_CONDITIONS)
    non_treatable = list(condition_set & NON_TREATABLE_CONDITIONS)
    
    # Determine routing logic
    has_treatable = len(treatable) > 0
    has_non_treatable = len(non_treatable) > 0
    
    # Case 1: Other only
    if has_other and not has_treatable and not has_non_treatable:
        return QuizAnalysisResponse(
            qualification_status="manual_review",
            treatable_conditions=[],
            non_treatable_conditions=[],
            should_show_primary_cell=False,
            should_show_alternative_primary_cell=True,
            requires_manual_review=True,
        )
    
    # Case 2: Other + treatable only
    if has_other and has_treatable and not has_non_treatable:
        return QuizAnalysisResponse(
            qualification_status="qualified",
            treatable_conditions=treatable,
            non_treatable_conditions=[],
            should_show_primary_cell=True,
            should_show_alternative_primary_cell=False,
            requires_manual_review=True,  # Flag for review but proceed
        )
    
    # Case 3: Other + non-treatable (with or without treatable)
    if has_other and has_non_treatable:
        return QuizAnalysisResponse(
            qualification_status="manual_review",
            treatable_conditions=treatable,
            non_treatable_conditions=non_treatable,
            should_show_primary_cell=False,
            should_show_alternative_primary_cell=True,
            requires_manual_review=True,
        )
    
    # Case 4: Only treatable conditions
    if has_treatable and not has_non_treatable:
        return QuizAnalysisResponse(
            qualification_status="qualified",
            treatable_conditions=treatable,
            non_treatable_conditions=[],
            should_show_primary_cell=True,
            should_show_alternative_primary_cell=False,
            requires_manual_review=False,
        )
    
    # Case 5: Only non-treatable conditions
    if has_non_treatable and not has_treatable:
        return QuizAnalysisResponse(
            qualification_status="disqualified_non_treatable",
            treatable_conditions=[],
            non_treatable_conditions=non_treatable,
            should_show_primary_cell=False,
            should_show_alternative_primary_cell=False,
            requires_manual_review=False,
            disqualification_reason="non_treatable_only",
        )
    
    # Case 6: Mixed (treatable + non-treatable, no other)
    if has_treatable and has_non_treatable:
        return QuizAnalysisResponse(
            qualification_status="qualified",
            treatable_conditions=treatable,
            non_treatable_conditions=non_treatable,
            should_show_primary_cell=True,
            should_show_alternative_primary_cell=False,
            requires_manual_review=False,
        )
    
    # Default: shouldn't reach here but handle gracefully
    return QuizAnalysisResponse(
        qualification_status="manual_review",
        treatable_conditions=[],
        non_treatable_conditions=[],
        should_show_primary_cell=False,
        should_show_alternative_primary_cell=True,
        requires_manual_review=True,
    )


# ============================================================================
# API ENDPOINTS
# ============================================================================

@router.post("/analyze-conditions")
async def analyze_conditions_endpoint(conditions: List[str], condition_other: Optional[str] = None):
    """
    Analyze selected conditions and return routing information
    
    This endpoint determines:
    - Qualification status
    - Which educational page to show
    - Whether manual review is needed
    """
    has_other = bool(condition_other and condition_other.strip())
    analysis = analyze_conditions(conditions, has_other)
    
    return analysis


@router.post("/submit-quiz")
async def submit_quiz(quiz_data: QuizResponse):
    """
    Submit complete quiz response
    
    Stores quiz data and returns submission confirmation
    """
    try:
        # In production, save to MongoDB
        # For now, just validate and return success
        
        quiz_data.completed_at = datetime.utcnow()
        
        return {
            "success": True,
            "quiz_id": quiz_data.quiz_id,
            "qualification_status": quiz_data.qualification_status,
            "message": "Quiz response recorded successfully",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting quiz: {str(e)}")


@router.post("/submit-contact")
async def submit_contact_form(contact: ContactFormSubmission):
    """
    Submit contact form from congratulations page
    
    Triggers email/SMS automation (placeholder for now)
    """
    try:
        # In production:
        # 1. Save contact info to database
        # 2. Trigger welcome email with video link
        # 3. Trigger welcome SMS
        # 4. If manual review needed, flag for practitioner
        
        return {
            "success": True,
            "message": "Contact information received",
            "redirect_to": "/welcome",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting contact form: {str(e)}")


@router.post("/disqualified-waiting-list")
async def submit_waiting_list(
    quiz_id: str,
    name: str,
    email: EmailStr,
    phone: str,
    approximate_pain_start_date: Optional[str] = None,
):
    """
    Submit waiting list form for disqualified users (too soon)
    
    Stores contact info for future follow-up
    """
    try:
        # In production:
        # 1. Save to waiting list database
        # 2. Calculate follow-up date (6 months from pain start)
        # 3. Schedule automated email/SMS for future
        
        return {
            "success": True,
            "message": "Added to waiting list successfully",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding to waiting list: {str(e)}")


@router.post("/disqualified-notify-me")
async def submit_notify_me(
    quiz_id: str,
    name: str,
    email: EmailStr,
    phone: str,
    non_treatable_conditions: List[str],
):
    """
    Submit notification request for non-treatable conditions
    
    Stores contact info for future updates when techniques are developed
    """
    try:
        # In production:
        # 1. Save to notification list database
        # 2. Tag with specific conditions they're interested in
        
        return {
            "success": True,
            "message": "Notification preferences saved",
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving notification: {str(e)}")


# ============================================================================
# PLACEHOLDER ENDPOINTS FOR FUTURE EMAIL/SMS
# ============================================================================

@router.post("/send-welcome-email")
async def send_welcome_email_placeholder(email: EmailStr, name: str, video_link: str):
    """
    PLACEHOLDER: Send welcome email with video link
    
    To be implemented when email service is ready
    """
    return {
        "success": True,
        "message": "Email endpoint ready - connect your email service to activate",
        "placeholder": True,
    }


@router.post("/send-welcome-sms")
async def send_welcome_sms_placeholder(phone: str, name: str):
    """
    PLACEHOLDER: Send welcome SMS
    
    To be implemented when SMS service is ready
    """
    return {
        "success": True,
        "message": "SMS endpoint ready - connect your SMS service to activate",
        "placeholder": True,
    }
