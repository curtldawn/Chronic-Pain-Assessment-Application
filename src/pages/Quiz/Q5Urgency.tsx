/**
 * Q5 Urgency
 * "How urgent is your need to resolve your chronic pain issue?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

const URGENCY_OPTIONS = [
  { id: 'very_urgent', label: 'Very urgent - I’m sick and tired of this pain and ready to do something about it now' },
  { id: 'urgent', label: 'Urgent - I’d like to address this within the next few months' },
  { id: 'moderately_urgent', label: 'Moderately urgent - I’m exploring options but not in a rush' },
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
    navigate('/quiz/q6-annual-spending');
  };

  const handleBack = () => {
    navigate('/quiz/q4-whats-missing');
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
            How urgent is your need to resolve your chronic pain issue?
          </h2>

          <div className={styles.optionsGrid}>
            {URGENCY_OPTIONS.map((option) => (
              <button
                key={option.id}
                className={`${styles.optionButton} ${selected === option.id ? styles.selected : ''}`}
                onClick={() => handleSelect(option.id)}
                data-testid={`option-${option.id}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.navigationButtons}>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="primary"
            size="large"
            onClick={handleContinue}
            disabled={!selected}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Q5Urgency;