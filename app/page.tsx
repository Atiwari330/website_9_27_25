'use client';

import { useState } from 'react';
import { Hero } from '@/components/landing/Hero';
import { PainOutcome } from '@/components/landing/PainOutcome';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CaseStudies } from '@/components/landing/CaseStudies';
import { IntegrationPatterns } from '@/components/landing/IntegrationPatterns';
import { Integrations } from '@/components/landing/Integrations';
import { Security } from '@/components/landing/Security';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { Navigation } from '@/components/landing/Navigation';
import { AssessmentModal } from '@/components/assessment/AssessmentModal';

export default function LandingPage() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  return (
    <>
      <Navigation onAssessmentClick={() => setIsAssessmentOpen(true)} />
      <main>
        <Hero onAssessmentClick={() => setIsAssessmentOpen(true)} />
        <PainOutcome />
        <HowItWorks />
        <CaseStudies />
        <IntegrationPatterns />
        <Integrations />
        <Security />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA onAssessmentClick={() => setIsAssessmentOpen(true)} />
      </main>
      <Footer />

      <AssessmentModal
        open={isAssessmentOpen}
        onOpenChange={setIsAssessmentOpen}
        source="landing"
      />
    </>
  );
}
