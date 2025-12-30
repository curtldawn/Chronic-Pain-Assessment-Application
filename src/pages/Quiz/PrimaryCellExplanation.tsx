/**
 * Primary Cell Explanation Page
 * Shows after qualifying condition selection
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
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
    <div className={styles.quizContainer}>
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
            Researchers have identified what they call your <strong>Primary Cell</strong>—a specialized master cell that controls the pattern and function of all cells in your body.
          </p>
          <p className={styles.educationText}>
            Unlike regular cells, your Primary Cell doesn't die and regenerate every few months.
          </p>
          <p className={styles.educationText}>
            When you get injured or have ongoing degenerative problems, your Primary Cell can sustain damage* and/or trigger subcellular damage that occurred before birth.**
          </p>
          <p className={styles.educationText}>
            This subcellular damage persists in your Primary Cell throughout your life, continuously signaling pain.
          </p>
          <p className={styles.educationText}>
            <strong>When your Primary Cell is repaired, it eliminates the source of your pain.</strong>
          </p>
          <p className={styles.educationText}>
            The result?
          </p>
          <p className={styles.educationText}>
            Some people find their pain permanently eliminated, while others experience a significant permanent reduction.
          </p>
          <p className={styles.educationText}>
            <strong>This isn't pain management—this is fixing the subcellular source by repairing your Primary Cell.</strong>
          </p>
          
          <div style={{ marginTop: '24px' }}>
            <p className={styles.disclaimerText} style={{ marginBottom: '4px' }}>
              *Based on clinical observations and ongoing research
            </p>
            <p className={styles.disclaimerText} style={{ marginBottom: '0' }}>
              **Journal of Prenatal & Perinatal Psychology & Health, published 11-03-2024
            </p>
          </div>

          <div className={styles.navigationButtons}>
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button variant="primary" size="large" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrimaryCellExplanation;