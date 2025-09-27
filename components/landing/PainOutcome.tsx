'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { copy } from '@/lib/copy';
import { Calculator, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function PainOutcome() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<'pain' | 'outcome' | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">If this looks familiar...</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            From Manual Chaos to Automated Flow
          </h2>
        </div>

        <div className="card-elevated overflow-hidden max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 divide-x divide-gray-200">
            {/* Pain Points */}
            <motion.div
              className="p-8 bg-gradient-to-br from-red-50/50 to-transparent hover:from-red-50 transition-colors"
              onMouseEnter={() => setHoveredSide('pain')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Your Current Reality
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-3"
              >
                {copy.painOutcome.painPoints.map((pain, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="flex items-start gap-3"
                  >
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm leading-relaxed">{pain}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Outcomes */}
            <motion.div
              className="p-8 bg-gradient-to-br from-green-50/50 to-transparent hover:from-green-50 transition-colors"
              onMouseEnter={() => setHoveredSide('outcome')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Your Future State
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-3"
              >
                {copy.painOutcome.outcomes.map((outcome, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      {outcome}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Animated Divider */}
          <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transform origin-left transition-transform duration-700"
               style={{
                 transform: hoveredSide === 'outcome' ? 'scaleX(1)' : hoveredSide === 'pain' ? 'scaleX(0.2)' : 'scaleX(0.5)'
               }}
          />
        </div>

        {/* ROI Calculator CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button
            onClick={() => setShowCalculator(!showCalculator)}
            variant="outline"
            size="lg"
            className="button-lift gap-2"
          >
            <Calculator className="h-5 w-5" />
            {copy.painOutcome.cta}
          </Button>
        </motion.div>

        {/* ROI Calculator (Placeholder) */}
        {showCalculator && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <ROICalculator />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ROICalculator() {
  const [providers, setProviders] = useState(10);
  const [monthlyClaims, setMonthlyClaims] = useState(500);
  const [hourlyWage, setHourlyWage] = useState(25);
  const [emailSent, setEmailSent] = useState(false);

  const hoursSaved = Math.round(providers * 8 * 0.7); // 70% reduction estimate
  const revenueSaved = Math.round(monthlyClaims * 0.15 * 150); // 15% denial reduction * $150 avg claim
  const totalSavings = hoursSaved * hourlyWage + revenueSaved;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Quick ROI Calculator</h3>
        <Badge variant="secondary" className="text-xs">
          Live calculation
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of providers
          </label>
          <div className="relative">
            <input
              type="range"
              value={providers}
              onChange={(e) => setProviders(Number(e.target.value))}
              className="w-full mb-2"
              min="1"
              max="100"
            />
            <div className="flex justify-between items-center">
              <input
                type="number"
                value={providers}
                onChange={(e) => setProviders(Number(e.target.value))}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md"
                min="1"
                max="500"
              />
              <span className="text-xs text-gray-500">providers</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly claims volume
          </label>
          <div className="relative">
            <input
              type="range"
              value={monthlyClaims}
              onChange={(e) => setMonthlyClaims(Number(e.target.value))}
              className="w-full mb-2"
              min="100"
              max="5000"
              step="100"
            />
            <div className="flex justify-between items-center">
              <input
                type="number"
                value={monthlyClaims}
                onChange={(e) => setMonthlyClaims(Number(e.target.value))}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md"
                min="1"
                max="10000"
              />
              <span className="text-xs text-gray-500">claims</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average hourly wage
          </label>
          <div className="relative">
            <input
              type="range"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              className="w-full mb-2"
              min="15"
              max="50"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-1">$</span>
                <input
                  type="number"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md"
                  min="15"
                  max="100"
                />
              </div>
              <span className="text-xs text-gray-500">/hour</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 space-y-3"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 0.5 }}
        key={totalSavings}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Hours saved monthly</p>
            <p className="text-2xl font-bold text-gray-900">~{hoursSaved.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Labor cost savings</p>
            <p className="text-2xl font-bold text-gray-900">${(hoursSaved * hourlyWage).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Revenue recovered</p>
            <p className="text-2xl font-bold text-gray-900">${revenueSaved.toLocaleString()}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total monthly savings</p>
          <p className="text-4xl font-bold text-gradient">
            ${totalSavings.toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">
            That&apos;s ${(totalSavings * 12).toLocaleString()} annually!
          </p>
        </div>
      </motion.div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => setEmailSent(true)}
          className="button-lift flex-1"
          disabled={emailSent}
        >
          {emailSent ? 'ROI Sent!' : 'Email Me This ROI'}
        </Button>
        <Button
          variant="outline"
          className="button-lift flex-1"
        >
          Get Detailed Assessment
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        * Estimates based on industry averages. Actual results vary by organization.
      </p>
    </motion.div>
  );
}