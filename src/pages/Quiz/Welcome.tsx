/**
 * Welcome Page
 * Final page with Chad's case study video and calendar booking
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import QuizFooter from './QuizFooter';
import styles from './Quiz.module.css';

export const Welcome = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Determine which congratulations page to go back to
    navigate(-1);
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
        style={{ maxWidth: '900px' }}
      >
        <h1 className={styles.headline}>
          <strong>"I Don't Feel Anything Right Now"—Watch Chad's 5-Year Pain Disappear Live</strong>
        </h1>

        <div className={styles.welcomeContent}>
          <p className={styles.bodyText}>
            You're about to see the subcellular repair process in action, plus hear from his wife about the transformation in their marriage and family life.
          </p>

          <p className={styles.bodyText} style={{ textAlign: 'left' }}>
            <strong>Here:</strong> <a href="#video-section" style={{ color: 'rgba(29, 44, 73, 1)', textDecoration: 'underline' }}>Chad's Subcellular Repair Process</a>
          </p>

          {/* YouTube Video Embed */}
          <div id="video-section" className={styles.videoContainer}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/NJnzbLj058w"
              title="Chad's Subcellular Repair Process"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoIframe}
            />
          </div>

          <div className={styles.ctaSection}>
            <h2 className={styles.question} style={{ marginTop: '48px', textAlign: 'center' }}>
              <strong>Ready to Take the Next Step?</strong>
            </h2>
            <p className={styles.bodyText}>
              If you'd like to explore how subcellular repair can reduce or eliminate your specific chronic pain, we invite you to schedule a complimentary 45-minute Pain Relief Consultation.
            </p>
            <p className={styles.bodyText} style={{ textAlign: 'left' }}>
              <strong>Before you schedule:</strong> Watch the full video to see if this approach feels right for you. This ensures our call is productive and focused on your specific needs.
            </p>
            <p className={styles.bodyText} style={{ textAlign: 'left' }}>
              <strong>On this call, we'll:</strong>
            </p>
            <ul className={styles.bulletList} style={{ listStyleType: 'disc' }}>
              <li>Discuss your specific pain condition(s) in detail</li>
              <li>Map out your personalized pain relief plan</li>
              <li>Answer any questions you have</li>
              <li>Explain our process, fees, and guarantee (Yep. We stand behind our work!)</li>
            </ul>
            <p className={styles.bodyText} style={{ textAlign: 'center', marginTop: '24px' }}>
              <strong>Ready to reduce or eliminate your pain?</strong>
            </p>
            <p className={styles.bodyText} style={{ textAlign: 'left' }}>
              Schedule your complimentary Pain Relief Consultation below:
            </p>

            {/* Calendar Booking Widget - Placeholder */}
            <div className={styles.calendarPlaceholder}>
              <p className={styles.bodyText} style={{ textAlign: 'center', color: 'rgba(107, 114, 128, 1)' }}>
                <em>[CALENDAR BOOKING WIDGET]</em>
              </p>
            </div>
          </div>
        </div>
        <QuizFooter />
      </motion.div>
    </div>
  );
};

export default Welcome;
