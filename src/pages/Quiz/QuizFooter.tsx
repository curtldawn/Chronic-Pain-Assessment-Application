/**
 * Quiz Footer Component
 * Shows Terms & Conditions and Privacy Policy links at the bottom of each quiz page
 */

import styles from './Quiz.module.css';

const QuizFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a
          href="https://wellnessinweeks.com/terms-and-conditions?hsLang=en"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          Terms and Conditions
        </a>
        <a
          href="https://wellnessinweeks.com/privacy-policy?hsLang=en"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default QuizFooter;
