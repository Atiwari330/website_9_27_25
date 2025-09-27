'use client';

import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { FileSearch, Lightbulb, Rocket } from 'lucide-react';
import { useState } from 'react';

export function HowItWorks() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const icons = [FileSearch, Lightbulb, Rocket];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>

          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            {copy.howItWorks.steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-gray-500">Step {index + 1}</span>
                    <span className="text-lg font-bold text-gray-900">{step.title}</span>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button
              onClick={() => setIsAssessmentOpen(true)}
              size="lg"
              className="px-8"
            >
              {copy.howItWorks.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}