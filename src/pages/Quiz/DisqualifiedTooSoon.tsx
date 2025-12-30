/**
 * Disqualification Page - Too Soon
 * For users who selected "6 months or less"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

export const DisqualifiedTooSoon = () => {
  const navigate = useNavigate();
  const { setWantsNotification, setApproximatePainStartDate, setContactInfo } = useQuiz();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [painStartDate, setPainStartDate] = useState('');

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
        body: JSON.stringify({ name, email, phone, approximate_pain_start_date: painStartDate }),
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
            Based on your answer, it's a little early to know if cellular repair is right for you.
          </p>
          <p className={styles.bodyText}>
            When you're injured, three types of damage can occur:
          </p>
          <ul className={styles.bulletList}>
            <li>Muscle and tissue damage</li>
            <li>Bone damage</li>
            <li>Subcellular damage</li>
          </ul>
          <p className={styles.bodyText}>
            Doctors treat the first two, and they often heal naturally within about 6 months.
          </p>
          <p className={styles.bodyText}>
            If your pain has lasted less than that, your body may still be completing this healing process—and that's completely normal.
          </p>
          <p className={styles.bodyText}>
            If your pain continues beyond 6 months, it's a strong indicator that subcellular damage is present—and that's when cellular repair can become the solution.
          </p>
          <p className={styles.bodyText}>
            <strong>To avoid losing contact with us, would you like us to check in later?</strong>
          </p>
          <p className={styles.bodyText}>
            Once it's been 6 months since your injury or last surgery, we'll email you a link to retake this assessment and send you a text letting you know the email has arrived.
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

            <div className={styles.buttonGroup}>
              <Button type="submit" variant="primary" size="large" fullWidth>
                Yes, Check In Later
              </Button>
              <button type="button" onClick={handleNoThanks} className={styles.textButton}>
                No thanks, I'll reach out on my own
              </button>
            </div>
          </form>

          <div className={styles.navigationButtons}>
            <Button variant="secondary" onClick={() => navigate('/quiz/q1-duration')}>
              Back
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DisqualifiedTooSoon;