/**
 * Q6 Annual Spending
 * "How much do you currently pay out of pocket for your chronic pain every year?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

const SPENDING_OPTIONS = [
  { id: '0_3000', label: '$0 - $3,000' },
  { id: '3000_10000', label: '$3,000 - $10,000' },
  { id: '10000_25000', label: '$10,000 - $25,000' },
  { id: '25000_plus', label: '$25,000+' },
];

export const Q6AnnualSpending = () => {
  const navigate = useNavigate();
  const { state, setAnnualSpending } = useQuiz();
  const [selected, setSelected] = useState(state.annualSpending);

  const handleSelect = (id: string) => {
    setSelected(id);
    setAnnualSpending(id);
    // Auto-advance to next question
    setTimeout(() => {
      navigate('/quiz/q7-open-questions');
    }, 300);
  };

  const handleBack = () => {
    navigate('/quiz/q5-urgency');
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
            On average, how much do you currently pay out of pocket for your chronic pain every year (co-pays, deductibles, treatments not covered by insurance, etc.)?
          </h2>

          <div className={styles.optionsGrid}>
            {SPENDING_OPTIONS.map((option) => (
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
        </div>
      </motion.div>
    </div>
  );
};

export default Q6AnnualSpending;