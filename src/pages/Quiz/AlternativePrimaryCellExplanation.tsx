/**
 * Alternative Primary Cell Explanation Page
 * For users who entered "Other" condition
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

export const AlternativePrimaryCellExplanation = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/quiz/q4-whats-missing');
  };

  const handleBack = () => {
    navigate('/quiz/manual-review');
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
            Most chronic pain conditions have a strong possibility that pain persists because of subcellular damage—which means it can be repaired.
          </p>
          <p className={styles.educationText}>
            Researchers have identified what they call your <strong>Primary Cell</strong>—a specialized master cell that controls the pattern and function of all cells in your body.
          </p>
          <p className={styles.educationText}>
            Unlike regular cells, your Primary Cell doesn't die and regenerate every few months.
          </p>
          <p className={styles.educationText}>
            When you get injured or have ongoing degenerative problems, your Primary Cell can sustain damage* and/or trigger subcellular damage that occurred before birth.**
          </p>
          <p className={styles.educationText}>
            This subcellular damage persists in your Primary Cell throughout your life, continuously signaling pain.
          </p>
          <p className={styles.educationText}>
            <strong>When your Primary Cell is repaired, it eliminates the source of your pain.</strong>
          </p>
          <p className={styles.educationText}>
            The result?
          </p>
          <p className={styles.educationText}>
            Some people find their pain permanently eliminated, while others experience a significant permanent reduction.
          </p>
          <p className={styles.educationText}>
            <strong>This isn't pain management—this is fixing the subcellular source by repairing your Primary Cell.</strong>
          </p>
          
          <div style={{ marginTop: '24px' }}>
            <p className={styles.disclaimerText} style={{ marginBottom: '4px' }}>
              *Based on clinical observations and ongoing research
            </p>
            <p className={styles.disclaimerText} style={{ marginBottom: '0' }}>
              **Journal of Prenatal & Perinatal Psychology & Health, published 11-03-2024
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
        </div>
      </motion.div>
    </div>
  );
};

export default AlternativePrimaryCellExplanation;