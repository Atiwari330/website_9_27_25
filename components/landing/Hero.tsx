'use client';

import { Button } from '@/components/ui/button';
import { copy } from '@/lib/copy';
import { ArrowRight, Play } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <section className="relative hero-gradient overflow-hidden py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-gray-900 mb-6">
              {copy.hero.headline}
            </h1>

            {/* Subhead with metrics */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-xl mb-2">
              {copy.hero.subhead}
            </p>
            <p className="text-sm text-primary font-medium mb-8">
              Providers save <span className="font-bold">40-80 hours/month</span> and cut denials by <span className="font-bold">10-15%</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-4">
              <Button
                onClick={handleAssessmentClick}
                size="lg"
                className="button-lift w-full sm:w-auto text-base px-8 py-6 shadow-lg"
              >
                {copy.hero.ctaPrimary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleDemoClick}
                variant="ghost"
                size="lg"
                className="group w-full sm:w-auto text-base"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {copy.hero.ctaSecondary}
              </Button>
            </div>

            {/* Microcopy */}
            <p className="text-sm text-gray-500">
              {copy.hero.ctaMicro}
            </p>
          </motion.div>

          {/* Right Column - Data Flow Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] lg:h-[500px]"
          >
            <DataFlowAnimation />
          </motion.div>
        </div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-200 pt-12 mt-16"
        >
          <p className="text-sm text-gray-500 text-center mb-6">{copy.hero.trustStrip}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale">
            {/* Placeholder logos - replace with actual client logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-24 h-12 bg-gray-300 rounded animate-pulse"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DataFlowAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        aria-label="Data flow diagram showing systems connected through AI Integration Hub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <g className="nodes">
          {/* Source System Node */}
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
            y="190"
            className="fill-blue-900 text-sm font-semibold"
            textAnchor="middle"
          >
            Your
          </text>
          <text
            x="110"
            y="205"
            className="fill-blue-900 text-sm font-semibold"
            textAnchor="middle"
          >
            Systems
          </text>

          {/* Integration Hub Node */}
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
            y="190"
            className="fill-purple-900 text-sm font-semibold"
            textAnchor="middle"
          >
            AI Integration
          </text>
          <text
            x="370"
            y="205"
            className="fill-purple-900 text-sm font-semibold"
            textAnchor="middle"
          >
            Hub
          </text>

          {/* System A Node */}
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
            y="120"
            className="fill-green-900 text-sm font-semibold"
            textAnchor="middle"
          >
            Billing &amp;
          </text>
          <text
            x="630"
            y="135"
            className="fill-green-900 text-sm font-semibold"
            textAnchor="middle"
          >
            Revenue
          </text>

          {/* System B Node */}
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
            y="260"
            className="fill-orange-900 text-sm font-semibold"
            textAnchor="middle"
          >
            Reporting &amp;
          </text>
          <text
            x="630"
            y="275"
            className="fill-orange-900 text-sm font-semibold"
            textAnchor="middle"
          >
            Analytics
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
      </motion.svg>
    </div>
  );
}