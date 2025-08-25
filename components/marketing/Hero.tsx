'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden hero-gradient min-h-[80vh] flex items-center">
      {/* Court overlay background */}
      <div className="absolute inset-0 hero-court-overlay" aria-hidden="true" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Welcome to{' '}
            <span style={{ color: 'var(--dd-chartreuse)' }}>
              Dink-Dash
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mb-8 max-w-3xl text-lg text-gray-200 sm:text-xl md:text-2xl"
          >
            Zero-drama pickleball: book courts instantly, compete transparently, belong. 
            The premier platform connecting players across India.
          </motion.p>

          {/* CTA Buttons with mobile scrim */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Mobile backdrop scrim */}
            <div className="absolute inset-0 mobile-scrim rounded-2xl md:hidden" aria-hidden="true" />
            
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 p-4 md:p-0">
              <Link
                href="#book-court"
                className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[200px] justify-center"
                aria-label="Book a pickleball court"
              >
                Book a Court
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="#tournaments"
                className="btn-secondary inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 min-w-[200px] justify-center border-2 border-white/20"
                aria-label="Participate in tournaments"
              >
                <Play className="mr-2 h-5 w-5" />
                Participate in Tournament
              </Link>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--dd-chartreuse)' }} />
              <span className="text-sm">50+ Venues</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--dd-chartreuse)' }} />
              <span className="text-sm">Delhi NCR Coverage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--dd-chartreuse)' }} />
              <span className="text-sm">Instant Booking</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}