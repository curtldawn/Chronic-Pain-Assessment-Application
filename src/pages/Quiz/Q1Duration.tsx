/**
 * Q1 Duration Page - Quiz Introduction + First Question
 * "How long have you been dealing with chronic pain?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
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
                  Take this 7‑minute assessment to discover a new way to relieve chronic pain—and see if you qualify for subcellular repair.
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
                {/* Opening - Empathetic connection */}
                <p className={styles.educationText} style={{ fontSize: '1.1rem' }}>
                  By 6 months, you likely felt that your pain would be resolved or certainly in a better place by now.
                </p>
                
                {/* Validation - slightly emphasized */}
                <p className={styles.educationText} style={{ 
                  fontSize: '1.1rem',
                  color: 'rgba(29, 44, 73, 0.85)'
                }}>
                  Yet here you are–still in pain, but <span style={{ fontWeight: '600', color: 'rgba(29, 44, 73, 1)' }}>determined to find real relief</span>.
                </p>

                {/* The Hook - Dramatic question */}
                <div style={{ 
                  margin: '32px 0',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: 'rgba(29, 44, 73, 0.2)',
                    margin: '0 auto 24px'
                  }} />
                  <p style={{ 
                    fontSize: '1.35rem',
                    fontWeight: '600',
                    color: 'rgba(29, 44, 73, 1)',
                    margin: '0',
                    fontStyle: 'italic'
                  }}>
                    So, what's keeping the pain going?
                  </p>
                  <div style={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: 'rgba(29, 44, 73, 0.2)',
                    margin: '24px auto 0'
                  }} />
                </div>

                {/* The Answer - Research backed */}
                <p className={styles.educationText} style={{ 
                  fontSize: '1.05rem',
                  lineHeight: '1.7'
                }}>
                  New peer-reviewed research has found that chronic pain is often linked to <strong>subcellular damage</strong>—and that damage can create ongoing pain.
                </p>
                
                {/* Hope - The solution hint */}
                <p className={styles.educationText} style={{ 
                  fontSize: '1.05rem',
                  lineHeight: '1.7',
                  marginBottom: '32px'
                }}>
                  This damage might be the source of your chronic pain condition, and it <strong>can be repaired</strong> for relief, depending on your specific case.
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
        <QuizFooter />
      </div>
    </div>
  );
};

export default Q1Duration;