/**
 * Primary Cell Explanation Page
 * Shows after qualifying condition selection
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
import styles from './Quiz.module.css';

const CONDITION_LABELS: Record<string, string> = {
  chronic_back_pain: 'chronic back pain',
  chronic_neck_pain: 'chronic neck pain',
  bone_on_bone_joint_pain: 'bone-on-bone joint pain',
  old_injury_pain: 'old injury pain',
  herniated_bulging_disc: 'herniated or bulging disc',
  sciatica_constant: 'sciatica',
  spinal_stenosis_spondylosis: 'spinal stenosis or spondylosis',
  si_joint_pain: 'SI joint pain',
  pelvic_pain: 'pelvic pain',
  mystery_pain: 'mystery pain',
};

export const PrimaryCellExplanation = () => {
  const navigate = useNavigate();
  const { state } = useQuiz();

  // Get treatable condition labels - try both sources
  const treatableLabels = (state.treatableConditions.length > 0 
    ? state.treatableConditions 
    : state.conditions.filter(id => CONDITION_LABELS[id])
  )
    .map(id => CONDITION_LABELS[id])
    .filter(Boolean);

  // Format the condition text with proper grammar
  let conditionTextFormatted = '';
  if (treatableLabels.length === 0) {
    conditionTextFormatted = 'your condition';
  } else if (treatableLabels.length === 1) {
    conditionTextFormatted = treatableLabels[0];
  } else if (treatableLabels.length === 2) {
    conditionTextFormatted = `${treatableLabels[0]} and ${treatableLabels[1]}`;
  } else {
    const lastCondition = treatableLabels[treatableLabels.length - 1];
    const otherConditions = treatableLabels.slice(0, -1).join(', ');
    conditionTextFormatted = `${otherConditions}, and ${lastCondition}`;
  }

  const handleContinue = () => {
    navigate('/quiz/q4-whats-missing');
  };

  const handleBack = () => {
    navigate('/quiz/q3-conditions');
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
          {/* Good News - Highlighted opening */}
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
              <strong>Good news:</strong> Because you have <strong>{conditionTextFormatted}</strong>, there's a strong possibility your pain is caused by subcellular damage—which means it can be repaired.
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
              Researchers discovered your <span style={{
                fontWeight: '600',
                color: 'rgba(29, 44, 73, 1)',
                backgroundColor: 'rgba(29, 44, 73, 0.08)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>Primary Cell</span>—a unique master cell that controls the pattern and function of every other cell in your body.**
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
              margin: '0 0 16px 0'
            }}>
              Here's how this can cause your pain:
            </p>
          </div>

          <div style={{ 
            borderLeft: '3px solid rgba(29, 44, 73, 0.3)',
            paddingLeft: '18px',
            marginBottom: '20px'
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
              fontWeight: '500',
              fontStyle: 'italic',
              margin: '0'
            }}>
              This is not pain management—this is repairing the subcellular source.
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

export default PrimaryCellExplanation;