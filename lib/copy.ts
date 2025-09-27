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
    headline: "Stop the double entry. Connect your EHR, RCM, and reporting—without rip-and-replace.",
    subhead: "We design AI-powered workflows and build secure middleware for behavioral-health providers, cutting admin hours and reclaiming missed revenue.",
    ctaPrimary: "Get a Free Stack Assessment",
    ctaMicro: "Under 2 minutes. No PHI required.",
    ctaSecondary: "Watch a 2-minute demo",
    trustStrip: "Trusted by clinics and networks across the U.S.",
  },

  painOutcome: {
    painPoints: [
      "Duplicate charting for state and grant portals",
      "Denials and AR cleanups across disconnected systems",
      "Manual reports, manual reconciliations",
      "Staff burnout from swivel-chair work",
    ],
    outcomes: [
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
        title: "Free Stack Assessment",
        description: "Map your tools and workflows. No PHI, no obligation.",
      },
      {
        title: "Design & Pilot",
        description: "See your automation plan and a working prototype.",
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
      title: "Outpatient Clinic (70 providers)",
      blurb: "Cut manual reporting by 80% and reduced denials 15% in 60 days.",
      link: "View the build",
    },
    {
      title: "Residential SUD (multi-site)",
      blurb: "Automated grant reporting; 40+ admin hours saved monthly.",
      link: "View the build",
    },
    {
      title: "IOP/PHP Network",
      blurb: "Unified EHR↔RCM sync; AR days down 9%.",
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
      title: "Answer 3 quick questions (under a minute)",
      subtext: "No PHI. We'll tailor your assessment instantly.",
      start: "Start",
      alternate: "Book a call instead",
    },

    q1: {
      prompt: "How do you enter clinical notes today?",
      options: ["Paper", "Electronically in an EHR", "Both", "Not sure"],
      ehrPrompt: "Which EHR?",
      ehrPlaceholder: "Start typing to search…",
      ehrOther: "Other (type name)",
    },

    q2: {
      prompt: "Any special compliance or reporting needs?",
      options: ["42 CFR Part 2", "State grant reporting", "MAT/OTP reporting", "County/Local portal", "None/Not sure"],
      tooltip: "We never collect PHI here—just workflow context.",
    },

    q3: {
      prompt: "What's the biggest pain you want to fix first?",
      options: ["Double entry", "Denials/AR", "State reporting", "Scheduling/attendance", "Other"],
      otherPlaceholder: "Briefly describe (optional, 120 characters)",
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
    title: "AI-powered integrations for behavioral health — stop double entry",
    description: "We design AI-powered workflows and secure middleware that connect your EHR, RCM, and reporting—without rip-and-replace. Free stack assessment.",
    ogTitle: "Connect your EHR, RCM, and reporting",
    ogDescription: "Cut admin hours and reclaim missed revenue.",
    ogImageAlt: "Diagram showing secure data flow between EHR, middleware, RCM, and state portal.",
  },
} as const;