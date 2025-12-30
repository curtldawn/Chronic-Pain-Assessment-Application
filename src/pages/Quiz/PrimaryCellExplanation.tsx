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

  const treatableLabels = state.treatableConditions
    .map(id => CONDITION_LABELS[id])
    .filter(Boolean);

  const conditionText = treatableLabels.length > 0 
    ? treatableLabels.map((label, index) => {
        if (index === 0) return <strong key={index}>{label}</strong>;
        if (index === treatableLabels.length - 1) return <span key={index}> and <strong>{label}</strong></span>;
        return <span key={index}>, <strong>{label}</strong></span>;
      })
    : <strong>your condition</strong>;

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
            <strong>Good news:</strong> Because you have {conditionText}, there's a strong possibility your pain is caused by subcellular damage—which means it can be repaired.
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
          
          <p className={styles.disclaimerText}>
            *Based on clinical observations and ongoing research
          </p>
          <p className={styles.disclaimerText}>
            **Journal of Prenatal & Perinatal Psychology & Health, published 11-03-2024
          </p>

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