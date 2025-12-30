/**
 * Disqualification - Non-Treatable
 * For users who selected only non-treatable conditions
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

const CONDITION_LABELS: Record<string, string> = {
  chronic_fatigue_syndrome: 'Chronic Fatigue Syndrome',
  autoimmune_diseases: 'Autoimmune diseases',
  fibromyalgia: 'Fibromyalgia',
  infectious_diseases: 'Infectious diseases',
  endocrine_disorders: 'Endocrine disorders',
  gastrointestinal_disorders: 'Gastrointestinal disorders',
};

export const DisqualifiedNonTreatable = () => {
  const navigate = useNavigate();
  const { state, setContactInfo, setWantsNotification } = useQuiz();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Get the non-treatable condition labels
  const nonTreatableLabels = state.nonTreatableConditions
    .map(id => CONDITION_LABELS[id] || id)
    .filter(Boolean);

  // Fallback: if no labels, try to get from selected conditions
  const displayLabels = nonTreatableLabels.length > 0 
    ? nonTreatableLabels 
    : state.conditions
        .filter(id => Object.keys(CONDITION_LABELS).includes(id))
        .map(id => CONDITION_LABELS[id] || id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactInfo({ name, email, phone });
    setWantsNotification(true);

    try {
      await fetch('/api/quiz/disqualified-notify-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz_id: state.quizId,
          name,
          email,
          phone,
          non_treatable_conditions: state.nonTreatableConditions,
        }),
      });
    } catch (error) {
      console.error('Error submitting notification request:', error);
    }

    alert('Thank you! We\'ll notify you if new techniques are developed.');
  };

  const handleNoThanks = () => {
    navigate('/');
  };

  return (
    <div className={styles.quizContainer}>
      <motion.div
        className={styles.quizContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.headline}>Thank You for Your Interest</h1>

        <div className={styles.disqualificationContent}>
          <p className={styles.bodyText}>
            Based on your answer, cellular repair techniques for your specific condition(s) don't exist yet.
          </p>
          <p className={styles.bodyText}>
            The clinical teams behind this research are continuously working to expand the applications of cellular repair to new conditions—but at this time, we don't have proven techniques for:
          </p>
          <ul className={styles.bulletList}>
            {nonTreatableLabels.map((label, index) => (
              <li key={index}>{label}</li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            We'd be happy to notify you if new techniques are developed for your condition in the future.
          </p>
          <p className={styles.bodyText}>
            <strong>Enter your information below:</strong>
          </p>

          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formField}>
              <label htmlFor="name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="phone" className={styles.label}>
                Phone <span className={styles.required}>*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.buttonGroup}>
              <Button type="submit" variant="primary" size="large" fullWidth>
                Yes, Notify Me
              </Button>
              <button type="button" onClick={handleNoThanks} className={styles.textButton}>
                No thanks
              </button>
            </div>
          </form>

          <div className={styles.navigationButtons}>
            <Button variant="secondary" onClick={() => navigate('/quiz/q3-conditions')}>
              Back
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DisqualifiedNonTreatable;