/**
 * Congratulations Page (Alternative)
 * For users with "Other" conditions requiring manual review
 */

import { useState } from 'react';
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

// Neck and back pain condition IDs (for conditional sentence)
const NECK_BACK_PAIN_IDS = ['chronic_back_pain', 'chronic_neck_pain'];

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

  // Get treatable condition IDs for checking neck/back pain
  const treatableConditionIds = state.treatableConditions.length > 0 
    ? state.treatableConditions 
    : state.conditions.filter(id => CONDITION_LABELS[id] && !NON_TREATABLE_IDS.includes(id));

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

  // Check if user selected neck or back pain (for conditional sentence)
  const hasNeckOrBackPain = treatableConditionIds.some(id => NECK_BACK_PAIN_IDS.includes(id));
  // Show the "While Chad's case..." sentence only if user did NOT select neck or back pain
  const showChadComparisonSentence = !hasNeckOrBackPain && treatableLabels.length > 0;

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
    <div className={`${styles.quizContainer} ${styles.quizContainerRelative}`}>
      <button className={styles.backArrow} onClick={handleBack} aria-label="Go back">
        ←
      </button>
      <motion.div
        className={styles.quizContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.congratsHeadline}>
          Based on your answers you may be a candidate for subcellular repair
        </h1>

        <div className={styles.congratsContent}>
          {/* Practitioner review notice */}
          <div style={{
            backgroundColor: 'rgba(239, 246, 255, 1)',
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
              A practitioner will review the condition(s) you submitted and contact you by email to let you know if we can help. <strong>Please submit the contact form below.</strong>
            </p>
          </div>

          {hasTreatable && (
            <div style={{
              backgroundColor: 'rgba(236, 253, 245, 1)',
              borderRadius: '10px',
              padding: '18px 20px',
              marginBottom: '20px'
            }}>
              <p style={{ 
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: 'rgba(29, 44, 73, 0.9)',
                marginBottom: '12px'
              }}>
                Your <strong>{conditionText}</strong> that you've had for more than 6 months make you eligible for subcellular repair.
              </p>
              <p style={{ 
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: 'rgba(29, 44, 73, 0.9)',
                margin: '0'
              }}>
                Your pain is very likely caused by subcellular damage that can be reversed.
              </p>
            </div>
          )}

          {hasNonTreatable && (
            <p style={{ 
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: 'rgba(29, 44, 73, 0.8)',
              fontStyle: 'italic',
              marginBottom: '20px'
            }}>
              However, techniques to address <strong>{nonTreatableText}</strong> do not currently exist. And the clinical teams are continuously researching new solutions.
            </p>
          )}

          {/* Video CTA - Centered hook */}
          <div style={{ 
            margin: '24px 0 20px',
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
              margin: '0'
            }}>
              Want to see how we reduce or eliminate chronic pain?
            </p>
          </div>

          {/* Chad's story */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              marginBottom: '12px'
            }}>
              Watch session footage to see how subcellular repair works—eliminating Chad's pain.
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              marginBottom: '12px'
            }}>
              Chad spent 5 years throwing up from severe neck and back pain, calling in sick regularly.
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 1)',
              fontWeight: '500',
              margin: '0'
            }}>
              Today, he has his life back—and the pain has never returned.
            </p>
          </div>

          {/* What you'll see - Card with list */}
          <div style={{
            backgroundColor: 'rgba(239, 246, 255, 1)',
            borderRadius: '10px',
            padding: '18px 20px',
            marginBottom: '20px'
          }}>
            <p style={{ 
              fontSize: '1rem',
              fontWeight: '600',
              color: 'rgba(29, 44, 73, 1)',
              marginBottom: '12px'
            }}>
              You'll see in his Zoom sessions:
            </p>
            <ul style={{ 
              margin: '0',
              paddingLeft: '20px',
              listStyleType: 'disc'
            }}>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(29, 44, 73, 0.9)', marginBottom: '8px' }}>
                Highlights from his Pain Relief Consultation—sharing his fight to push through pain just to perform at work each day
              </li>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(29, 44, 73, 0.9)', marginBottom: '8px' }}>
                An unedited demonstration of the subcellular repair process during one of his Zoom sessions–yes, we work over Zoom nationwide
              </li>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(29, 44, 73, 0.9)', marginBottom: '8px' }}>
                The exact moment he realizes his pain is completely gone—neck, mid-back, & lower back
              </li>
              <li style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(29, 44, 73, 0.9)', margin: '0' }}>
                His wife describes what life feels like now that his pain is finally gone
              </li>
            </ul>
          </div>

          {/* Closing statements */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 1)',
              fontWeight: '500',
              marginBottom: '12px'
            }}>
              Most people know if we're the right solution by the end of the video because they see the whole process.
            </p>
            <p style={{ 
              fontSize: '1rem',
              lineHeight: '1.7',
              color: 'rgba(29, 44, 73, 0.9)',
              margin: '0'
            }}>
              We'll email you the link so you can rewatch it anytime.
            </p>
          </div>
          
          {showChadComparisonSentence && (
            <p style={{ 
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: 'rgba(29, 44, 73, 0.85)',
              fontStyle: 'italic',
              marginBottom: '20px'
            }}>
              While Chad's case demonstrates neck and back pain, the subcellular repair process works the same for your <strong>{conditionText}</strong>.
            </p>
          )}

          {/* Form CTA */}
          <p style={{ 
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'rgba(29, 44, 73, 1)',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Enter your information below to get instant access:
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
              <p style={{ fontSize: '0.8125rem', color: 'rgba(107, 114, 128, 1)', marginBottom: '16px', lineHeight: '1.5' }}>
                Pain relief decisions are easier when your questions get answered quickly. Get text-only answers—no calls—so you can quickly see whether cellular repair is the right fit for you.
              </p>
              <label className={styles.checkboxLabel} style={{ border: 'none', padding: '8px 0', alignItems: 'flex-start' }}>
                <input
                  type="checkbox"
                  checked={consentToText}
                  onChange={(e) => setConsentToText(e.target.checked)}
                  className={styles.checkbox}
                  required
                  style={{ marginTop: '3px' }}
                />
                <span className={styles.checkboxText} style={{ fontSize: '0.8125rem', color: 'rgba(107, 114, 128, 1)' }}>
                  I agree to receive text messages about my care from Wellness In Weeks ("WIW") at the number I provide. If I choose to move forward, WIW may also text me about scheduling and available consultation openings. Message frequency may vary and message/data rates may apply. Consent is not required to receive care or buy services. Reply STOP to opt out and HELP for help. <span className={styles.required}>*</span>
                </span>
              </label>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(107, 114, 128, 1)', marginTop: '16px', lineHeight: '1.5' }}>
                By proceeding, you confirm you've reviewed our <a href="/quiz/privacy-policy" style={{ color: 'rgba(29, 44, 73, 1)', textDecoration: 'underline' }}>SMS & Privacy Policy</a>.
              </p>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="large" 
              fullWidth 
              disabled={isSubmitting || !consentToText || !name.trim() || !email.trim() || !phone.trim()}
            >
              {isSubmitting ? 'Submitting...' : 'Watch Chad\'s Case Study Now'}
            </Button>
          </form>
        </div>
        <QuizFooter />
      </motion.div>
    </div>
  );
};

export default CongratulationsAlternative;