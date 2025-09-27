import { copy } from '@/lib/copy';
import { Shield, Lock, Key, FileCheck, UserCheck } from 'lucide-react';
import Link from 'next/link';

export function Security() {
  const icons = [Shield, Lock, Key, FileCheck, UserCheck];

  return (
    <section id="security" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {copy.security.headline}
          </h2>

          <div className="space-y-4 mb-8">
            {copy.security.bullets.map((bullet, index) => {
              const Icon = icons[index] || Shield;
              return (
                <div key={index} className="flex items-start gap-4">
                  <Icon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{bullet}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/legal/baa-terms"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {copy.security.link}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}