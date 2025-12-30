/**
 * Q7 Open Questions
 * "What questions do you have about cellular repair?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

export const Q7OpenQuestions = () => {
  const navigate = useNavigate();
  const { state, setOpenQuestions } = useQuiz();
  const [questions, setQuestions] = useState(state.openQuestions);

  const handleContinue = () => {
    setOpenQuestions(questions);
    
    // Route to appropriate congratulations page
    if (state.qualificationStatus === 'manual_review' || state.conditionOther) {
      navigate('/quiz/congratulations-alternative');
    } else {
      navigate('/quiz/congratulations');
    }
  };

  const handleBack = () => {
    navigate('/quiz/q6-annual-spending');
  };

  return (
    <div className={styles.quizContainer}>
      <motion.div
        className={styles.quizContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.questionSection}>
          <h2 className={styles.question}>
            What questions do you have about cellular repair?
          </h2>
          <p className={styles.helperText}>(Leave blank if none)</p>

          <textarea
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            placeholder="Type your questions here..."
            className={styles.textarea}
            rows={6}
            style={{ marginTop: '24px' }}
          />

          <p className={styles.bodyText} style={{ marginTop: '16px', fontSize: '1rem' }}>
            Your questions are incredibly valuable to us. If you'd like a practitioner to personally respond to them by email, be sure to fill out the contact form at the end of the assessment.
          </p>
        </div>

        <div className={styles.navigationButtons}>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button variant="primary" size="large" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Q7OpenQuestions;