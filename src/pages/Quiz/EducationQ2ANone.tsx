/**
 * Educational Response Q2A (None Version)
 * For users who selected "None" for treatments
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@components/common/Button';
import QuizFooter from './QuizFooter';
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
            If you're here, it might mean that you have subcellular damage that is recreating your pain.
          </p>
          <p className={styles.educationText}>
            Peer-reviewed research has documented its existence and how these damage patterns can persist indefinitely.**
          </p>
          <p className={styles.educationText}>
            This means pain caused by subcellular damage can continue throughout your life—unless the damage is repaired.
          </p>
          <p className={styles.educationText}>
            Clinical teams using this research in real-world practice have been helping people permanently reduce and even eliminate their chronic pain* through gentle, non-invasive techniques.
          </p>
          <p className={styles.educationText}>
            This subcellular repair approach is based on specialized research that hasn't reached mainstream medicine yet—which is why your doctor hasn't mentioned it.
          </p>
          <p className={styles.educationText}>
            It works through something researchers call your <strong>Primary Cell</strong>.
          </p>
          <p className={styles.educationText}>
            To begin, let's see if your condition fits the subcellular repair model.
          </p>
          <p className={styles.disclaimerText}>
            *Based on clinical observations and ongoing research
          </p>
          <p className={styles.disclaimerText}>
            **Journal of Prenatal & Perinatal Psychology & Health (2024, 2025)
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

export default EducationQ2ANone;