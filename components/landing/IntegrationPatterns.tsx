'use client';

import { ArrowRight } from 'lucide-react';

export function IntegrationPatterns() {
  const patterns = [
    {
      title: 'Intake to Treatment',
      flow: ['Online Forms', 'EHR', 'Billing', 'Reporting'],
      description: 'Streamline patient onboarding from first contact to treatment',
      color: 'blue',
    },
    {
      title: 'Scheduling to Revenue',
      flow: ['Scheduling', 'Attendance', 'Claims', 'Payment'],
      description: 'Automatically sync appointments through to reimbursement',
      color: 'green',
    },
    {
      title: 'Clinical to Compliance',
      flow: ['Clinical Notes', 'Treatment Plans', 'Reports', 'Portals'],
      description: 'Connect documentation to regulatory requirements',
      color: 'purple',
    },
    {
      title: 'Assessment to Outcomes',
      flow: ['Assessments', 'Care Plans', 'Progress', 'Analytics'],
      description: 'Track patient journey from intake through outcomes',
      color: 'orange',
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-900 border-blue-200',
      green: 'bg-green-100 text-green-900 border-green-200',
      purple: 'bg-purple-100 text-purple-900 border-purple-200',
      orange: 'bg-orange-100 text-orange-900 border-orange-200',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Integration Patterns That Work
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've connected hundreds of systems. Here are the most common workflows we automate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {patterns.map((pattern, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {pattern.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{pattern.description}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  {pattern.flow.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2">
                      <div
                        className={`px-3 py-1.5 rounded-md text-sm font-medium border ${getColorClasses(
                          pattern.color
                        )}`}
                      >
                        {step}
                      </div>
                      {stepIndex < pattern.flow.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Don't see your workflow? We build custom integrations for any systems.
            </p>
            <button
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
              onClick={() => {
                // TODO: Open assessment modal
              }}
            >
              Tell us about your systems
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}