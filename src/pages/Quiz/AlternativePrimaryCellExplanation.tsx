/**
 * Alternative Primary Cell Explanation Page
 * For users who entered "Other" condition
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
import styles from './Quiz.module.css';

export const AlternativePrimaryCellExplanation = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/quiz/q4-whats-missing');
  };

  const handleBack = () => {
    navigate('/quiz/manual-review');
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
          {/* Opening - Highlighted */}
          <div style={{
            backgroundColor: 'rgba(243, 254, 250, 1)',
            borderRadius: '10px',
            padding: '18px 20px',
            marginBottom: '24px'
          }}>
            <p style={{ 
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              margin: '0'
            }}>
              Many chronic pain conditions stem from subcellular damage—damage that can be repaired.
            </p>
          </div>

          {/* Primary Cell Introduction */}
          <p style={{ 
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'rgba(29, 44, 73, 1)',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            This is where your Primary Cell comes in:
          </p>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              marginBottom: '14px'
            }}>
              Your <strong>Primary Cell</strong>—a unique master cell that controls the pattern and function of every other cell in your body.**
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              marginBottom: '14px'
            }}>
              Unlike regular cells, it never dies. It lasts your entire life.
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              margin: '0'
            }}>
              When you get injured, have surgery, live with ongoing wear-and-tear, or your pain develops over time, your Primary Cell can sustain subcellular damage.*
            </p>
          </div>

          {/* How it causes pain - Key insight */}
          <div style={{ 
            margin: '24px 0',
            textAlign: 'center'
          }}>
            <div style={{
              width: '60px',
              height: '2px',
              backgroundColor: 'rgba(29, 44, 73, 0.2)',
              margin: '0 auto 20px'
            }} />
            <p style={{ 
              fontSize: '1.15rem',
              fontWeight: '600',
              color: 'rgba(29, 44, 73, 1)',
              margin: '0'
            }}>
              Here's how this can cause your pain:
            </p>
            <div style={{
              width: '60px',
              height: '2px',
              backgroundColor: 'rgba(29, 44, 73, 0.2)',
              margin: '20px auto 0'
            }} />
          </div>

          {/* Explanation section - ALTERNATIVE 4: Subtle bottom border divider */}
          <div style={{ 
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid rgba(29, 44, 73, 0.1)'
          }}>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              marginBottom: '14px'
            }}>
              Your Primary Cell is like a master template your body follows. When an area of it is damaged, your body keeps following that disrupted pattern—and this unhealthy pattern causes pain where you hurt.
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              marginBottom: '14px'
            }}>
              This damage can persist in your Primary Cell throughout your life.
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 1)',
              fontWeight: '500',
              margin: '0'
            }}>
              When it's repaired, it creates a healthy pattern—relieving your pain.
            </p>
          </div>

          {/* The Result - Highlighted */}
          <div style={{
            backgroundColor: 'rgba(243, 254, 250, 1)',
            borderRadius: '10px',
            padding: '18px 20px',
            marginBottom: '20px'
          }}>
            <p style={{ 
              fontSize: '1rem',
              fontWeight: '600',
              color: 'rgba(29, 44, 73, 1)',
              marginBottom: '10px'
            }}>
              The result?
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              marginBottom: '10px'
            }}>
              For years, in real-world practice, some people find their pain <strong>permanently eliminated</strong>, while others experience significant reduction that lasts long-term.*
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 1)',
              fontWeight: '600',
              margin: '0'
            }}>
              This is not pain management—this is repairing the subcellular source.
            </p>
            </p>
          </div>
          
          {/* Footnotes */}
          <div style={{ 
            borderTop: '1px solid rgba(29, 44, 73, 0.1)',
            paddingTop: '12px',
            marginBottom: '24px'
          }}>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(107, 114, 128, 1)', fontStyle: 'italic', margin: '0 0 4px 0' }}>
              *Based on clinical observations and ongoing research
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(107, 114, 128, 1)', fontStyle: 'italic', margin: '0' }}>
              **Journal of Prenatal & Perinatal Psychology & Health (2024, 2025)
            </p>
          </div>

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

export default AlternativePrimaryCellExplanation;