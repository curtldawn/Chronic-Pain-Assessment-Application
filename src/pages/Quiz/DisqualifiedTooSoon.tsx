/**
 * Disqualification Page - Too Soon
 * For users who selected "6 months or less"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
import styles from './Quiz.module.css';

export const DisqualifiedTooSoon = () => {
  const navigate = useNavigate();
  const { setWantsNotification, setApproximatePainStartDate, setContactInfo } = useQuiz();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [painStartDate, setPainStartDate] = useState('');
  const [consentToText, setConsentToText] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactInfo({ name, email, phone });
    setApproximatePainStartDate(painStartDate);
    setWantsNotification(true);

    // Submit to backend
    try {
      await fetch('/api/quiz/disqualified-waiting-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          approximate_pain_start_date: painStartDate,
          consent_to_text: consentToText 
        }),
      });
    } catch (error) {
      console.error('Error submitting waiting list:', error);
    }

    // Show confirmation or redirect
    alert('Thank you! We\'ll check in with you later.');
  };

  const handleNoThanks = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate('/quiz/q1-duration');
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
        <h1 className={styles.headline}>Thank You for Your Interest</h1>

        <div className={styles.disqualificationContent}>
          <p className={styles.bodyText}>
            Based on your answer, it's a little early to know if subcellular repair is right for you.
          </p>
          <p className={styles.bodyText}>
            Your body may still be completing its healing process—and that's completely normal.
          </p>
          <p className={styles.bodyText}>
            If your pain continues beyond 6 months, it's a strong indicator that subcellular damage is present—and that's when subcellular repair might become the solution.
          </p>
          <p className={styles.bodyText}>
            When you get injured, have surgery, live with ongoing wear-and-tear, or your pain develops over time, your Primary Cell can sustain subcellular damage.*
          </p>
          <p className={styles.bodyText}>
            New peer-reviewed research has found that chronic pain is often linked to subcellular damage—and that damage can create ongoing pain.
          </p>
          <p className={styles.bodyText}>
            This damage might be the source of your chronic pain condition. If so, it can be repaired for lasting relief.
          </p>
          <p className={styles.bodyText}>
            <strong>To avoid losing contact with us, would you like us to check in later?</strong>
          </p>
          <p className={styles.bodyText}>
            Once it's been 6 months since your injury or last surgery, we'll email you a link to retake this assessment and send you a text letting you know the email has arrived.
          </p>

          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formField}>
              <label htmlFor="painStartDate" className={styles.label}>
                Approximate Date Pain Began
              </label>
              <input
                id="painStartDate"
                type="date"
                value={painStartDate}
                onChange={(e) => setPainStartDate(e.target.value)}
                className={styles.input}
              />
            </div>

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
                Yes, Check In Later
              </Button>
              <button type="button" onClick={handleNoThanks} className={styles.textButton}>
                No thanks, I'll reach out on my own
              </button>
            </div>
          </form>
        </div>
        <QuizFooter />
      </motion.div>
    </div>
  );
};

export default DisqualifiedTooSoon;