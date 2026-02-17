/**
 * Thank You Page - Non-Treatable
 * Shown after submitting the notification form on DisqualifiedNonTreatable
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
import styles from './Quiz.module.css';

export const ThankYouNonTreatable = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.quizContainer}>
      <motion.div
        className={styles.quizContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <h1 className={styles.headline} style={{ textAlign: 'center', marginBottom: '16px' }}>
          Thank You For Informing Us
        </h1>
        
        <p className={styles.subhead} style={{ marginBottom: '48px' }}>
          We will notify you if we find a solution to your condition
        </p>

        <div style={{
          backgroundColor: 'rgba(29, 44, 73, 0.03)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          maxWidth: '500px',
          margin: '0 auto 32px'
        }}>
          <p style={{ 
            fontSize: '1rem',
            lineHeight: '1.7',
            color: 'rgba(29, 44, 73, 0.85)',
            margin: '0'
          }}>
            Our clinical teams are continuously researching new applications for subcellular repair. If a breakthrough occurs for your condition, you'll be the first to know.
          </p>
        </div>

        <Button variant="primary" size="large" onClick={handleReturnHome}>
          Return to Home
        </Button>
        
        <QuizFooter />
      </motion.div>
    </div>
  );
};

export default ThankYouNonTreatable;
