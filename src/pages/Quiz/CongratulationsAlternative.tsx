/**
 * Congratulations Page (Alternative)
 * For users with "Other" conditions requiring manual review
 */

import { useState } from 'react';
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
  chronic_fatigue_syndrome: 'Chronic Fatigue Syndrome',
  autoimmune_diseases: 'autoimmune diseases',
  fibromyalgia: 'fibromyalgia',
  infectious_diseases: 'infectious diseases',
  endocrine_disorders: 'endocrine disorders',
  gastrointestinal_disorders: 'gastrointestinal disorders',
};

// Non-treatable condition IDs
const NON_TREATABLE_IDS = [
  'chronic_fatigue_syndrome',
  'autoimmune_diseases',
  'fibromyalgia',
  'infectious_diseases',
  'endocrine_disorders',
  'gastrointestinal_disorders',
];

// Helper function to format list with "and" before last item
const formatListWithAnd = (items: string[]): string => {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
};

export const CongratulationsAlternative = () => {
  const navigate = useNavigate();
  const { state, setContactInfo } = useQuiz();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consentToText, setConsentToText] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const treatableLabels = (state.treatableConditions.length > 0 
    ? state.treatableConditions 
    : state.conditions.filter(id => CONDITION_LABELS[id] && !NON_TREATABLE_IDS.includes(id))
  )
    .map(id => CONDITION_LABELS[id])
    .filter(Boolean);

  const nonTreatableLabels = (state.nonTreatableConditions.length > 0
    ? state.nonTreatableConditions
    : state.conditions.filter(id => NON_TREATABLE_IDS.includes(id))
  )
    .map(id => CONDITION_LABELS[id])
    .filter(Boolean);

  const hasTreatable = treatableLabels.length > 0;
  const hasNonTreatable = nonTreatableLabels.length > 0;
  const conditionText = formatListWithAnd(treatableLabels);
  const nonTreatableText = formatListWithAnd(nonTreatableLabels);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setContactInfo({ name, email, phone });

    try {
      await fetch('/api/quiz/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz_id: state.quizId,
          name,
          email,
          phone,
          consent_to_text: consentToText,
        }),
      });

      // Navigate to welcome page
      navigate('/quiz/welcome');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your information. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/quiz/q7-open-questions');
  };

  return (
    <div className={styles.quizContainer}>
      <motion.div
        className={styles.quizContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.congratsHeadline}>
          Based on your answers you may be a candidate for cellular repair
        </h1>

        <div className={styles.congratsContent}>
          <p className={styles.bodyText}>
            A practitioner will review the condition(s) you submitted and contact you by email to let you know if we can help. <strong>Please submit the contact form below.</strong>
          </p>

          {hasTreatable && (
            <>
              <p className={styles.bodyText}>
                Your <strong>{conditionText}</strong> that you've had for more than 6 months make you a good candidate for cellular repair.
              </p>
              <p className={styles.bodyText}>
                Your pain is very likely caused by subcellular damage that can be repaired.
              </p>
            </>
          )}

          {hasNonTreatable && (
            <p className={styles.bodyText}>
              However, techniques to address <strong>{nonTreatableLabels.join(', ')}</strong> do not currently exist. And the clinical teams are continuously researching new solutions.
            </p>
          )}

          <p className={styles.bodyText}>
            <strong>To learn how we reduce or eliminate chronic pain:</strong>
          </p>
          <p className={styles.bodyText}>
            Watch the case study of Chad—a client who had 5 years of severe degenerative bone-on-bone neck pain that made him nauseous, grumpy, and unable to function.
          </p>
          <p className={styles.bodyText}>You'll see:</p>
          <ul className={styles.bulletList}>
            <li>Highlights from his Pain Consultation—sharing his fight to push through pain just to perform at work each day</li>
            <li>An unedited demonstration of the cellular repair process</li>
            <li>The exact moment he realizes his pain is completely gone</li>
            <li>His wife describe what life feels like now that his pain is finally gone</li>
          </ul>

          <p className={styles.bodyText}>
            Most people know if we're the right solution by the end of the video because they see the whole process.
          </p>
          <p className={styles.bodyText}>
            We'll email you the link so you can rewatch it anytime.
          </p>
          <p className={styles.bodyText}>
            <strong>Enter your information below to get instant access:</strong>
          </p>

          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formField}>
              <label htmlFor="name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="phone" className={styles.label}>
                Phone <span className={styles.required}>*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.consentSection}>
              <p style={{ fontSize: '0.875rem', color: 'rgba(107, 114, 128, 1)', marginBottom: '12px', lineHeight: '1.5' }}>
                Pain relief decisions are easier when your questions get answered quickly. Get text-only answers—no calls—so you can quickly see whether cellular repair is the right fit for you.
              </p>
              <label className={styles.checkboxLabel} style={{ border: 'none', padding: '8px 0' }}>
                <input
                  type="checkbox"
                  checked={consentToText}
                  onChange={(e) => setConsentToText(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText} style={{ fontSize: '0.875rem', color: 'rgba(107, 114, 128, 1)' }}>
                  I consent to receive text messages. Standard message and data rates may apply.
                </span>
              </label>
            </div>

            <Button type="submit" variant="primary" size="large" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Watch Chad\'s Case Study Now'}
            </Button>
          </form>

          <div className={styles.navigationButtons} style={{ marginTop: '24px' }}>
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CongratulationsAlternative;