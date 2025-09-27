'use client';

import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { Phone } from 'lucide-react';
import { useState } from 'react';

export function FinalCTA() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {copy.finalCta.headline}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setIsAssessmentOpen(true)}
              size="lg"
              variant="secondary"
              className="text-base px-8 py-6"
            >
              {copy.finalCta.ctaPrimary}
            </Button>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-white hover:text-gray-100 font-medium transition-colors"
            >
              <Phone className="h-5 w-5" />
              {copy.finalCta.ctaSecondary}
            </a>
          </div>

          <p className="text-white/80 text-sm mt-6">
            {copy.legal.noPhiNotice}
          </p>
        </div>
      </div>
    </section>
  );
}