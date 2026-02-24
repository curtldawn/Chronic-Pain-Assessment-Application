/**
 * Q5 Urgency
 * "How urgent is your need to resolve your chronic pain issue?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
import styles from './Quiz.module.css';

const URGENCY_OPTIONS = [
  { id: 'very_urgent', label: 'Very urgent - I'm sick and tired of this pain and ready to do something about it now' },
  { id: 'urgent', label: 'Urgent - I'd like to address this within the next few months' },
  { id: 'moderately_urgent', label: 'Moderately urgent - I'm exploring options but not in a rush' },
  { id: 'not_urgent', label: 'Not urgent - Just gathering information for now' },
];

export const Q5Urgency = () => {
  const navigate = useNavigate();
  const { state, setUrgencyLevel } = useQuiz();
  const [selected, setSelected] = useState(state.urgencyLevel);

  const handleSelect = (id: string) => {
    setSelected(id);
    setUrgencyLevel(id);
  };

  const handleContinue = () => {
    if (selected) {
      navigate('/quiz/q6-annual-spending');
    }
  };

  const handleBack = () => {
    navigate('/quiz/q4-whats-missing');
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
        <div className={styles.questionSection}>
          <h2 className={styles.question} style={{ textAlign: 'center' }}>
            How urgent is your need to resolve your chronic pain issue?
          </h2>

          <div className={styles.checkboxGrid}>
            {URGENCY_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`${styles.checkboxLabel} ${selected === option.id ? styles.selected : ''}`}
                data-testid={`option-${option.id}`}
              >
                <input
                  type="checkbox"
                  checked={selected === option.id}
                  onChange={() => handleSelect(option.id)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>{option.label}</span>
              </label>
            ))}
          </div>

          <div className={styles.navigationButtons} style={{ justifyContent: 'flex-end', marginTop: '24px' }}>
            <Button
              variant="primary"
              size="large"
              onClick={handleContinue}
              disabled={!selected}
              data-testid="continue-button"
            >
              Continue
            </Button>
          </div>
        </div>
        <QuizFooter />
      </motion.div>
    </div>
  );
};

export default Q5Urgency;
