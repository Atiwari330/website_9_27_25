'use client';

import { copy } from '@/lib/copy';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export function Integrations() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Placeholder integration logos - replace with actual logos
  const integrations = [
    { name: 'Epic', category: 'EHR' },
    { name: 'Cerner', category: 'EHR' },
    { name: 'TherapyNotes', category: 'EHR' },
    { name: 'SimplePractice', category: 'EHR' },
    { name: 'Kareo', category: 'Billing/RCM' },
    { name: 'AdvancedMD', category: 'Billing/RCM' },
    { name: 'Office Ally', category: 'Clearinghouse' },
    { name: 'Availity', category: 'Clearinghouse' },
    { name: 'State Portal', category: 'Portals' },
    { name: 'SAMHSA', category: 'Portals' },
  ];

  const filteredIntegrations = activeFilter === 'all'
    ? integrations
    : integrations.filter(i => i.category === activeFilter);

  return (
    <section id="integrations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            {copy.integrations.headline}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {copy.integrations.subtext}
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Badge
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2"
              onClick={() => setActiveFilter('all')}
            >
              All
            </Badge>
            {copy.integrations.filters.map((filter) => (
              <Badge
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {filteredIntegrations.map((integration, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg hover:shadow-md transition-all group"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-lg mb-2 group-hover:bg-gray-300 transition-colors" />
                <span className="text-sm text-gray-600 text-center">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}