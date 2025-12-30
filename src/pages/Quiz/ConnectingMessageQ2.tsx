/**
 * Connecting Message Q2
 * Shows after selecting treatments (not "None")
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

export const ConnectingMessageQ2 = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/quiz/education-q2a');
  };

  const handleBack = () => {
    navigate('/quiz/q2-treatments');
  };

  return (
    <div className={styles.quizContainer}>
      <motion.div
        className={styles.quizContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.educationContent}>
          <p className={styles.educationText}>
            Here's what all these treatments have in common:
          </p>
          <p className={styles.educationText}>
            <strong>They address symptoms or structural issues, but they don't repair subcellular damage that can keep recreating your pain.</strong>
          </p>
          <p className={styles.educationText}>
            That's why the relief is temporary or incomplete—the subcellular source was never addressed.
          </p>

          <div className={styles.navigationButtons}>
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button variant="primary" size="large" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConnectingMessageQ2;