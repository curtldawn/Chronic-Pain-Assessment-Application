/**
 * Q4 What's Missing - Emotional Engagement
 * "If your chronic pain were eliminated, what would that give you back?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

const ACTIVITIES = [
  { id: 'sleep', label: 'Sleep through the night without waking in pain' },
  { id: 'family_time', label: 'Play with / spend quality time with my children or grandchildren' },
  { id: 'hobbies', label: 'Enjoy my hobbies / leisure activities again' },
  { id: 'travel', label: 'Travel comfortably (drive, fly, sit for long periods)' },
  { id: 'work', label: 'Work / be productive without constant discomfort' },
  { id: 'social', label: 'Participate in social activities with friends and family' },
  { id: 'exercise', label: 'Exercise / stay physically active like I used to' },
  { id: 'good_days', label: 'Simply have more "good days" than bad days' },
];

export const Q4WhatsMissing = () => {
  const navigate = useNavigate();
  const { state, setMissingActivities, setMissingOther } = useQuiz();
  const [selected, setSelected] = useState<string[]>(state.missingActivities);
  const [otherText, setOtherText] = useState(state.missingOther);
  const [showOtherField, setShowOtherField] = useState(false);

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = () => {
    setMissingActivities(selected);
    setMissingOther(otherText);
    navigate('/quiz/q5-urgency');
  };

  const handleBack = () => {
    // Determine which Primary Cell page to go back to
    if (state.qualificationStatus === 'manual_review') {
      navigate('/quiz/alternative-primary-cell-explanation');
    } else {
      navigate('/quiz/primary-cell-explanation');
    }
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
            If your chronic pain were eliminated, what would that give you back? What could you do that you can't do now (or can't do well)?
          </h2>
          <p className={styles.helperText}>(Select all that apply)</p>

          <div className={styles.checkboxGrid}>
            {ACTIVITIES.map((activity) => (
              <label key={activity.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selected.includes(activity.id)}
                  onChange={() => handleToggle(activity.id)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>{activity.label}</span>
              </label>
            ))}

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showOtherField}
                onChange={(e) => setShowOtherField(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>Other</span>
            </label>
          </div>

          {showOtherField && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={styles.formField}
              style={{ marginTop: '16px' }}
            >
              <textarea
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Please describe what you'd like to get back..."
                className={styles.textarea}
                rows={3}
              />
            </motion.div>
          )}
        </div>

        <div className={styles.navigationButtons}>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="primary"
            size="large"
            onClick={handleContinue}
            disabled={selected.length === 0 && !otherText.trim()}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Q4WhatsMissing;