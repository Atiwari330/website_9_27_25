'use client';

import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { FileSearch, Lightbulb, Rocket } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function HowItWorks() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const icons = [FileSearch, Lightbulb, Rocket];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-semibold text-center text-gray-900 mb-2"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-gray-600 mb-12"
          >
            Three steps to connected systems
          </motion.p>

          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-12 left-1/2 transform -translate-x-1/2 w-full max-w-3xl">
              <svg className="w-full" height="2">
                <line
                  x1="16%"
                  y1="1"
                  x2="84%"
                  y2="1"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {copy.howItWorks.steps.map((step, index) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center relative group"
                  >
                    <div className="card-elevated p-6 h-full hover:shadow-2xl transition-all">
                      {/* Step Number Pill */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                          {index + 1}
                        </span>
                      </div>

                      <div className="flex justify-center mb-4 mt-2">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button
              onClick={() => setIsAssessmentOpen(true)}
              size="lg"
              className="button-lift px-8 shadow-lg"
            >
              {copy.howItWorks.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}