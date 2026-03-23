# Primary Cell Assessment Application - Product Requirements Document

## Original Problem Statement
Replace an existing 17-page assessment with a new, complex 7-question quiz funnel. The new funnel involves extensive branching logic based on user answers, leading to different paths for qualifying, disqualifying, and manual review candidates. The project includes displaying educational content between questions, specific UI/UX interactions, creating a final "Congratulations" page with a contact form and case study video, and setting up the necessary backend API endpoints.

## Target Users
- Individuals experiencing chronic pain conditions seeking cellular repair treatment
- Primarily targeting users with conditions lasting more than 6 months

## Core Requirements

### Quiz Flow Structure
1. **Q1 Duration**: Pain duration screening (< 6 months = disqualify)
2. **Q2 Treatments**: Previous treatments tried
3. **Educational Pages**: Content between Q2 and Q3
4. **Q3 Conditions**: Select conditions (treatable vs non-treatable routing)
5. **Primary Cell Explanation Pages**: Educational content
6. **Q4-Q7**: Additional qualifying questions
7. **Congratulations Pages**: Contact form + case study video

### Routing Logic
- **Qualified**: Users with treatable conditions go to standard Congratulations page
- **Disqualified (Too Soon)**: Pain duration < 6 months
- **Disqualified (Non-Treatable)**: Only non-treatable conditions selected
- **Manual Review**: "Other" conditions requiring practitioner review
- **Alternative Path**: Users with "Other" conditions that proceed

### Conditional Sentence Logic (Recently Implemented)
On Congratulations pages, the italicized sentence:
*"While Chad's case demonstrates neck and back pain, the subcellular repair process works the same for your [conditions]."*

**Display Rules:**
- Show ONLY if user did NOT select 'chronic_back_pain' or 'chronic_neck_pain'
- Must have at least one treatable condition to display

---

## Implementation Status

### Completed Features
- [x] Full 7-question quiz flow with routing
- [x] State persistence with sessionStorage
- [x] Internal Terms & Conditions page (/quiz/terms-and-conditions)
- [x] Internal Privacy Policy page (/quiz/privacy-policy)
- [x] Shared QuizFooter component with legal links
- [x] Back arrow navigation on all quiz pages
- [x] Conditional sentence logic on Congratulations pages
- [x] Form validation on contact forms
- [x] Vite host configuration for preview domains
- [x] Ad copy updates across all pages

### Verified (Code Review - Feb 2026)
- [x] Conditional sentence logic verified correct through testing agent code review
- [x] Logic tests all pass (neck pain hidden, back pain hidden, other conditions shown)
- [x] Both Congratulations.tsx and CongratulationsAlternative.tsx have identical logic
- [x] No lint errors

### Pending Testing
- [ ] UI automation testing blocked by preview URL unavailability

### Backup Documentation
- [x] Comprehensive QUIZ_FUNNEL_BACKUP.md generated (1012 lines) with full funnel backup
- [x] Vertical bar alternative standardized to "light background tint" style across all pages

---

## Upcoming Tasks (P1)

### Task 1: Calendar Booking Widget
- **Location**: `/app/src/pages/Quiz/Welcome.tsx`
- **Action**: Replace current placeholder with actual booking system integration
- **Awaiting**: User to provide booking system details (Calendly or other)

### Task 2: Email & SMS Automation
- **Location**: `/app/backend/app/routers/quiz.py`
- **Action**: Add trigger logic to `/api/quiz/submit` endpoint
- **Awaiting**: User to provide email/SMS service details

---

## Future Tasks (P2)

### Task 1: Wistia Video Integration
- Replace YouTube placeholder with Wistia embed in Welcome.tsx
- **Awaiting**: Wistia video URL from user

### Task 2: SMS & Privacy Policy Link
- Add proper link to "SMS & Privacy Policy" text on congratulations pages
- **Awaiting**: Link URL from user

---

## Technical Architecture

### Frontend
- React + TypeScript + Vite
- State Management: Context API + useReducer
- Persistence: sessionStorage
- Styling: CSS Modules
- Animation: Framer Motion

### Backend
- FastAPI + Python
- Database: MongoDB

### Key Files
```
/app/
├── src/
│   ├── context/QuizContext.tsx       # State management
│   ├── pages/Quiz/
│   │   ├── Congratulations.tsx       # Standard completion page
│   │   ├── CongratulationsAlternative.tsx  # Alternative completion
│   │   ├── QuizFooter.tsx           # Shared footer
│   │   ├── TermsAndConditions.tsx   # Legal page
│   │   └── PrivacyPolicy.tsx        # Legal page
├── backend/
│   └── app/routers/quiz.py          # Quiz API endpoints
```

### API Endpoints
- `POST /api/quiz/analyze-conditions` - Analyze user conditions
- `POST /api/quiz/submit-contact` - Submit contact form
- `GET /api/health` - Health check

---

## Known Constraints
- Preview URL requires platform activity to stay active
- Calendar booking, Wistia video, and email/SMS are placeholders (MOCKED)

---

## Changelog
- **Feb 2026**: Generated comprehensive QUIZ_FUNNEL_BACKUP.md (1012 lines) with all branching logic, ad copy, design specs, routing rules
- **Feb 2026**: Standardized vertical bar alternative style to "light background tint" across EducationQ2A, EducationQ2ANone, and DisqualifiedTooSoon
- **Feb 15, 2026**: Verified conditional sentence logic through code review and unit testing
- **Previous Session**: Implemented sessionStorage persistence, internal legal pages, UI/UX overhaul
