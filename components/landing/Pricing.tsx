'use client';

import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { Calculator } from 'lucide-react';

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Transparent Pricing
          </h2>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              {copy.pricing.text}
            </p>
            <p className="text-gray-600 mb-8">
              {copy.pricing.subtext}
            </p>

            <Button size="lg" className="gap-2">
              <Calculator className="h-5 w-5" />
              {copy.pricing.cta}
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">4-8</p>
              <p className="text-sm text-gray-600">Weeks to launch</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">70%+</p>
              <p className="text-sm text-gray-600">Time saved</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">15%</p>
              <p className="text-sm text-gray-600">Denial reduction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}