/**
 * Quiz Context
 * Manages state for the new quiz assessment flow
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';

// ============================================================================
// TYPES
// ============================================================================

export interface QuizState {
  quizId: string;
  currentStep: number;
  
  // Q1: Time Duration
  painDuration: '' | '6_months_or_less' | 'more_than_6_months';
  
  // Q2: Treatments
  treatmentsTried: string[];
  painMedicationsTypes: string[];
  
  // Q3: Conditions
  conditions: string[];
  conditionOther: string;
  
  // Q4: What's Missing
  missingActivities: string[];
  missingOther: string;
  
  // Q5: Urgency
  urgencyLevel: string;
  
  // Q6: Annual Spending
  annualSpending: string;
  
  // Q7: Questions
  openQuestions: string;
  
  // Contact Info
  name: string;
  email: string;
  phone: string;
  
  // Routing state
  qualificationStatus: 'qualified' | 'disqualified_too_soon' | 'disqualified_non_treatable' | 'manual_review' | '';
  treatableConditions: string[];
  nonTreatableConditions: string[];
  requiresManualReview: boolean;
  
  // Disqualification data
  approximatePainStartDate: string;
  wantsNotification: boolean;
}

type QuizAction =
  | { type: 'SET_PAIN_DURATION'; payload: QuizState['painDuration'] }
  | { type: 'SET_TREATMENTS_TRIED'; payload: string[] }
  | { type: 'SET_PAIN_MEDICATIONS_TYPES'; payload: string[] }
  | { type: 'SET_CONDITIONS'; payload: string[] }
  | { type: 'SET_CONDITION_OTHER'; payload: string }
  | { type: 'SET_MISSING_ACTIVITIES'; payload: string[] }
  | { type: 'SET_MISSING_OTHER'; payload: string }
  | { type: 'SET_URGENCY_LEVEL'; payload: string }
  | { type: 'SET_ANNUAL_SPENDING'; payload: string }
  | { type: 'SET_OPEN_QUESTIONS'; payload: string }
  | { type: 'SET_CONTACT_INFO'; payload: { name: string; email: string; phone: string } }
  | { type: 'SET_QUALIFICATION_STATUS'; payload: Partial<Pick<QuizState, 'qualificationStatus' | 'treatableConditions' | 'nonTreatableConditions' | 'requiresManualReview'>> }
  | { type: 'SET_APPROXIMATE_PAIN_START_DATE'; payload: string }
  | { type: 'SET_WANTS_NOTIFICATION'; payload: boolean }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'RESET' };

interface QuizContextType {
  state: QuizState;
  setPainDuration: (duration: QuizState['painDuration']) => void;
  setTreatmentsTried: (treatments: string[]) => void;
  setPainMedicationsTypes: (types: string[]) => void;
  setConditions: (conditions: string[]) => void;
  setConditionOther: (other: string) => void;
  setMissingActivities: (activities: string[]) => void;
  setMissingOther: (other: string) => void;
  setUrgencyLevel: (urgency: string) => void;
  setAnnualSpending: (spending: string) => void;
  setOpenQuestions: (questions: string) => void;
  setContactInfo: (info: { name: string; email: string; phone: string }) => void;
  setQualificationStatus: (status: Partial<Pick<QuizState, 'qualificationStatus' | 'treatableConditions' | 'nonTreatableConditions' | 'requiresManualReview'>>) => void;
  setApproximatePainStartDate: (date: string) => void;
  setWantsNotification: (wants: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: QuizState = {
  quizId: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  currentStep: 1,
  painDuration: '',
  treatmentsTried: [],
  painMedicationsTypes: [],
  conditions: [],
  conditionOther: '',
  missingActivities: [],
  missingOther: '',
  urgencyLevel: '',
  annualSpending: '',
  openQuestions: '',
  name: '',
  email: '',
  phone: '',
  qualificationStatus: '',
  treatableConditions: [],
  nonTreatableConditions: [],
  requiresManualReview: false,
  approximatePainStartDate: '',
  wantsNotification: false,
};

// ============================================================================
// REDUCER
// ============================================================================

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_PAIN_DURATION':
      return { ...state, painDuration: action.payload };
    
    case 'SET_TREATMENTS_TRIED':
      return { ...state, treatmentsTried: action.payload };
    
    case 'SET_PAIN_MEDICATIONS_TYPES':
      return { ...state, painMedicationsTypes: action.payload };
    
    case 'SET_CONDITIONS':
      return { ...state, conditions: action.payload };
    
    case 'SET_CONDITION_OTHER':
      return { ...state, conditionOther: action.payload };
    
    case 'SET_MISSING_ACTIVITIES':
      return { ...state, missingActivities: action.payload };
    
    case 'SET_MISSING_OTHER':
      return { ...state, missingOther: action.payload };
    
    case 'SET_URGENCY_LEVEL':
      return { ...state, urgencyLevel: action.payload };
    
    case 'SET_ANNUAL_SPENDING':
      return { ...state, annualSpending: action.payload };
    
    case 'SET_OPEN_QUESTIONS':
      return { ...state, openQuestions: action.payload };
    
    case 'SET_CONTACT_INFO':
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
      };
    
    case 'SET_QUALIFICATION_STATUS':
      return { ...state, ...action.payload };
    
    case 'SET_APPROXIMATE_PAIN_START_DATE':
      return { ...state, approximatePainStartDate: action.payload };
    
    case 'SET_WANTS_NOTIFICATION':
      return { ...state, wantsNotification: action.payload };
    
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };
    
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(1, state.currentStep - 1) };
    
    case 'GO_TO_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
}

// ============================================================================
// CONTEXT
// ============================================================================

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const setPainDuration = useCallback((duration: QuizState['painDuration']) => {
    dispatch({ type: 'SET_PAIN_DURATION', payload: duration });
  }, []);

  const setTreatmentsTried = useCallback((treatments: string[]) => {
    dispatch({ type: 'SET_TREATMENTS_TRIED', payload: treatments });
  }, []);

  const setPainMedicationsTypes = useCallback((types: string[]) => {
    dispatch({ type: 'SET_PAIN_MEDICATIONS_TYPES', payload: types });
  }, []);

  const setConditions = useCallback((conditions: string[]) => {
    dispatch({ type: 'SET_CONDITIONS', payload: conditions });
  }, []);

  const setConditionOther = useCallback((other: string) => {
    dispatch({ type: 'SET_CONDITION_OTHER', payload: other });
  }, []);

  const setMissingActivities = useCallback((activities: string[]) => {
    dispatch({ type: 'SET_MISSING_ACTIVITIES', payload: activities });
  }, []);

  const setMissingOther = useCallback((other: string) => {
    dispatch({ type: 'SET_MISSING_OTHER', payload: other });
  }, []);

  const setUrgencyLevel = useCallback((urgency: string) => {
    dispatch({ type: 'SET_URGENCY_LEVEL', payload: urgency });
  }, []);

  const setAnnualSpending = useCallback((spending: string) => {
    dispatch({ type: 'SET_ANNUAL_SPENDING', payload: spending });
  }, []);

  const setOpenQuestions = useCallback((questions: string) => {
    dispatch({ type: 'SET_OPEN_QUESTIONS', payload: questions });
  }, []);

  const setContactInfo = useCallback((info: { name: string; email: string; phone: string }) => {
    dispatch({ type: 'SET_CONTACT_INFO', payload: info });
  }, []);

  const setQualificationStatus = useCallback((status: Partial<Pick<QuizState, 'qualificationStatus' | 'treatableConditions' | 'nonTreatableConditions' | 'requiresManualReview'>>) => {
    dispatch({ type: 'SET_QUALIFICATION_STATUS', payload: status });
  }, []);

  const setApproximatePainStartDate = useCallback((date: string) => {
    dispatch({ type: 'SET_APPROXIMATE_PAIN_START_DATE', payload: date });
  }, []);

  const setWantsNotification = useCallback((wants: boolean) => {
    dispatch({ type: 'SET_WANTS_NOTIFICATION', payload: wants });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'GO_TO_STEP', payload: step });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        state,
        setPainDuration,
        setTreatmentsTried,
        setPainMedicationsTypes,
        setConditions,
        setConditionOther,
        setMissingActivities,
        setMissingOther,
        setUrgencyLevel,
        setAnnualSpending,
        setOpenQuestions,
        setContactInfo,
        setQualificationStatus,
        setApproximatePainStartDate,
        setWantsNotification,
        nextStep,
        prevStep,
        goToStep,
        reset,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};
