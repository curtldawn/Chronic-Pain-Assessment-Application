/**
 * Q3 Conditions Page
 * "Which condition(s) are you dealing with?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

const CONDITIONS = [
  { id: 'chronic_back_pain', label: 'Chronic back pain' },
  { id: 'chronic_neck_pain', label: 'Chronic neck pain' },
  { id: 'bone_on_bone_joint_pain', label: 'Bone‑on‑bone joint pain (hips, knees, shoulders, hands, spine, etc.)' },
  { id: 'old_injury_pain', label: 'Old injury pain (car crash, fall, sports injury, etc.)' },
  { id: 'herniated_bulging_disc', label: 'Herniated or Bulging disc' },
  { id: 'sciatica_constant', label: 'Sciatica (constant)' },
  { id: 'spinal_stenosis_spondylosis', label: 'Spinal stenosis or Spondylosis' },
  { id: 'si_joint_pain', label: 'SI joint pain (pain in the hip/buttock)' },
  { id: 'pelvic_pain', label: 'Pelvic pain' },
  { id: 'mystery_pain', label: 'Mystery pain (pain with no clear diagnosis)' },
  { id: 'chronic_fatigue_syndrome', label: 'Chronic Fatigue Syndrome' },
  { id: 'autoimmune_diseases', label: 'Autoimmune diseases' },
  { id: 'fibromyalgia', label: 'Fibromyalgia' },
  { id: 'infectious_diseases', label: 'Infectious diseases' },
  { id: 'endocrine_disorders', label: 'Endocrine disorders' },
  { id: 'gastrointestinal_disorders', label: 'Gastrointestinal disorders' },
];

export const Q3Conditions = () => {
  const navigate = useNavigate();
  const { state, setConditions, setConditionOther, setQualificationStatus } = useQuiz();
  const [selected, setSelected] = useState<string[]>(state.conditions);
  const [otherText, setOtherText] = useState(state.conditionOther);
  const [showOtherField, setShowOtherField] = useState(false);

  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleContinue = async () => {
    setConditions(selected);
    setConditionOther(otherText);

    // Analyze conditions via backend
    try {
      const response = await fetch('/api/quiz/analyze-conditions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conditions: selected,
          condition_other: otherText,
        }),
      });

      const analysis = await response.json();
      
      setQualificationStatus({
        qualificationStatus: analysis.qualification_status,
        treatableConditions: analysis.treatable_conditions,
        nonTreatableConditions: analysis.non_treatable_conditions,
        requiresManualReview: analysis.requires_manual_review,
      });

      // Route based on analysis
      if (analysis.qualification_status === 'disqualified_non_treatable') {
        navigate('/quiz/disqualified-non-treatable');
      } else if (analysis.qualification_status === 'manual_review' && !analysis.treatable_conditions.length) {
        navigate('/quiz/manual-review');
      } else if (analysis.should_show_alternative_primary_cell) {
        navigate('/quiz/manual-review');
      } else if (analysis.should_show_primary_cell) {
        navigate('/quiz/primary-cell-explanation');
      }
    } catch (error) {
      console.error('Error analyzing conditions:', error);
      // Fallback routing
      navigate('/quiz/primary-cell-explanation');
    }
  };

  const handleBack = () => {
    // Go back to appropriate education page based on previous path
    const hasTreatments = state.treatmentsTried.length > 0 && !state.treatmentsTried.includes('none');
    if (hasTreatments) {
      navigate('/quiz/education-q2a');
    } else {
      navigate('/quiz/education-q2a-none');
    }
  };

  return (
    <div className={styles.quizContainer}>
      <motion.div
        className={styles.quizContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.questionSection}>
          <h2 className={styles.question}>
            Which condition(s) are you dealing with?
          </h2>
          <p className={styles.helperText}>(Select all that apply)</p>

          <div className={styles.checkboxGrid}>
            {CONDITIONS.map((condition) => (
              <label key={condition.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selected.includes(condition.id)}
                  onChange={() => handleToggle(condition.id)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>{condition.label}</span>
              </label>
            ))}

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showOtherField}
                onChange={(e) => setShowOtherField(e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>Other</span>
            </label>
          </div>

          {showOtherField && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={styles.formField}
              style={{ marginTop: '16px' }}
            >
              <textarea
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Please describe your condition..."
                className={styles.textarea}
                rows={3}
              />
              {otherText.length > 0 && (
                <p className={styles.helperText} style={{ marginTop: '12px', marginBottom: '0' }}>
                  A practitioner will review your condition and contact you by email to let you know if we can help.
                </p>
              )}
            </motion.div>
          )}
        </div>

        <div className={styles.navigationButtons}>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="primary"
            size="large"
            onClick={handleContinue}
            disabled={selected.length === 0 && !otherText.trim()}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Q3Conditions;