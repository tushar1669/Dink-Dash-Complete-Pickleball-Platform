'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#book-court', label: 'Book a Court' },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/venues', label: 'Explore Venues' },
    { href: '/catalog', label: 'Shop Gear' },
    { href: '#fixture-tool', label: 'Fixture Tool' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-white border-t mt-16" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl mb-4" style={{ color: 'var(--dd-navy)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--dd-chartreuse)' }}>
                <span className="text-sm font-bold" style={{ color: 'var(--dd-navy)' }}>DD</span>
              </div>
              <span>Dink-Dash</span>
            </Link>
            <p className="text-gray-600 text-sm max-w-xs">
              Zero-drama pickleball: book courts instantly, compete transparently, belong. 
              The premier platform for pickleball in India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div id="contact">
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Email: hello@dink-dash.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Delhi NCR, India</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Dink-Dash. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-700 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-700 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}