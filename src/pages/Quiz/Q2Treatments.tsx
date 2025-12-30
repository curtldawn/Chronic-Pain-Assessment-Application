/**
 * Q2 Treatments Page
 * "What treatments have you tried?"
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '@context/QuizContext';
import { Button } from '@components/common/Button';
import styles from './Quiz.module.css';

const TREATMENT_OPTIONS = [
  { id: 'physical_therapy', label: 'Physical therapy' },
  { id: 'chiropractic_care', label: 'Chiropractic care' },
  { id: 'injections', label: 'Injections (steroid injections, nerve blocks, etc.)' },
  { id: 'surgery', label: 'Surgery' },
  { id: 'pain_medications', label: 'Pain medications' },
  { id: 'other', label: 'Other' },
  { id: 'none', label: 'None' },
];

const MEDICATION_TYPES = [
  { id: 'otc', label: 'Over-the-counter (Tylenol, Advil, etc.)' },
  { id: 'prescription_opioids', label: 'Prescription painkillers (opioids like Oxycodone, Hydrocodone, etc.)' },
  { id: 'benzo', label: 'Benzo prescriptions for anxiety (Xanax, Valium, Ativan, Klonopin)' },
  { id: 'other_prescription', label: 'Other prescription pain meds' },
];

export const Q2Treatments = () => {
  const navigate = useNavigate();
  const { state, setTreatmentsTried, setPainMedicationsTypes } = useQuiz();
  const [selected, setSelected] = useState<string[]>(state.treatmentsTried);
  const [medicationTypes, setMedicationTypes] = useState<string[]>(state.painMedicationsTypes);
  const [showMedDropdown, setShowMedDropdown] = useState(false);

  const handleToggle = (id: string) => {
    if (id === 'none') {
      // If selecting "None", clear all others
      setSelected(['none']);
      setShowMedDropdown(false);
    } else {
      // Remove "none" if it was selected
      const filtered = selected.filter(s => s !== 'none');
      
      if (selected.includes(id)) {
        setSelected(filtered.filter(s => s !== id));
        if (id === 'pain_medications') {
          setShowMedDropdown(false);
          setMedicationTypes([]);
        }
      } else {
        setSelected([...filtered, id]);
        if (id === 'pain_medications') {
          setShowMedDropdown(true);
        }
      }
    }
  };

  const handleMedicationToggle = (id: string) => {
    if (medicationTypes.includes(id)) {
      setMedicationTypes(medicationTypes.filter(m => m !== id));
    } else {
      setMedicationTypes([...medicationTypes, id]);
    }
  };

  const handleContinue = () => {
    setTreatmentsTried(selected);
    setPainMedicationsTypes(medicationTypes);

    if (selected.includes('none')) {
      // Go directly to Educational Response Q2A (None version)
      navigate('/quiz/education-q2a-none');
    } else {
      // Go to Connecting Message
      navigate('/quiz/connecting-message-q2');
    }
  };

  const handleBack = () => {
    navigate('/quiz/q1-duration');
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
            What treatments have you tried to help with your pain?
          </h2>
          <p className={styles.helperText}>(Select all that apply)</p>

          <div className={styles.checkboxGrid}>
            {TREATMENT_OPTIONS.map((option) => (
              <label key={option.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selected.includes(option.id)}
                  onChange={() => handleToggle(option.id)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>{option.label}</span>
              </label>
            ))}
          </div>

          <AnimatePresence>
            {showMedDropdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.dropdownSection}
              >
                <h3 className={styles.dropdownQuestion}>
                  Which type(s) of pain medications have you used in the last 2+ months?
                </h3>
                <p className={styles.helperText}>(Select all that apply)</p>

                <div className={styles.checkboxGrid}>
                  {MEDICATION_TYPES.map((med) => (
                    <label key={med.id} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={medicationTypes.includes(med.id)}
                        onChange={() => handleMedicationToggle(med.id)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxText}>{med.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.navigationButtons}>
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="primary"
            size="large"
            onClick={handleContinue}
            disabled={selected.length === 0}
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Q2Treatments;