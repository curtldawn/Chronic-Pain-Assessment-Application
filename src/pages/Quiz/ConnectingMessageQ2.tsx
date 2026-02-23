/**
 * Connecting Message Q2
 * Shows after selecting treatments (not "None")
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
import styles from './Quiz.module.css';

export const ConnectingMessageQ2 = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/quiz/education-q2a');
  };

  const handleBack = () => {
    navigate('/quiz/q2-treatments');
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
        transition={{ duration: 0.4 }}
      >
        <div className={styles.educationContent}>
          {/* Opening hook - centered, draws attention */}
          <p style={{ 
            fontSize: '1.2rem',
            fontWeight: '600',
            color: 'rgba(29, 44, 73, 1)',
            textAlign: 'center',
            marginBottom: '28px'
          }}>
            Here's what all these treatments have in common:
          </p>
          
          {/* The Key Insight - highlighted block */}
          <div style={{
            backgroundColor: 'rgba(239, 246, 255, 1)',
            borderRadius: '12px',
            padding: '24px 28px',
            marginBottom: '24px',
            position: 'relative'
          }}>
            <p style={{ 
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              margin: '0'
            }}>
              They address symptoms or functional structural issues, but <strong>they do not repair the subcellular damage</strong> that can constantly recreate your pain.
            </p>
          </div>

          {/* The Conclusion - clean, impactful */}
          <p style={{ 
            fontSize: '1.05rem',
            lineHeight: '1.7',
            color: 'rgba(29, 44, 73, 0.85)',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            That's why the relief is temporary or incomplete—<strong>the subcellular source was never addressed.</strong>
          </p>

          <div className={styles.navigationButtons} style={{ justifyContent: 'flex-end' }}>
            <Button variant="primary" size="large" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
        <QuizFooter />
      </motion.div>
    </div>
  );
};

export default ConnectingMessageQ2;