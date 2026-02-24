/**
 * Q6 Annual Spending
 * "How much do you currently pay out of pocket for your chronic pain every year?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
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
  };

  const handleContinue = () => {
    if (selected) {
      navigate('/quiz/q7-open-questions');
    }
  };

  const handleBack = () => {
    navigate('/quiz/q5-urgency');
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
            On average, how much do you currently pay out of pocket for your chronic pain every year (co-pays, deductibles, treatments not covered by insurance, etc.)?
          </h2>

          <div className={styles.checkboxGrid}>
            {SPENDING_OPTIONS.map((option) => (
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

export default Q6AnnualSpending;