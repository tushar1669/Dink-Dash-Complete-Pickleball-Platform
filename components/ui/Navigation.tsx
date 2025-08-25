'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, MapPin, Trophy, ShoppingBag, User, Users, Building, Languages, Eye } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useA11y } from '@/lib/a11y';
import { seedOnce } from '@/lib/storage';

export function Navigation() {
  const { t, language, setLanguage } = useI18n();
  const { seniorMode, setSeniorMode } = useA11y();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    seedOnce();
  }, []);

  const navItems = [
    { href: '#book-court', label: 'Book a Court', icon: MapPin },
    { href: '/tournaments', label: 'Tournaments', icon: Trophy },
    { href: '/venues', label: 'Explore Venues', icon: Building },
    { href: '/catalog', label: 'Shop Gear', icon: ShoppingBag },
    { href: '#fixture-tool', label: 'Fixture Tool', icon: Users, badge: 'Coming Soon' },
    { href: '#contact', label: 'Contact', icon: User },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white shadow-sm border-b sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl" style={{ color: 'var(--dd-navy)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--dd-chartreuse)' }}>
                <span className="text-sm font-bold" style={{ color: 'var(--dd-navy)' }}>DD</span>
              </div>
              <span>Dink-Dash</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
                >
                  {item.label}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-800'}`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-2 py-1 text-xs rounded ${language === 'hi' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-800'}`}
                  aria-label="Switch to Hindi"
                >
                  हि
                </button>
              </div>

              {/* Senior Mode Toggle */}
              <button
                onClick={() => setSeniorMode(!seniorMode)}
                className={`p-2 rounded-md ${seniorMode ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-800'}`}
                aria-label={seniorMode ? 'Disable senior mode' : 'Enable senior mode'}
                title="Toggle senior mode for larger text"
              >
                <Eye className="h-4 w-4" />
              </button>

              {/* Profile Link */}
              <Link
                href="/profile"
                className="text-gray-700 hover:text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Go to profile"
              >
                <User className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg" style={{ color: 'var(--dd-navy)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--dd-chartreuse)' }}>
              <span className="text-xs font-bold" style={{ color: 'var(--dd-navy)' }}>DD</span>
            </div>
            <span>Dink-Dash</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t bg-white">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-yellow-400 text-yellow-900 text-xs px-1.5 py-0.5 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="border-t px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Languages className="h-4 w-4 text-gray-500" />
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-2 py-1 text-xs rounded ${language === 'hi' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
                >
                  हि
                </button>
              </div>

              <button
                onClick={() => setSeniorMode(!seniorMode)}
                className={`p-2 rounded-md ${seniorMode ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
                aria-label="Toggle senior mode"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40" role="navigation" aria-label="Bottom navigation">
        <div className="grid grid-cols-5 h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            href="/venues"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Venues"
          >
            <MapPin className="h-5 w-5" />
            <span className="text-xs">Venues</span>
          </Link>

          <Link
            href="/tournaments"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Tournaments"
          >
            <Trophy className="h-5 w-5" />
            <span className="text-xs">Events</span>
          </Link>

          <Link
            href="/catalog"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Catalog"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs">Shop</span>
          </Link>

          <Link
            href="/profile"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
}