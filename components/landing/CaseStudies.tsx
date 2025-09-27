'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { copy } from '@/lib/copy';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function CaseStudies() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm text-gray-600 mb-2">Different settings, same result</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Proven Results
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {copy.caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="card-elevated cursor-pointer overflow-hidden h-full"
                  onMouseEnter={() => setExpandedCard(index)}
                  onMouseLeave={() => setExpandedCard(null)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs text-gray-500 font-medium">CASE {index + 1}</span>
                    </div>
                    <CardTitle className="text-lg leading-snug">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-sm leading-relaxed">
                      {study.blurb}
                    </CardDescription>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedCard === index ? 'auto' : 0,
                        opacity: expandedCard === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t space-y-2">
                        <p className="text-xs font-medium text-gray-700">Key Improvements:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Workflow automation</li>
                          <li>• Real-time data sync</li>
                          <li>• Custom integrations</li>
                        </ul>
                      </div>
                    </motion.div>

                    <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 mt-4 group">
                      {study.link}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <Button
              onClick={() => setIsAssessmentOpen(true)}
              size="lg"
              className="button-lift shadow-lg"
            >
              {copy.caseStudiesCta}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}