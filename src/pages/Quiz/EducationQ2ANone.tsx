/**
 * Educational Response Q2A (None Version)
 * For users who selected "None" for treatments
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

export const EducationQ2ANone = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/quiz/q3-conditions');
  };

  const handleBack = () => {
    navigate('/quiz/q2-treatments');
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
            If you're here, it might mean that damage inside your cells is recreating your pain.
          </p>
          <p className={styles.educationText}>
            Peer‑reviewed research published in the <em>Journal of Prenatal & Perinatal Psychology & Health</em> has documented how subcellular damage patterns can persist and repeat indefinitely.
          </p>
          <p className={styles.educationText}>
            This means that pain caused by subcellular damage can persist and repeat throughout life—unless the cells are repaired.
          </p>
          <p className={styles.educationText}>
            Clinical teams using this research in real‑world practice have been repairing this subcellular damage for years, helping people permanently reduce and even eliminate their chronic pain* through gentle, non‑invasive, drug‑free techniques.
          </p>
          <p className={styles.educationText}>
            Cellular damage repair is based on specialized research that hasn't reached mainstream medicine yet—which is why your doctor hasn't mentioned it.
          </p>
          <p className={styles.educationText}>
            <strong>Cellular repair works through something called your Primary Cell.</strong>
          </p>
          <p className={styles.educationText}>
            To begin, let's see whether your condition fits the cellular repair model.
          </p>
          <p className={styles.disclaimerText}>
            *Based on clinical observations and ongoing research
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

export default EducationQ2ANone;