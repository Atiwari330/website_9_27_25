'use client';

import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';

export function Hero() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const handleAssessmentClick = () => {
    setIsAssessmentOpen(true);
    // TODO: Open assessment modal
  };

  const handleDemoClick = () => {
    // TODO: Open demo video modal
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {copy.hero.headline}
          </h1>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {copy.hero.subhead}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button
              onClick={handleAssessmentClick}
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-6"
            >
              {copy.hero.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <button
              onClick={handleDemoClick}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <Play className="h-5 w-5" />
              {copy.hero.ctaSecondary}
            </button>
          </div>

          {/* Microcopy */}
          <p className="text-sm text-gray-500 mb-12">
            {copy.hero.ctaMicro}
          </p>

          {/* Data Flow Animation */}
          <div className="relative h-64 md:h-96 mb-12">
            <DataFlowAnimation />
          </div>

          {/* Trust Strip */}
          <div className="border-t border-gray-200 pt-12">
            <p className="text-sm text-gray-500 mb-6">{copy.hero.trustStrip}</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale">
              {/* Placeholder logos - replace with actual client logos */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-24 h-12 bg-gray-300 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataFlowAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full max-w-4xl"
        aria-label="Data flow diagram showing EHR, Middleware, RCM, and Portal connections"
      >
        {/* Nodes */}
        <g className="nodes">
          {/* EHR Node */}
          <rect
            x="50"
            y="150"
            width="120"
            height="80"
            rx="8"
            className="fill-blue-100 stroke-blue-500 stroke-2"
          />
          <text
            x="110"
            y="195"
            className="fill-blue-900 text-sm font-semibold"
            textAnchor="middle"
          >
            EHR
          </text>

          {/* Middleware Node */}
          <rect
            x="300"
            y="150"
            width="140"
            height="80"
            rx="8"
            className="fill-purple-100 stroke-purple-500 stroke-2"
          />
          <text
            x="370"
            y="195"
            className="fill-purple-900 text-sm font-semibold"
            textAnchor="middle"
          >
            AI Middleware
          </text>

          {/* RCM Node */}
          <rect
            x="570"
            y="80"
            width="120"
            height="80"
            rx="8"
            className="fill-green-100 stroke-green-500 stroke-2"
          />
          <text
            x="630"
            y="125"
            className="fill-green-900 text-sm font-semibold"
            textAnchor="middle"
          >
            RCM
          </text>

          {/* Portal Node */}
          <rect
            x="570"
            y="220"
            width="120"
            height="80"
            rx="8"
            className="fill-orange-100 stroke-orange-500 stroke-2"
          />
          <text
            x="630"
            y="265"
            className="fill-orange-900 text-sm font-semibold"
            textAnchor="middle"
          >
            State Portal
          </text>
        </g>

        {/* Animated Connections */}
        <g className="connections">
          {/* EHR to Middleware */}
          <line
            x1="170"
            y1="190"
            x2="300"
            y2="190"
            className="stroke-gray-400 stroke-2"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="10;0"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>

          {/* Middleware to RCM */}
          <line
            x1="440"
            y1="180"
            x2="570"
            y2="130"
            className="stroke-gray-400 stroke-2"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="10;0"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>

          {/* Middleware to Portal */}
          <line
            x1="440"
            y1="200"
            x2="570"
            y2="250"
            className="stroke-gray-400 stroke-2"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="10;0"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
        </g>

        {/* Animated Data Packets */}
        <g className="data-packets">
          <circle r="4" className="fill-blue-500">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M 170,190 L 370,190 L 630,120"
            />
          </circle>
          <circle r="4" className="fill-purple-500">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
              path="M 170,190 L 370,190 L 630,260"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}