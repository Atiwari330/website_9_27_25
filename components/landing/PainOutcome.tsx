'use client';

import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { Calculator, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export function PainOutcome() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Pain Points */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your Current Reality
            </h2>
            <div className="space-y-4">
              {copy.painOutcome.painPoints.map((pain, index) => (
                <div key={index} className="flex items-start gap-3">
                  <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{pain}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your Future State
            </h2>
            <div className="space-y-4">
              {copy.painOutcome.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 font-medium">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROI Calculator CTA */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => setShowCalculator(!showCalculator)}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Calculator className="h-5 w-5" />
            {copy.painOutcome.cta}
          </Button>
        </div>

        {/* ROI Calculator (Placeholder) */}
        {showCalculator && (
          <div className="mt-8 max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg">
            <ROICalculator />
          </div>
        )}
      </div>
    </section>
  );
}

function ROICalculator() {
  const [providers, setProviders] = useState(10);
  const [monthlyClaims, setMonthlyClaims] = useState(500);
  const [hourlyWage, setHourlyWage] = useState(25);

  const hoursSaved = Math.round(providers * 8 * 0.7); // 70% reduction estimate
  const revenueSaved = Math.round(monthlyClaims * 0.15 * 150); // 15% denial reduction * $150 avg claim

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Quick ROI Calculator</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of providers
          </label>
          <input
            type="number"
            value={providers}
            onChange={(e) => setProviders(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min="1"
            max="500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly claims volume
          </label>
          <input
            type="number"
            value={monthlyClaims}
            onChange={(e) => setMonthlyClaims(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min="1"
            max="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Average hourly wage (admin staff)
          </label>
          <input
            type="number"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min="15"
            max="100"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 space-y-2">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Hours saved monthly:</span> ~{hoursSaved} hours
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Labor cost savings:</span> ${(hoursSaved * hourlyWage).toLocaleString()}/month
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Revenue recovered:</span> ${revenueSaved.toLocaleString()}/month
        </p>
        <p className="text-lg font-bold text-green-600 pt-2">
          Total monthly savings: ${(hoursSaved * hourlyWage + revenueSaved).toLocaleString()}
        </p>
      </div>

      <p className="text-xs text-gray-500 pt-2">
        * Estimates based on industry averages. Actual results vary by organization.
      </p>
    </div>
  );
}