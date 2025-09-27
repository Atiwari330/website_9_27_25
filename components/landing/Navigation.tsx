'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const navItems = [
    { label: copy.nav.solutions, href: '#solutions' },
    { label: copy.nav.integrations, href: '#integrations' },
    { label: copy.nav.caseStudies, href: '#case-studies' },
    { label: copy.nav.security, href: '#security' },
    { label: copy.nav.pricing, href: '#pricing' },
    { label: copy.nav.resources, href: '#resources' },
    { label: copy.nav.about, href: '#about' },
  ];

  const handleAssessmentClick = () => {
    setIsAssessmentOpen(true);
    // TODO: Open assessment modal
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                BehavioralHealth.ai
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                onClick={handleAssessmentClick}
                className="ml-4"
              >
                {copy.nav.ctaPrimary}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="px-4 pb-3">
              <Button
                onClick={handleAssessmentClick}
                className="w-full"
              >
                {copy.nav.ctaPrimary}
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur border-t border-gray-200 p-4 shadow-lg">
        <Button
          onClick={handleAssessmentClick}
          className="w-full button-lift shadow-lg"
          size="lg"
        >
          {copy.nav.ctaMobile}
        </Button>
      </div>
    </>
  );
}