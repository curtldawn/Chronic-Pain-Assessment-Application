/**
 * Disqualification - Non-Treatable
 * For users who selected only non-treatable conditions
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
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
  const [consentToText, setConsentToText] = useState(false);

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
          consent_to_text: consentToText,
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

  const handleBack = () => {
    navigate('/quiz/q3-conditions');
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
        <h1 className={styles.headline} style={{ textAlign: 'center' }}>Thank You for Your Interest</h1>

        <div className={styles.disqualificationContent}>
          {/* Explanation section */}
          <div style={{ 
            backgroundColor: 'rgba(29, 44, 73, 0.03)', 
            borderRadius: '12px', 
            padding: '20px 24px',
            marginBottom: '24px'
          }}>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              marginBottom: '16px'
            }}>
              Based on your answer, subcellular repair techniques for your specific condition(s) don't exist yet.
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              marginBottom: '16px'
            }}>
              The clinical teams behind this research are continuously working to expand the applications of subcellular repair to new conditions—but at this time, we don't have proven techniques for:
            </p>
            {displayLabels.length > 0 ? (
              <ul style={{ 
                margin: '0',
                paddingLeft: '20px',
                color: 'rgba(29, 44, 73, 1)',
                fontWeight: '500'
              }}>
                {displayLabels.map((label, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{label}</li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: '0', fontStyle: 'italic', color: 'rgba(29, 44, 73, 0.8)' }}>the conditions you selected</p>
            )}
          </div>

          {/* CTA section */}
          <p style={{ 
            fontSize: '1rem',
            lineHeight: '1.7',
            color: 'rgba(29, 44, 73, 0.9)',
            marginBottom: '8px'
          }}>
            We'd be happy to notify you if new techniques are developed for your condition in the future.
          </p>
          <p style={{ 
            fontSize: '1rem',
            fontWeight: '600',
            color: 'rgba(29, 44, 73, 1)',
            marginBottom: '20px'
          }}>
            Enter your information below:
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

            <div className={styles.consentSection}>
              <label className={styles.checkboxLabel} style={{ border: 'none', padding: '8px 0', alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  checked={consentToText}
                  onChange={(e) => setConsentToText(e.target.checked)}
                  className={styles.checkbox}
                  required
                  style={{ marginTop: '3px' }}
                />
                <span className={styles.checkboxText} style={{ fontSize: '0.8125rem', color: 'rgba(107, 114, 128, 1)' }}>
                  I agree to receive text messages about my care from Wellness In Weeks ("WIW") at the number I provide. If I choose to move forward, WIW may also text me about scheduling and available consultation openings. Message frequency may vary and message/data rates may apply. Consent is not required to receive care or buy services. Reply STOP to opt out and HELP for help. <span className={styles.required}>*</span>
                </span>
              </label>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(107, 114, 128, 1)', marginTop: '16px', lineHeight: '1.5' }}>
                By proceeding, you confirm you've reviewed our <a href="/quiz/privacy-policy" style={{ color: 'rgba(29, 44, 73, 1)', textDecoration: 'underline' }}>SMS & Privacy Policy</a>.
              </p>
            </div>

            <div className={styles.buttonGroup}>
              <Button 
                type="submit" 
                variant="primary" 
                size="large" 
                fullWidth
                disabled={!consentToText || !name.trim() || !email.trim() || !phone.trim()}
              >
                Yes, Notify Me
              </Button>
              <button type="button" onClick={handleNoThanks} className={styles.textButton}>
                No thanks
              </button>
            </div>
          </form>
        </div>
        <QuizFooter />
      </motion.div>
    </div>
  );
};

export default DisqualifiedNonTreatable;