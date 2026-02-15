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
          <p className={styles.educationText}>
            <strong>Good news:</strong> Because you have <strong>{conditionTextFormatted}</strong>, there's a strong possibility your pain is caused by subcellular damage—which means it can be repaired.
          </p>
          <p className={styles.educationText}>
            <strong>This is where your Primary Cell comes in:</strong>
          </p>
          <p className={styles.educationText}>
            Researchers discovered your Primary Cell—a unique master cell that controls the pattern and function of every other cell in your body.**
          </p>
          <p className={styles.educationText}>
            Unlike regular cells, it never dies. It lasts your entire life.
          </p>
          <p className={styles.educationText}>
            When you get injured, have surgery, live with ongoing wear-and-tear, or your pain develops over time, your Primary Cell can sustain subcellular damage.*
          </p>
          <p className={styles.educationText}>
            <strong>Here's how this can cause your pain:</strong>
          </p>
          <p className={styles.educationText}>
            Your Primary Cell is like a master template your body follows. When an area of it is damaged, your body keeps following that disrupted pattern—and this unhealthy pattern causes pain where you hurt.
          </p>
          <p className={styles.educationText}>
            This damage can persist in your Primary Cell throughout your life.
          </p>
          <p className={styles.educationText}>
            When it's repaired, it creates a healthy pattern—relieving your pain.
          </p>
          <p className={styles.educationText}>
            <strong>The result?</strong>
          </p>
          <p className={styles.educationText}>
            For years, in real-world practice, some people find their pain permanently eliminated, while others experience significant reduction that lasts long-term.*
          </p>
          <p className={styles.educationText}>
            This is not pain management—this is repairing the subcellular source.
          </p>
          
          <div style={{ marginTop: '32px', lineHeight: '1.4' }}>
            <p className={styles.disclaimerText}>
              *Based on clinical observations and ongoing research
            </p>
            <p className={styles.disclaimerText}>
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