import { Hero } from '@/components/landing/Hero';
import { PainOutcome } from '@/components/landing/PainOutcome';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { CaseStudies } from '@/components/landing/CaseStudies';
import { Integrations } from '@/components/landing/Integrations';
import { Security } from '@/components/landing/Security';
import { Pricing } from '@/components/landing/Pricing';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
import { Navigation } from '@/components/landing/Navigation';

export default function LandingPage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <PainOutcome />
        <HowItWorks />
        <CaseStudies />
        <Integrations />
        <Security />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
