/**
 * Q1 Duration Page - Quiz Introduction + First Question
 * "How long have you been dealing with chronic pain?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

export const Q1Duration = () => {
  const navigate = useNavigate();
  const { state, setPainDuration } = useQuiz();
  const [selected, setSelected] = useState<string>('');
  const [showEducation, setShowEducation] = useState(false);

  const handleSelect = (value: '6_months_or_less' | 'more_than_6_months') => {
    setSelected(value);
    setPainDuration(value);

    if (value === '6_months_or_less') {
      // Navigate to disqualification page
      navigate('/quiz/disqualified-too-soon');
    } else {
      // Show educational response
      setTimeout(() => setShowEducation(true), 300);
    }
  };

  const handleContinue = () => {
    navigate('/quiz/q2-treatments');
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizContent}>
        <AnimatePresence mode="wait">
          {!showEducation ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.quizHeader}>
                <h1 className={styles.headline}>
                  Still in Pain After Everything You've Tried?
                </h1>
                <p className={styles.subhead}>
                  Take this 7-minute assessment to see if cellular repair can reduce or eliminate your chronic pain.
                </p>
              </div>

              <div className={styles.questionSection}>
                <h2 className={styles.question}>
                  How long have you been dealing with chronic pain?
                </h2>

                <div className={styles.optionsGrid}>
                  <button
                    className={`${styles.optionButton} ${selected === '6_months_or_less' ? styles.selected : ''}`}
                    onClick={() => handleSelect('6_months_or_less')}
                    data-testid="option-6-months-or-less"
                  >
                    6 months or less
                  </button>

                  <button
                    className={`${styles.optionButton} ${selected === 'more_than_6_months' ? styles.selected : ''}`}
                    onClick={() => handleSelect('more_than_6_months')}
                    data-testid="option-more-than-6-months"
                  >
                    More than 6 months
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.educationContent}>
                <p className={styles.educationText}>
                  By 6 months, you likely felt that your pain would be resolved or certainly in a better place by now.
                </p>
                <p className={styles.educationText}>
                  Yet here you are—still in pain, but determined to find real relief.
                </p>
                <p className={styles.educationText}>
                  So what's keeping the pain alive?
                </p>
                <p className={styles.educationText}>
                  New peer-reviewed research has found that <strong>chronic pain can be stored inside your cells as subcellular damage</strong>—and that damage continues to trigger pain.
                </p>
                <p className={styles.educationText}>
                  However, the subcellular damage can be repaired, depending on your condition.
                </p>

                <Button
                  variant="primary"
                  size="large"
                  onClick={handleContinue}
                  fullWidth
                  data-testid="continue-button"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Q1Duration;