# COMPREHENSIVE QUIZ FUNNEL BACKUP DOCUMENTATION
## Primary Cell Assessment Application — Complete Reference

> **Generated:** February 2026
> **Purpose:** Complete backup of all quiz funnel logic, ad copy, design specifications, and routing rules.
> **Business:** Wellness In Weeks (WIW)

---

## TABLE OF CONTENTS

1. [Funnel Flow Overview](#1-funnel-flow-overview)
2. [Complete Branching Logic Flowchart](#2-complete-branching-logic-flowchart)
3. [Condition Categories (Treatable vs Non-Treatable)](#3-condition-categories)
4. [Page-by-Page Ad Copy](#4-page-by-page-ad-copy)
5. [Design Specifications](#5-design-specifications)
6. [Routing Rules](#6-routing-rules)
7. [State Management](#7-state-management)
8. [Backend API Endpoints](#8-backend-api-endpoints)
9. [Form Fields & Validation](#9-form-fields--validation)
10. [Legal & Compliance Text](#10-legal--compliance-text)

---

## 1. FUNNEL FLOW OVERVIEW

The quiz funnel replaces the old 17-page assessment with a streamlined 7-question flow. Users are screened, educated, and routed to one of several outcomes based on their condition profile.

### High-Level Flow:
```
Q1 (Duration) → Q2 (Treatments) → Education Pages → Q3 (Conditions) → 
  → [Branching based on conditions] →
  → Primary Cell Explanation → Q4 (What's Missing) → Q5 (Urgency) →
  → Q6 (Spending) → Q7 (Open Questions) → Congratulations → Welcome
```

### All Pages in Order:
| # | Route | Page Name | Type |
|---|-------|-----------|------|
| 1 | `/quiz/q1-duration` | Q1 Duration | Question |
| 2 | `/quiz/disqualified-too-soon` | Disqualified Too Soon | Exit |
| 3 | `/quiz/q2-treatments` | Q2 Treatments | Question |
| 4 | `/quiz/connecting-message-q2` | Connecting Message | Interstitial |
| 5 | `/quiz/education-q2a` | Education Q2A (Standard) | Education |
| 6 | `/quiz/education-q2a-none` | Education Q2A (None) | Education |
| 7 | `/quiz/q3-conditions` | Q3 Conditions | Question |
| 8 | `/quiz/disqualified-non-treatable` | Disqualified Non-Treatable | Exit |
| 9 | `/quiz/manual-review` | Manual Review Notice | Interstitial |
| 10 | `/quiz/primary-cell-explanation` | Primary Cell Explanation | Education |
| 11 | `/quiz/alternative-primary-cell-explanation` | Alternative Primary Cell | Education |
| 12 | `/quiz/q4-whats-missing` | Q4 What's Missing | Question |
| 13 | `/quiz/q5-urgency` | Q5 Urgency | Question |
| 14 | `/quiz/q6-annual-spending` | Q6 Annual Spending | Question |
| 15 | `/quiz/q7-open-questions` | Q7 Open Questions | Question |
| 16 | `/quiz/congratulations` | Congratulations (Standard) | Conversion |
| 17 | `/quiz/congratulations-alternative` | Congratulations (Alternative) | Conversion |
| 18 | `/quiz/welcome` | Welcome / Video + Calendar | Conversion |
| 19 | `/quiz/thank-you-non-treatable` | Thank You Non-Treatable | Exit |
| 20 | `/quiz/terms-and-conditions` | Terms and Conditions | Legal |
| 21 | `/quiz/privacy-policy` | Privacy Policy | Legal |

---

## 2. COMPLETE BRANCHING LOGIC FLOWCHART

```
START → Q1: "How long have you been dealing with chronic pain?"
│
├─ "6 months or less" → DISQUALIFIED TOO SOON (Contact form + waiting list)
│
└─ "More than 6 months" → Show Q1 Educational Response → Q2
    │
    Q2: "What treatments have you tried?"
    │
    ├─ Selected "None" → EDUCATION Q2A (NONE VERSION) → Q3
    │
    └─ Selected any treatment(s) → CONNECTING MESSAGE Q2 → EDUCATION Q2A (STANDARD) → Q3
        │
        Q3: "Which condition(s) are you dealing with?"
        │
        │  Backend POST /api/quiz/analyze-conditions determines path:
        │
        ├─ CASE 1: ONLY treatable conditions selected (no "Other", no non-treatable)
        │   → qualification_status: "qualified"
        │   → PRIMARY CELL EXPLANATION → Q4 → Q5 → Q6 → Q7 → CONGRATULATIONS (Standard)
        │
        ├─ CASE 2: Treatable + Non-Treatable (no "Other")
        │   → qualification_status: "qualified"
        │   → PRIMARY CELL EXPLANATION → Q4 → Q5 → Q6 → Q7 → CONGRATULATIONS (Standard)
        │   (Non-treatable disclaimer shown on Congrats page)
        │
        ├─ CASE 3: ONLY non-treatable conditions (no treatable, no "Other")
        │   → qualification_status: "disqualified_non_treatable"
        │   → DISQUALIFIED NON-TREATABLE (Notify Me form)
        │   → THANK YOU NON-TREATABLE (after form submit)
        │
        ├─ CASE 4: "Other" ONLY (no treatable, no non-treatable)
        │   → qualification_status: "manual_review"
        │   → MANUAL REVIEW → ALT PRIMARY CELL EXPLANATION → Q4 → Q5 → Q6 → Q7
        │   → CONGRATULATIONS (Alternative)
        │
        ├─ CASE 5: "Other" + Treatable (no non-treatable)
        │   → qualification_status: "manual_review"
        │   → MANUAL REVIEW → ALT PRIMARY CELL EXPLANATION → Q4 → Q5 → Q6 → Q7
        │   → CONGRATULATIONS (Alternative)
        │
        └─ CASE 6: "Other" + Non-Treatable (with or without treatable)
            → qualification_status: "manual_review"
            → MANUAL REVIEW → ALT PRIMARY CELL EXPLANATION → Q4 → Q5 → Q6 → Q7
            → CONGRATULATIONS (Alternative)

KEY RULE: ANY presence of "Other" text → ALWAYS goes to Manual Review first.
```

### Congratulations Page Routing (from Q7):
```
Q7 → Check: Does user have conditionOther text OR requiresManualReview OR qualificationStatus === "manual_review"?
│
├─ YES → CONGRATULATIONS (Alternative) — Includes practitioner review notice
│
└─ NO → CONGRATULATIONS (Standard) — Direct qualification messaging
```

### Conditional Sentence Logic (Chad's Case Comparison):
On both Congratulations pages, this italicized sentence may appear:

> *"While Chad's case demonstrates neck and back pain, the subcellular repair process works the same for your [conditions]."*

**Display Rules:**
- **HIDE** if user selected `chronic_back_pain` OR `chronic_neck_pain` (because Chad's case IS their case)
- **SHOW** if user has treatable conditions but NONE are neck/back pain
- On Alternative page only: If user has NO treatable conditions (Other only), show alternative text:
  > *"While Chad's case demonstrates neck and back pain, the subcellular repair process works the same for all eligible cases—possibly the one you submitted."*

---

## 3. CONDITION CATEGORIES

### Treatable Conditions (10 total):
| ID | Display Label |
|----|---------------|
| `chronic_back_pain` | Chronic back pain |
| `chronic_neck_pain` | Chronic neck pain |
| `bone_on_bone_joint_pain` | Bone-on-bone joint pain (hips, knees, shoulders, hands, spine, etc.) |
| `old_injury_pain` | Old injury pain (car crash, fall, sports injury, etc.) |
| `herniated_bulging_disc` | Herniated or Bulging disc |
| `sciatica_constant` | Sciatica (constant) |
| `spinal_stenosis_spondylosis` | Spinal stenosis or Spondylosis |
| `si_joint_pain` | SI joint pain (pain in the hip/buttock) |
| `pelvic_pain` | Pelvic pain |
| `mystery_pain` | Mystery pain (pain with no clear diagnosis) |

### Non-Treatable Conditions (6 total):
| ID | Display Label |
|----|---------------|
| `chronic_fatigue_syndrome` | Chronic Fatigue Syndrome |
| `autoimmune_diseases` | Autoimmune diseases |
| `fibromyalgia` | Fibromyalgia |
| `infectious_diseases` | Infectious diseases |
| `endocrine_disorders` | Endocrine disorders |
| `gastrointestinal_disorders` | Gastrointestinal disorders |

### Special: "Other"
- Free-text field (textarea, 3 rows)
- When checked AND text entered: triggers Manual Review path
- When unchecked: text is cleared from state
- Helper text appears when text is entered: "A practitioner will review your condition and contact you by email to let you know if we can help."

---

## 4. PAGE-BY-PAGE AD COPY

### PAGE: Q1 Duration (`/quiz/q1-duration`)

**Headline:**
> Still in Pain After Everything You've Tried?

**Subheadline:**
> Take this 7-minute assessment to discover a new way to relieve chronic pain—and see if you qualify for subcellular repair.

**Question:**
> How long have you been dealing with chronic pain?

**Options:**
- 6 months or less
- More than 6 months

**Educational Response (after selecting "More than 6 months"):**

> By 6 months, you likely felt that your pain would be resolved or certainly in a better place by now.

> Yet here you are–still in pain, but **determined to find real relief**.

> ── *So, what's keeping the pain going?* ──

> New peer-reviewed research has found that chronic pain is often linked to **subcellular damage**—and that damage can create ongoing pain.

> This damage might be the source of your chronic pain condition, and it **can be repaired** for relief, depending on your specific case.

[Continue Button]

---

### PAGE: Disqualified Too Soon (`/quiz/disqualified-too-soon`)

**Headline:**
> Thank You for Your Interest

**Section 1 — Current Status (light card):**
> Based on your answer, it's a little early to know if subcellular repair is right for you.
>
> Your body may still be completing its healing process—and that's completely normal.

**Section 2 — Key Insight (bold text):**
> If your pain continues beyond 6 months, it's a strong indicator that subcellular damage is present—and that's when subcellular repair might become the solution.

**Section 3 — The Science (subtle card):**
> When you get injured, have surgery, live with ongoing wear-and-tear, or your pain develops over time, you can sustain subcellular damage.*
>
> New peer-reviewed research has found that chronic pain is often linked to subcellular damage—and that damage can create ongoing pain.
>
> If subcellular damage is the source of your chronic pain condition, it can be repaired for lasting relief.
>
> *Based on clinical observations and ongoing research

**Section 4 — CTA Callout Box (left border accent):**
> **To avoid losing contact with us, would you like us to check in later?**
>
> Once it's been 6 months since your pain started, we'll email you a link to retake this assessment and send you a text letting you know the email has arrived.

**Form Fields:**
- Approximate Date Pain Began (date picker)
- Name *
- Email *
- Phone *
- Consent checkbox (required)

**Buttons:**
- "Yes, Check In Later" (primary)
- "No thanks, I'll reach out on my own" (text link)

---

### PAGE: Q2 Treatments (`/quiz/q2-treatments`)

**Question:**
> What treatments have you tried to help with your pain?

**Helper Text:** (Select all that apply)

**Options:**
- Physical therapy
- Chiropractic care
- Injections (steroid injections, nerve blocks, etc.)
- Surgery
- Pain medications
- Other
- None

**Conditional Sub-question (when "Pain medications" selected):**
> Which type(s) of pain medications have you used in the last 2+ months?

**Medication Options:**
- Over-the-counter (Tylenol, Advil, etc.)
- Prescription painkillers (opioids like Oxycodone, Hydrocodone, etc.)
- Benzo prescriptions for anxiety (Xanax, Valium, Ativan, Klonopin)
- Other prescription pain meds

**Logic:**
- Selecting "None" clears all other selections
- Selecting any other option removes "None" if selected

---

### PAGE: Connecting Message Q2 (`/quiz/connecting-message-q2`)
*Shows only if user selected treatments (NOT "None")*

**Opening hook (centered, bold):**
> Here's what all these treatments have in common:

**Key Insight (blue highlighted card):**
> They address symptoms or functional structural issues, but **they do not repair the subcellular damage** that can keep recreating your pain.

**Conclusion:**
> That's why the relief is temporary or incomplete—**the subcellular source was never addressed.**

---

### PAGE: Education Q2A — Standard Version (`/quiz/education-q2a`)
*Shows after Connecting Message (user tried treatments)*

> Subcellular damage does not show up on scans.
>
> But peer-reviewed research has documented its existence and how these damage patterns can persist indefinitely.**

**Emphasized consequence:**
> This means pain caused by subcellular damage can continue throughout your life—unless the damage is repaired.

**Solution (green highlighted card):**
> Clinical teams using this research in real-world practice have been helping people **permanently reduce and even eliminate their chronic pain*** through gentle, non-invasive techniques.

**Research context:**
> This subcellular repair approach is based on specialized research that hasn't reached mainstream medicine yet—which is why your doctor hasn't mentioned it.
>
> It works through something researchers call your **Primary Cell**.

**CTA (centered):**
> To begin, let's see if your condition fits the subcellular repair model.

**Footnotes:**
> *Based on clinical observations and ongoing research
> **Journal of Prenatal & Perinatal Psychology & Health (2024, 2025)

---

### PAGE: Education Q2A — None Version (`/quiz/education-q2a-none`)
*Shows when user selected "None" for treatments*

> If you're here, it might mean that you have subcellular damage that is recreating your pain.
>
> Peer-reviewed research has documented its existence and how these damage patterns can persist indefinitely.**

**Emphasized consequence (light background tint):**
> This means pain caused by subcellular damage can continue throughout your life—unless the damage is repaired.

**Solution (green highlighted card):**
> Clinical teams using this research in real-world practice have been helping people **permanently reduce and even eliminate their chronic pain*** through gentle, non-invasive techniques.

**Research context:**
> This subcellular repair approach is based on specialized research that hasn't reached mainstream medicine yet—which is why your doctor hasn't mentioned it.
>
> It works through something researchers call your **Primary Cell**.

**CTA (centered):**
> To begin, let's see if your condition fits the subcellular repair model.

**Footnotes:**
> *Based on clinical observations and ongoing research
> **Journal of Prenatal & Perinatal Psychology & Health (2024, 2025)

---

### PAGE: Q3 Conditions (`/quiz/q3-conditions`)

**Question:**
> Which condition(s) are you dealing with?

**Helper Text:** (Select all that apply)

**Options:** [See Section 3 for full list of 16 conditions + "Other"]

**"Other" field behavior:**
- Checkbox toggles textarea visibility
- Unchecking clears the text
- Clear button (✕) appears inside textarea when text exists
- Helper text when text entered: "A practitioner will review your condition and contact you by email to let you know if we can help."

---

### PAGE: Disqualified Non-Treatable (`/quiz/disqualified-non-treatable`)

**Headline:**
> Thank You for Your Interest

**Explanation (light card):**
> Based on your answer, subcellular repair techniques for your specific condition(s) don't exist yet.
>
> The clinical teams behind this research are continuously working to expand the applications of subcellular repair to new conditions—but at this time, we don't have proven techniques for:
>
> - [List of user's non-treatable conditions]

**CTA:**
> We'd be happy to notify you if new techniques are developed for your condition in the future.
>
> **Enter your information below:**

**Form Fields:**
- Name *
- Email *
- Phone *
- Consent checkbox (required)

**Buttons:**
- "Yes, Notify Me" (primary)
- "No thanks" (text link)

---

### PAGE: Thank You Non-Treatable (`/quiz/thank-you-non-treatable`)

**Headline:**
> Thank You For Informing Us

**Subheadline:**
> We will notify you if we find a solution to your condition

**Body (subtle card):**
> Our clinical teams are continuously researching new applications for subcellular repair. If a breakthrough occurs for your condition, you'll be the first to know.

**Button:** "Return to Home"

---

### PAGE: Manual Review (`/quiz/manual-review`)

**Headline:**
> Thank You - We'll Review Your Condition

**Body:**
> Based on your answers, a practitioner will need to review your specific condition to determine if cellular repair can help.
>
> **Be sure to submit the Contact Form at the end.**
>
> We'll contact you by email to let you know if we can help with your condition.

[Continue Button]

---

### PAGE: Primary Cell Explanation — Standard (`/quiz/primary-cell-explanation`)
*For qualified users with treatable conditions*

**Opening (green card, dynamic):**
> **Encouraging insight:** Because you have **[user's treatable conditions]**, there's a strong possibility your pain is caused by subcellular damage—which means it can be repaired.

**Primary Cell Introduction (centered heading):**
> This is where your Primary Cell comes in:

**Explanation:**
> Your **Primary Cell** is a unique master cell that controls the pattern and function of every other cell in your body.**
>
> Unlike regular cells, it never dies. It lasts your entire life.
>
> When you get injured, have surgery, live with ongoing wear-and-tear, or your pain develops over time, your Primary Cell can sustain subcellular damage.*

**── Here's how this can cause your pain: ──**

> Your Primary Cell is like a master template your body follows. When an area of it is damaged, your body keeps following that disrupted pattern—and this unhealthy pattern causes pain where you hurt.
>
> This damage can persist in your Primary Cell throughout your life.
>
> When it's repaired, it creates a healthy pattern—relieving your pain.

**The Result (green card):**
> **The result?**
>
> For years, in real-world practice, some people find their pain **permanently eliminated**, while others experience significant reduction that lasts long-term.*
>
> **This is not pain management—this is repairing the subcellular source.**

**Footnotes:**
> *Based on clinical observations and ongoing research
> **Journal of Prenatal & Perinatal Psychology & Health (2024, 2025)

---

### PAGE: Alternative Primary Cell Explanation (`/quiz/alternative-primary-cell-explanation`)
*For users with "Other" conditions (via Manual Review)*

**Opening (green card):**
> Many chronic pain conditions stem from subcellular damage—damage that can be repaired.

**Primary Cell Introduction (centered heading):**
> This is where your Primary Cell comes in:

*[Same Primary Cell explanation text as Standard version]*

*[Same "Here's how this can cause your pain" section]*

*[Same "The result?" green card]*

*[Same footnotes]*

---

### PAGE: Q4 What's Missing (`/quiz/q4-whats-missing`)

**Question:**
> If your chronic pain were eliminated, what would that give you back? What could you do that you can't do now (or can't do well)?

**Helper Text:** (Select all that apply)

**Options:**
- Sleep through the night without waking in pain
- Play with / spend quality time with my children or grandchildren
- Enjoy my hobbies / leisure activities again
- Travel comfortably (drive, fly, sit for long periods)
- Work / be productive without constant discomfort
- Participate in social activities with friends and family
- Exercise / stay physically active like I used to
- Simply have more "good days" than bad days
- Other (free text)

---

### PAGE: Q5 Urgency (`/quiz/q5-urgency`)

**Question:**
> How urgent is your need to resolve your chronic pain issue?

**Options (single-select with checkbox + Continue button):**
- Very urgent - I'm sick and tired of this pain and ready to do something about it now
- Urgent - I'd like to address this within the next few months
- Moderately urgent - I'm exploring options but not in a rush
- Not urgent - Just gathering information for now

---

### PAGE: Q6 Annual Spending (`/quiz/q6-annual-spending`)

**Question:**
> On average, how much do you currently pay out of pocket for your chronic pain every year (co-pays, deductibles, treatments not covered by insurance, etc.)?

**Options (single-select with checkbox + Continue button):**
- $0 - $3,000
- $3,000 - $10,000
- $10,000 - $25,000
- $25,000+

---

### PAGE: Q7 Open Questions (`/quiz/q7-open-questions`)

**Question:**
> What questions do you have about cellular repair?

**Helper Text:** (Leave blank if none)

**Textarea placeholder:** "Type your questions here..."

**Body text:**
> Your questions are incredibly valuable to us. If you'd like a practitioner to personally respond to them by email, be sure to fill out the contact form at the end of the assessment.

---

### PAGE: Congratulations — Standard (`/quiz/congratulations`)
*For qualified users (treatable conditions, no "Other")*

**Headline:**
> Based on your answers, you are a good candidate for subcellular repair

**Qualification confirmation (green card, dynamic):**
> Your **[treatable conditions]** that you've had for more than 6 months make you eligible for subcellular repair.
>
> Your pain is very likely caused by subcellular damage that can be reversed.

**Non-treatable disclaimer (if applicable):**
> However, techniques to address **[non-treatable conditions]** do not currently exist. And the clinical teams are continuously researching new solutions.

**── Want to see how we reduce or eliminate chronic pain? ──**

**Chad's Story:**
> Watch session footage to see how subcellular repair works—eliminating Chad's pain.
>
> Chad spent 5 years throwing up from severe neck and back pain, calling in sick regularly.
>
> **Today, he has his life back—and the pain has never returned.**

**What you'll see (blue card with bullet list):**
> **You'll see in his Zoom sessions:**
> - Highlights from his Pain Relief Consultation—sharing his fight to push through pain just to perform at work each day
> - An unedited demonstration of the subcellular repair process during one of his Zoom sessions–yes, we work over Zoom nationwide
> - The exact moment he realizes his pain is completely gone—neck, mid-back, & lower back
> - His wife describes what life feels like now that his pain is finally gone

**Closing:**
> **Most people know if we're the right solution by the end of the video because they see the whole process.**
>
> We'll email you the link so you can rewatch it anytime.

**Conditional Chad comparison sentence (italic, shown only if user did NOT select neck/back pain):**
> *While Chad's case demonstrates neck and back pain, the subcellular repair process works the same for your **[conditions]**.*

**Form CTA (centered):**
> **Enter your information below to get instant access:**

**Form Fields:**
- Name *
- Email *
- Phone *

**Pre-consent text:**
> Pain relief decisions are easier when your questions get answered quickly. Get text-only answers—no calls—so you can quickly see whether cellular repair is the right fit for you.

**Consent checkbox (required):**
> I agree to receive text messages about my care from Wellness In Weeks ("WIW") at the number I provide. If I choose to move forward, WIW may also text me about scheduling and available consultation openings. Message frequency may vary and message/data rates may apply. Consent is not required to receive care or buy services. Reply STOP to opt out and HELP for help.

**Post-consent text:**
> By proceeding, you confirm you've reviewed our SMS & Privacy Policy.

**Submit Button:** "Watch Chad's Case Study Now"

---

### PAGE: Congratulations — Alternative (`/quiz/congratulations-alternative`)
*For users with "Other" conditions (manual review path)*

**Headline:**
> Based on your answers you may be a candidate for subcellular repair

**Practitioner review notice (blue card):**
> A practitioner will review the condition(s) you submitted and contact you by email to let you know if we can help. **Please submit the contact form below.**

**Treatable qualification (green card, shown only if user also has treatable conditions):**
> Your **[treatable conditions]** that you've had for more than 6 months make you eligible for subcellular repair.
>
> Your pain is very likely caused by subcellular damage that can be reversed.

**Non-treatable disclaimer (if applicable):**
> However, techniques to address **[non-treatable conditions]** do not currently exist. And the clinical teams are continuously researching new solutions.

*[Same Chad's Story section as Standard]*

*[Same "You'll see in his Zoom sessions" blue card]*

*[Same closing statements]*

**Conditional Chad comparison (same rules as standard):**
> *While Chad's case demonstrates neck and back pain, the subcellular repair process works the same for your **[conditions]**.*

**Alternative Chad sentence (shown when user has NO treatable conditions — Other only):**
> *While Chad's case demonstrates neck and back pain, the subcellular repair process works the same for all eligible cases—possibly the one you submitted.*

*[Same form, consent, and button as Standard]*

---

### PAGE: Welcome (`/quiz/welcome`)
*Final page after form submission*

**Headline:**
> **"I Don't Feel Anything Right Now"—Watch Chad's 5-Year Pain Disappear Live**

**Intro:**
> You're about to see the subcellular repair process in action, plus hear from his wife about the transformation in their marriage and family life.
>
> **Here:** Chad's Subcellular Repair Process

**Video Embed:**
- YouTube URL: `https://www.youtube.com/embed/NJnzbLj058w`
- 16:9 aspect ratio container
- [PLACEHOLDER — To be replaced with Wistia]

**CTA Section:**

**Heading:**
> **Ready to Take the Next Step?**

**Body:**
> If you'd like to explore how subcellular repair can reduce or eliminate your specific chronic pain, we invite you to schedule a complimentary 45-minute Pain Relief Consultation.

**Before you schedule (blue card):**
> **Before you schedule:** Watch the full video to see if this approach feels right for you. This ensures our call is productive and focused on your specific needs.

**On this call, we'll:**
> - Discuss your specific pain condition(s) in detail
> - Map out your personalized pain relief plan
> - Answer any questions you have
> - Explain our process, fees, and guarantee (Yep. We stand behind our work!)

**Final CTA:**
> **Ready to reduce or eliminate your pain?**
>
> Schedule your complimentary Pain Relief Consultation below:

**[CALENDAR BOOKING WIDGET — PLACEHOLDER]**

---

## 5. DESIGN SPECIFICATIONS

### Color Palette

| Name | Value | Usage |
|------|-------|-------|
| Primary Navy | `rgba(29, 44, 73, 1)` / `#1d2c49` | Headlines, body text, primary buttons |
| Gold Accent | `rgba(180, 155, 90, 1)` / `rgba(226, 211, 163, 1)` | Subheadlines, borders, accents |
| Soft Green (Positive) | `rgba(243, 254, 250, 1)` | Good news cards, qualification confirmations |
| Soft Blue (Educational) | `rgba(239, 246, 255, 1)` | Educational content cards, info cards |
| Light Gray BG | `rgba(29, 44, 73, 0.03)` | Subtle section backgrounds |
| Text Gray | `rgba(107, 114, 128, 1)` | Helper text, footnotes, disclaimers |
| Error Red | `#EF4444` | Required field indicators |
| Page Background | `linear-gradient(135deg, rgba(226, 211, 163, 0.1) 0%, rgba(255, 255, 255, 1) 100%)` | Main page background |
| Loading BG | `#f7f4ed` | Loading fallback screen |

### Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Main Headline | `clamp(2rem, 5vw, 3rem)` | 700 | Primary Navy |
| Subheadline | `clamp(1.125rem, 3vw, 1.5rem)` | 500 | Gold Accent |
| Question Text | `clamp(1.5rem, 4vw, 2rem)` | 600 | Primary Navy |
| Congrats Headline | `clamp(1.5rem, 4vw, 1.875rem)` | 600 | Primary Navy |
| Body/Education Text | `1.125rem` | 400 | Primary Navy |
| Helper Text | `1rem` | 400 | `rgba(55, 65, 81, 1)` |
| Checkbox Text | `1rem` | 400 | Primary Navy |
| Footnotes | `0.8125rem` | 400 italic | Text Gray |
| Disclaimer/Consent | `0.8125rem` | 400 | Text Gray |
| Footer Links | `0.875rem` | 400 | Text Gray |

### Layout & Spacing

| Element | Value |
|---------|-------|
| Content Container Max Width | `800px` |
| Welcome Page Max Width | `900px` |
| Education Content Max Width | `700px` |
| Container Padding | `48px` (desktop), `32px 24px` (tablet), `24px 16px` (mobile) |
| Card Border Radius | `10px-12px` |
| Card Padding | `18px 20px` to `24px 28px` |
| Content Card Shadow | `0 10px 40px rgba(0, 0, 0, 0.1)` |
| Option Button Border | `2px solid rgba(226, 211, 163, 0.5)` |
| Selected Border | `2px solid rgba(29, 44, 73, 1)` |
| Input Border | `2px solid rgba(229, 231, 235, 1)` |
| Input Focus | `border-color: rgba(29, 44, 73, 1); box-shadow: 0 0 0 3px rgba(29, 44, 73, 0.1)` |
| Section Divider | `60px wide, 2px height, rgba(29, 44, 73, 0.2)` |

### Components

**Back Arrow Button:**
- Position: absolute, top 24px, left 24px
- Style: no border/background, arrow character "←"
- Font size: 1.5rem (desktop), 1.375rem (mobile)
- Touch target: padded 10px-14px on mobile
- Color: `rgba(29, 44, 73, 0.7)` → hover `rgba(29, 44, 73, 1)`

**Primary Button:**
- Full-width on forms, standard on quiz navigation
- Font-weight: 500-600
- Disabled state when required fields empty

**Text Button (Secondary):**
- No background, underline text
- Color: `rgba(29, 44, 73, 0.7)` → hover `rgba(29, 44, 73, 1)`

**Footer:**
- Links: "Terms and Conditions" | "Privacy Policy"
- Separated by `border-top: 1px solid rgba(229, 231, 235, 1)`
- Margin-top: 48px, padding-top: 24px

### Animation

- **Page Transitions:** Framer Motion — `initial: { opacity: 0, y: 20 }`, `animate: { opacity: 1, y: 0 }`, `duration: 0.3-0.5s`
- **Dropdowns:** Height animation — `initial: { opacity: 0, height: 0 }`, `animate: { opacity: 1, height: 'auto' }`
- **Q1 Education:** AnimatePresence with mode="wait" for swap between question and education
- **Option Buttons:** `transition: all 0.2s ease` with `translateY(-2px)` hover

### Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `≤768px` | Reduced padding, smaller fonts, vertical nav buttons |
| `≤480px` | Minimal padding (16px), further font reduction |

---

## 6. ROUTING RULES

### Route Definitions (App.tsx):
| Route | Component | Access |
|-------|-----------|--------|
| `/` | Redirect to `/quiz/q1-duration` | Public |
| `/quiz/q1-duration` | Q1Duration | Entry point |
| `/quiz/disqualified-too-soon` | DisqualifiedTooSoon | From Q1 |
| `/quiz/q2-treatments` | Q2Treatments | From Q1 education |
| `/quiz/connecting-message-q2` | ConnectingMessageQ2 | From Q2 (non-None) |
| `/quiz/education-q2a` | EducationQ2A | From ConnectingMessage |
| `/quiz/education-q2a-none` | EducationQ2ANone | From Q2 (None) |
| `/quiz/q3-conditions` | Q3Conditions | From Education |
| `/quiz/disqualified-non-treatable` | DisqualifiedNonTreatable | From Q3 analysis |
| `/quiz/manual-review` | ManualReview | From Q3 (Other) |
| `/quiz/primary-cell-explanation` | PrimaryCellExplanation | From Q3 (qualified) |
| `/quiz/alternative-primary-cell-explanation` | AlternativePrimaryCellExplanation | From ManualReview |
| `/quiz/q4-whats-missing` | Q4WhatsMissing | From PrimaryCell pages |
| `/quiz/q5-urgency` | Q5Urgency | From Q4 |
| `/quiz/q6-annual-spending` | Q6AnnualSpending | From Q5 |
| `/quiz/q7-open-questions` | Q7OpenQuestions | From Q6 |
| `/quiz/congratulations` | Congratulations | From Q7 (standard) |
| `/quiz/congratulations-alternative` | CongratulationsAlternative | From Q7 (manual review) |
| `/quiz/welcome` | Welcome | From Congratulations form submit |
| `/quiz/thank-you-non-treatable` | ThankYouNonTreatable | From DisqualifiedNonTreatable form |
| `/quiz/terms-and-conditions` | TermsAndConditions | Footer link |
| `/quiz/privacy-policy` | PrivacyPolicy | Footer link |
| `*` | Redirect to `/quiz/q1-duration` | Catch-all |

### Back Navigation Map:
| Page | Back Goes To |
|------|-------------|
| Q1 Duration | None (entry point) |
| Disqualified Too Soon | Q1 Duration |
| Q2 Treatments | Q1 Duration |
| Connecting Message Q2 | Q2 Treatments |
| Education Q2A | Connecting Message Q2 |
| Education Q2A None | Q2 Treatments |
| Q3 Conditions | Education Q2A or Education Q2A None (based on treatments) |
| Disqualified Non-Treatable | Q3 Conditions |
| Manual Review | Q3 Conditions |
| Primary Cell Explanation | Q3 Conditions |
| Alt Primary Cell Explanation | Manual Review |
| Q4 What's Missing | Primary Cell or Alt Primary Cell (based on qualification) |
| Q5 Urgency | Q4 What's Missing |
| Q6 Annual Spending | Q5 Urgency |
| Q7 Open Questions | Q6 Annual Spending |
| Congratulations | Q7 Open Questions |
| Congratulations Alternative | Q7 Open Questions |
| Welcome | Browser history back (navigate(-1)) |
| Thank You Non-Treatable | None (no back button) |

---

## 7. STATE MANAGEMENT

### Storage Mechanism:
- **sessionStorage** with key `quiz_state`
- Persists across page refreshes within same tab
- Cleared on tab close or manual reset
- Full state serialized as JSON

### State Shape (QuizContext):
```typescript
interface QuizState {
  quizId: string;               // Auto-generated: "quiz_{timestamp}_{random}"
  currentStep: number;          // Current step tracker
  
  // Q1
  painDuration: '' | '6_months_or_less' | 'more_than_6_months';
  
  // Q2
  treatmentsTried: string[];         // Array of treatment IDs
  painMedicationsTypes: string[];    // Array of medication type IDs
  
  // Q3
  conditions: string[];              // Array of condition IDs
  conditionOther: string;            // Free text for "Other"
  
  // Q4
  missingActivities: string[];       // Array of activity IDs
  missingOther: string;              // Free text for "Other"
  
  // Q5
  urgencyLevel: string;              // Single urgency ID
  
  // Q6
  annualSpending: string;            // Single spending ID
  
  // Q7
  openQuestions: string;             // Free text
  
  // Contact Info
  name: string;
  email: string;
  phone: string;
  
  // Routing State (set by backend analysis)
  qualificationStatus: 'qualified' | 'disqualified_too_soon' | 'disqualified_non_treatable' | 'manual_review' | '';
  treatableConditions: string[];     // Backend-classified
  nonTreatableConditions: string[];  // Backend-classified
  requiresManualReview: boolean;
  
  // Disqualification Data
  approximatePainStartDate: string;
  wantsNotification: boolean;
}
```

### Context Actions:
| Action | Dispatched By |
|--------|---------------|
| `SET_PAIN_DURATION` | Q1Duration |
| `SET_TREATMENTS_TRIED` | Q2Treatments |
| `SET_PAIN_MEDICATIONS_TYPES` | Q2Treatments |
| `SET_CONDITIONS` | Q3Conditions |
| `SET_CONDITION_OTHER` | Q3Conditions |
| `SET_QUALIFICATION_STATUS` | Q3Conditions (from backend response) |
| `SET_MISSING_ACTIVITIES` | Q4WhatsMissing |
| `SET_MISSING_OTHER` | Q4WhatsMissing |
| `SET_URGENCY_LEVEL` | Q5Urgency |
| `SET_ANNUAL_SPENDING` | Q6AnnualSpending |
| `SET_OPEN_QUESTIONS` | Q7OpenQuestions |
| `SET_CONTACT_INFO` | Congratulations, Disqualified pages |
| `SET_APPROXIMATE_PAIN_START_DATE` | DisqualifiedTooSoon |
| `SET_WANTS_NOTIFICATION` | Disqualified pages |
| `RESET` | Clears all state + sessionStorage |

---

## 8. BACKEND API ENDPOINTS

### POST `/api/quiz/analyze-conditions`
**Purpose:** Analyze selected conditions and determine routing path
**Request:**
```json
{
  "conditions": ["chronic_back_pain", "fibromyalgia"],
  "condition_other": "shoulder numbness" // or null
}
```
**Response:**
```json
{
  "qualification_status": "qualified",
  "treatable_conditions": ["chronic_back_pain"],
  "non_treatable_conditions": ["fibromyalgia"],
  "should_show_primary_cell": true,
  "should_show_alternative_primary_cell": false,
  "requires_manual_review": false,
  "disqualification_reason": null
}
```

### POST `/api/quiz/submit-contact`
**Purpose:** Submit contact form from Congratulations pages
**Request:**
```json
{
  "quiz_id": "quiz_1234567890_abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "consent_to_text": true
}
```
**Response:** `{ "success": true, "message": "Contact information received", "redirect_to": "/welcome" }`

### POST `/api/quiz/submit-quiz`
**Purpose:** Submit complete quiz data (full QuizResponse model)

### POST `/api/quiz/disqualified-waiting-list`
**Purpose:** Add "too soon" disqualified users to waiting list

### POST `/api/quiz/disqualified-notify-me`
**Purpose:** Save notification preference for non-treatable condition users

### POST `/api/quiz/send-welcome-email` (PLACEHOLDER)
### POST `/api/quiz/send-welcome-sms` (PLACEHOLDER)

---

## 9. FORM FIELDS & VALIDATION

### Contact Form (Congratulations Pages):
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | text | Yes | min 1 char, max 100 |
| Email | email | Yes | Valid email format |
| Phone | tel | Yes | min 10 chars |
| Consent to Text | checkbox | Yes | Must be checked |

### Disqualified Too Soon Form:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Approximate Date Pain Began | date | No | Date picker |
| Name | text | Yes | Non-empty |
| Email | email | Yes | Valid email |
| Phone | tel | Yes | Non-empty |
| Consent to Text | checkbox | Yes | Must be checked |

### Disqualified Non-Treatable Form:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | text | Yes | Non-empty |
| Email | email | Yes | Valid email |
| Phone | tel | Yes | Non-empty |
| Consent to Text | checkbox | Yes | Must be checked |

### Button Disabled States:
All submit/continue buttons are disabled until:
- All required fields have content
- Required checkboxes are checked

---

## 10. LEGAL & COMPLIANCE TEXT

### SMS Consent Text (used on all forms):
> I agree to receive text messages about my care from Wellness In Weeks ("WIW") at the number I provide. If I choose to move forward, WIW may also text me about scheduling and available consultation openings. Message frequency may vary and message/data rates may apply. Consent is not required to receive care or buy services. Reply STOP to opt out and HELP for help.

### Pre-Consent Text (Congratulations pages only):
> Pain relief decisions are easier when your questions get answered quickly. Get text-only answers—no calls—so you can quickly see whether cellular repair is the right fit for you.

### Post-Consent Text (all forms):
> By proceeding, you confirm you've reviewed our SMS & Privacy Policy.

### Footer Links (all pages):
- Terms and Conditions → `/quiz/terms-and-conditions`
- Privacy Policy → `/quiz/privacy-policy`

### Research Disclaimers (footnotes on education pages):
> *Based on clinical observations and ongoing research
> **Journal of Prenatal & Perinatal Psychology & Health (2024, 2025)

---

## APPENDIX: TECH STACK

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18+ with TypeScript |
| Build Tool | Vite |
| Routing | React Router v6 |
| State Management | React Context API + useReducer |
| Persistence | sessionStorage |
| Animation | Framer Motion |
| Styling | CSS Modules (`Quiz.module.css`) |
| Backend | FastAPI (Python) |
| Database | MongoDB |
| Deployment | Kubernetes (Emergent Platform) |

---

*END OF BACKUP DOCUMENT*
*This document contains all information needed to fully reconstruct the quiz funnel from scratch.*
