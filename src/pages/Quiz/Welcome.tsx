/**
 * Welcome Page
 * Final page with Chad's case study video and calendar booking
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

export const Welcome = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Determine which congratulations page to go back to
    navigate(-1);
  };

  return (
    <div className={styles.quizContainer}>
      <motion.div
        className={styles.quizContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: '900px' }}
      >
        <h1 className={styles.headline}>Chad's Live Case Study Video</h1>

        <div className={styles.welcomeContent}>
          <p className={styles.bodyText}>
            In this case study, you'll see how the cellular repair process works—and watch the moment Chad's 5-year chronic pain disappears live in session. The pain has never returned.
          </p>
          <p className={styles.bodyText}>
            His wife shares the night-and-day differences in him, their marriage, and family life.
          </p>

          {/* YouTube Video Embed */}
          <div className={styles.videoContainer}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/NJnzbLj058w"
              title="Chad's Case Study - Cellular Repair"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoIframe}
            />
          </div>

          <div className={styles.ctaSection}>
            <h2 className={styles.question} style={{ marginTop: '48px' }}>
              Ready to Take the Next Step?
            </h2>
            <p className={styles.bodyText}>
              If you'd like to explore how the cellular repair process can reduce or eliminate your specific chronic pain, we invite you to schedule a complimentary 45-minute Pain Consultation.
            </p>
            <p className={styles.bodyText}>
              <strong>Important:</strong> Please watch the full video above first. It helps you determine if our approach is right for you and ensures we have a productive conversation.
            </p>
            <p className={styles.bodyText}>
              <strong>On this call, we'll:</strong>
            </p>
            <ul className={styles.bulletList}>
              <li>Discuss your specific pain condition in detail</li>
              <li>Map out your personalized pain relief plan</li>
              <li>Answer any questions you have</li>
              <li>Explain our process, fees, and guarantee (Yep. We stand behind our work!)</li>
            </ul>
            <p className={styles.bodyText}>
              If you're ready, schedule your Pain Consultation below:
            </p>

            {/* Calendar Booking - Placeholder */}
            <div className={styles.calendarPlaceholder}>
              <p className={styles.bodyText} style={{ textAlign: 'center', color: 'rgba(107, 114, 128, 1)' }}>
                <em>Calendar booking widget will be integrated here</em>
              </p>
              <p className={styles.bodyText} style={{ textAlign: 'center', fontSize: '0.875rem', color: 'rgba(107, 114, 128, 1)' }}>
                (You mentioned you'll provide the booking system later)
              </p>
            </div>
          </div>

          <div className={styles.navigationButtons} style={{ marginTop: '32px' }}>
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
