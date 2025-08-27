'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden hero-gradient min-h-screen flex items-center"
      role="banner"
    >
      {/* Court overlay pattern */}
      <div className="absolute inset-0 hero-court-overlay opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300">
              Dink-Dash
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Zero-drama pickleball: book instantly, compete transparently, belong.
          </p>

          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            The premier platform for Delhi NCR's growing pickleball community. 
            Find courts, join tournaments, and connect with players.
          </p>

          {/* CTAs with mobile scrim */}
          <div className="relative">
            {/* Mobile backdrop for contrast */}
            <div className="absolute inset-0 mobile-scrim rounded-2xl md:hidden"></div>
            
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#book-court"
                className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 focus:scale-105 inline-flex items-center"
                aria-label="Book a Court - Find and reserve pickleball courts"
              >
                Book a Court
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                href="#tournaments"
                className="btn-secondary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 focus:scale-105"
                aria-label="Participate in Tournament - Join competitive events"
              >
                Participate in Tournament
              </Link>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-300">Courts Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-sm text-gray-300">Players Connected</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-300">Booking Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}