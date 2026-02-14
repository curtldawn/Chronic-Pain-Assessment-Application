/**
 * Manual Review Page
 * For users who entered "Other" condition
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
import styles from './Quiz.module.css';

export const ManualReview = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/quiz/alternative-primary-cell-explanation');
  };

  const handleBack = () => {
    navigate('/quiz/q3-conditions');
  };

  return (
    <div className={`${styles.quizContainer} ${styles.quizContainerRelative}`}>
      <button className={styles.backArrow} onClick={handleBack} aria-label="Go back">
        ←
      </button>
      <motion.div
        className={styles.quizContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.headline}>Thank You - We'll Review Your Condition</h1>

        <div className={styles.disqualificationContent}>
          <p className={styles.bodyText}>
            Based on your answers, a practitioner will need to review your specific condition to determine if cellular repair can help.
          </p>
          <p className={styles.bodyText}>
            <strong>Be sure to submit the Contact Form at the end.</strong>
          </p>
          <p className={styles.bodyText}>
            We'll contact you by email to let you know if we can help with your condition.
          </p>

          <div className={styles.navigationButtons} style={{ justifyContent: 'flex-end' }}>
            <Button variant="primary" size="large" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
        <QuizFooter />
      </motion.div>
    </div>
  );
};

export default ManualReview;