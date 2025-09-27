'use client';

import { copy } from '@/lib/copy';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    ...copy.testimonials.quotes,
    // Add more testimonials as needed
    {
      text: "The automation saved us 40+ hours per month on grant reporting alone. Our clinical staff can focus on what matters.",
      author: "Sarah M.",
      role: "Clinical Director",
    },
    {
      text: "We reduced denials by 15% in the first 60 days. The ROI was immediate and substantial.",
      author: "Michael R.",
      role: "CFO",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {copy.testimonials.heading}
          </h2>

          <div className="relative">
            <div className="bg-gray-50 rounded-lg p-8 md:p-12">
              <blockquote className="text-center">
                <p className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <footer>
                  <p className="font-semibold text-gray-900">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].role}
                  </p>
                </footer>
              </blockquote>
            </div>

            {/* Navigation */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}