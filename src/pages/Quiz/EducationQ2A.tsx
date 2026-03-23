/**
 * Educational Response Q2A (Standard Version)
 * After connecting message - explains subcellular damage
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
import styles from './Quiz.module.css';

export const EducationQ2A = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/quiz/q3-conditions');
  };

  const handleBack = () => {
    navigate('/quiz/connecting-message-q2');
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
          {/* The Hidden Problem */}
          <p style={{ 
            fontSize: '1.05rem',
            lineHeight: '1.7',
            color: 'rgba(29, 44, 73, 0.9)',
            marginBottom: '14px'
          }}>
            Subcellular damage does not show up on scans.
          </p>
          
          <p style={{ 
            fontSize: '1.05rem',
            lineHeight: '1.7',
            color: 'rgba(29, 44, 73, 0.9)',
            marginBottom: '16px'
          }}>
            But peer-reviewed research has documented its existence and how these damage patterns can persist indefinitely.**
          </p>
          
          {/* The Consequence - emphasized - Light background tint style */}
          <p style={{ 
            fontSize: '1.05rem',
            lineHeight: '1.7',
            color: 'rgba(29, 44, 73, 1)',
            fontWeight: '500',
            backgroundColor: 'rgba(29, 44, 73, 0.04)',
            padding: '14px 18px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            This means pain caused by subcellular damage can continue throughout your life—unless the damage is repaired.
          </p>

          {/* The Solution - hopeful, highlighted */}
          <div style={{
            backgroundColor: 'rgba(243, 254, 250, 1)',
            borderRadius: '10px',
            padding: '18px 20px',
            marginBottom: '20px'
          }}>
            <p style={{ 
              fontSize: '1.05rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              margin: '0'
            }}>
              Clinical teams using this research in real-world practice have been helping people <strong>permanently reduce and even eliminate their chronic pain</strong>* through gentle, non-invasive techniques.
            </p>
          </div>

          {/* Why you haven't heard + Primary Cell intro - flowing text */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.85)',
              marginBottom: '14px'
            }}>
              This subcellular repair approach is based on specialized research that hasn't reached mainstream medicine yet—which is why your doctor hasn't mentioned it.
            </p>
            <p style={{ 
              fontSize: '1.05rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              margin: '0'
            }}>
              It works through something researchers call your <strong>Primary Cell</strong>.
            </p>
          </div>

          {/* CTA line - centered, inviting */}
          <p style={{ 
            fontSize: '1.1rem',
            fontWeight: '500',
            color: 'rgba(29, 44, 73, 1)',
            textAlign: 'center',
            marginBottom: '12px'
          }}>
            To begin, let's see if your condition fits the subcellular repair model.
          </p>

          {/* Footnotes - compact, legible */}
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

export default EducationQ2A;