/**
 * Quiz Footer Component
 * Shows Terms & Conditions and Privacy Policy links at the bottom of each quiz page
 */

import { Link } from 'react-router-dom';
import styles from './Quiz.module.css';

const QuizFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <Link
          to="/quiz/terms-and-conditions"
          className={styles.footerLink}
        >
          Terms and Conditions
        </Link>
        <Link
          to="/quiz/privacy-policy"
          className={styles.footerLink}
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};

export default QuizFooter;
