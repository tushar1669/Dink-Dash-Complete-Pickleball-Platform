'use client';

import React, { useState } from 'react';
import { Calendar, Users, Trophy, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export default function FixtureTool() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const features = [
    {
      icon: Calendar,
      title: 'Tournament Scheduling',
      description: 'Automated bracket generation and match scheduling'
    },
    {
      icon: Users,
      title: 'Player Management',
      description: 'Easy registration and player tracking system'
    },
    {
      icon: Trophy,
      title: 'Multiple Formats',
      description: 'Support for various tournament formats and rules'
    }
  ];

  return (
    <section id="fixture-tool" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Fixture Tool
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Coming Soon
            </span>
          </div>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Professional tournament management made simple. Create, manage, and track 
            tournaments with our comprehensive fixture tool.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4" style={{ backgroundColor: 'var(--dd-chartreuse)' }}>
                <feature.icon className="h-6 w-6" style={{ color: 'var(--dd-navy)' }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Notify Me Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-6">
              <Bell className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--dd-navy)' }} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Notified
              </h3>
              <p className="text-gray-600 text-sm">
                Be the first to know when our Fixture Tool launches. 
                We'll send you early access and exclusive features.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fixture-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="fixture-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-describedby="fixture-email-help"
                  />
                  <p id="fixture-email-help" className="mt-1 text-xs text-gray-500">
                    We'll only use this to notify you about the Fixture Tool launch.
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary px-6 py-3 text-base font-semibold rounded-lg transition-all duration-200"
                  disabled={!email}
                >
                  Notify Me When Available
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  You're on the list!
                </h4>
                <p className="text-gray-600 text-sm">
                  We'll notify you as soon as the Fixture Tool is ready.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Expected launch: Q2 2024 • Free for all Dink-Dash users
          </p>
        </div>
      </div>
    </section>
  );
}