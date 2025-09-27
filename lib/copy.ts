export const copy = {
  nav: {
    solutions: "Solutions",
    integrations: "Integrations",
    caseStudies: "Case Studies",
    security: "Security & Compliance",
    pricing: "Pricing",
    resources: "Resources",
    about: "About",
    ctaPrimary: "Get a Free Stack Assessment",
    ctaMobile: "Free Stack Assessment",
  },

  hero: {
    headline: "Your systems don't talk. We make them fluent.",
    subhead: "AI-powered integration consulting that analyzes your entire tech stack and builds custom solutions to connect ANY disconnected systems—without rip-and-replace.",
    ctaPrimary: "Get a Free Stack Assessment",
    ctaMicro: "Under 2 minutes. No PHI required.",
    ctaSecondary: "Watch a 2-minute demo",
    trustStrip: "Trusted by clinics and networks across the U.S.",
  },

  painOutcome: {
    painPoints: [
      "Intake forms that don't flow to your EHR",
      "Clinical notes trapped in one system",
      "Billing delays from manual authorization checks",
      "Scheduling systems disconnected from billing",
      "Multiple logins for different platforms",
      "Reports that require manual data gathering",
      "Duplicate charting for state and grant portals",
      "Staff burnout from swivel-chair work",
    ],
    outcomes: [
      "Seamless data flow between ALL systems",
      "Single entry, multiple destinations",
      "Automated workflows you control",
      "Real-time sync across platforms",
      "70–90% less manual re-entry",
      "Fewer denials; higher first-pass yield",
      "One source of truth for reporting",
      "Happier staff; faster onboarding",
    ],
    cta: "Calculate your ROI",
  },

  howItWorks: {
    steps: [
      {
        title: "Free Tech Stack Analysis",
        description: "We map ALL your systems and identify every disconnect. No PHI, no obligation.",
      },
      {
        title: "Custom Solution Design",
        description: "See exactly how we'll connect your systems using AI, automation, and smart middleware.",
      },
      {
        title: "Deliver & Monitor",
        description: "We ship secure middleware, dashboards, and ongoing support.",
      },
    ],
    cta: "Start your Free Assessment",
  },

  caseStudies: [
    {
      title: "Intake to First Appointment (Multi-location)",
      blurb: "Reduced intake time from 3 days to same-day with automated form flows.",
      link: "View the build",
    },
    {
      title: "Revenue Cycle Optimization (IOP Network)",
      blurb: "Connected scheduling to billing—recovered $50k in missed charges.",
      link: "View the build",
    },
    {
      title: "Grant Reporting Automation (SUD Facility)",
      blurb: "EHR to state portal automation saved 40 hours monthly.",
      link: "View the build",
    },
  ],
  caseStudiesCta: "Get a Free Stack Assessment",

  integrations: {
    headline: "Works with your ecosystem",
    subtext: "We're vendor-agnostic. These are examples, not requirements.",
    filters: ["EHR", "Billing/RCM", "Clearinghouse", "Portals"],
  },

  security: {
    headline: "Built for behavioral health",
    bullets: [
      "No PHI collected on this site",
      "HIPAA and 42 CFR Part 2 aware workflows",
      "Encryption in transit and at rest",
      "Least-privilege access and audit history",
      "BAAs executed when appropriate",
    ],
    link: "See BAA terms",
  },

  pricing: {
    text: "Project-based delivery starting at $15k (typical $25k–$75k).",
    subtext: "Optional support retainer for monitoring and tweaks.",
    cta: "Estimate My Project",
  },

  testimonials: {
    heading: "Results our clients talk about",
    quotes: [
      {
        text: "Within eight weeks we stopped double-entering data and our denial rate dropped. Our team finally has time for patients.",
        author: "Jordan P.",
        role: "Director of Operations",
      },
    ],
  },

  faq: {
    items: [
      {
        question: "Do we have to switch EHRs?",
        answer: "No. We're system-agnostic and integrate with what you use today.",
      },
      {
        question: "How do you handle PHI?",
        answer: "We avoid PHI during sales. Delivery is designed with HIPAA/42 CFR Part 2 in mind, and we execute BAAs when appropriate.",
      },
      {
        question: "Can you automate state or grant reporting?",
        answer: "We extract and prepare required data and respect program rules—removing as much manual entry as allowed.",
      },
      {
        question: "What types of systems can you connect?",
        answer: "Any systems with APIs, file exports, or web interfaces: EHRs, billing, scheduling, CRM, analytics, state portals, grant systems, and more.",
      },
      {
        question: "Do you use AI for the integrations?",
        answer: "Yes, we use AI to analyze your workflows, design optimal connections, and automate complex data transformations between systems.",
      },
      {
        question: "What's the typical timeline?",
        answer: "Most first automations go live in 4–8 weeks.",
      },
    ],
  },

  finalCta: {
    headline: "Ready to stop the swivel-chair?",
    ctaPrimary: "Get a Free Stack Assessment",
    ctaSecondary: "Book a 20-minute call",
  },

  footer: {
    links: ["Security & Compliance", "Privacy", "Terms", "BAA Terms", "Contact"],
    accessibility: "Accessibility: We aim for WCAG 2.2 AA. Need adjustments? Contact us.",
  },

  assessment: {
    intro: {
      title: "Answer a few quick questions (under 2 minutes)",
      subtext: "No PHI. We'll tailor your tech stack analysis instantly.",
      start: "Start",
      alternate: "Book a call instead",
    },

    q1: {
      prompt: "Which systems do you currently use?",
      options: ["EHR System", "Billing/RCM", "Scheduling", "CRM", "Analytics/Reporting", "State Portals", "Grant Systems", "Other"],
      ehrPrompt: "Which EHR?",
      ehrPlaceholder: "Start typing to search…",
      ehrOther: "Other (type name)",
    },

    q2: {
      prompt: "Where do you spend the most time on manual data entry?",
      options: ["Between intake and EHR", "EHR to billing", "Scheduling to billing", "Clinical notes to reports", "Multiple state/grant portals", "Other workflows"],
      tooltip: "We never collect PHI here—just workflow context.",
    },

    q3: {
      prompt: "How many hours per week does your team spend on duplicate data entry?",
      options: ["Less than 10 hours", "10-20 hours", "20-40 hours", "40-80 hours", "More than 80 hours"],
      otherPlaceholder: "Additional context (optional, 120 characters)",
    },

    q4: {
      prompt: "What's your biggest integration pain point?",
      options: ["Systems don't communicate", "Too many manual steps", "Data stuck in silos", "Reporting takes forever", "Missing/delayed revenue", "Other"],
      otherPlaceholder: "Briefly describe (optional, 120 characters)",
    },

    q5: {
      prompt: "Any special compliance or reporting needs?",
      options: ["42 CFR Part 2", "State grant reporting", "MAT/OTP reporting", "County/Local portal", "CCBHC requirements", "None/Not sure"],
      tooltip: "We never collect PHI here—just workflow context.",
    },

    contact: {
      headline: "Where should we send your tailored assessment?",
      fields: {
        name: "Full name",
        email: "Work email",
        org: "Organization",
        role: "Role",
      },
      consent: "It's okay to contact me about this assessment.",
      submit: "Send My Assessment",
      spamNote: "Protected by Turnstile. No PHI collected.",
    },

    schedule: {
      headline: "Lock your review time",
      body: "Reviews typically take 3–4 business days. Pick a time that works—we'll reschedule if needed.",
      schedule: "Schedule review",
      skip: "Skip for now",
    },

    confirm: {
      title: "You're all set",
      body: "We're preparing your tailored assessment. You'll get an email shortly.",
      addContext: "Add more context",
      reschedule: "Book/Reschedule",
    },
  },

  validation: {
    required: "Please choose an option.",
    ehrRequired: "Please select your EHR or choose \"Other.\"",
    complianceRequired: "Please pick at least one option (or choose \"None/Not sure\").",
    emailInvalid: "Please enter a valid email address.",
    nameRequired: "Please enter your full name.",
    orgRequired: "Please enter your organization.",
    roleRequired: "Please enter your role.",
    consentRequired: "Please check the consent box to continue.",
    textTooLong: "Keep it under 120 characters.",
  },

  autosave: {
    saved: "Saved just now",
    saving: "Saving…",
    error: "We'll retry in a moment",
  },

  errors: {
    submitFailed: "We couldn't complete your request. Please try again in a moment.",
    alreadySubmitted: "You've already submitted this assessment. Check your email for next steps.",
  },

  abandon: {
    message: "Your answers are saved. You can finish anytime via the link we send.",
  },

  accessibility: {
    stepAnnouncement: (step: number, total: number, title: string) =>
      `Step ${step} of ${total}: ${title}`,
    savedAnnouncement: "Saved just now",
    errorAnnouncement: "There's a problem with your form. Focus moves to the first error.",
  },

  legal: {
    noPhiNotice: "We do not collect PHI on this site.",
    hipaaNotice: "HIPAA and 42 CFR Part 2 aware workflows. BAAs executed when appropriate.",
    consentNotice: "By requesting an assessment, you consent to be contacted about this request.",
  },

  seo: {
    title: "AI-powered systems integration for behavioral health — connect any systems",
    description: "We analyze your entire tech stack and build custom solutions to connect ANY disconnected systems—EHR, billing, scheduling, reporting, and more. Free tech stack analysis.",
    ogTitle: "Your systems don't talk. We make them fluent.",
    ogDescription: "AI-powered integration consulting that connects any disconnected systems.",
    ogImageAlt: "Diagram showing secure data flow between EHR, middleware, RCM, and state portal.",
  },
} as const;