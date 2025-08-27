'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, MapPin, Trophy, ShoppingBag, User, Users, BarChart3, Languages, Eye, Wrench } from 'lucide-react';
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
    { href: '/venues', label: t('nav.venues'), icon: MapPin },
    { href: '/tournaments', label: t('nav.tournaments'), icon: Trophy },
    { href: '/catalog', label: t('nav.catalog'), icon: ShoppingBag },
    { href: '/profile', label: t('nav.profile'), icon: User },
    { href: '/community', label: t('nav.community'), icon: Users },
    { href: '/organizer/dashboard', label: t('nav.organizer'), icon: BarChart3 },
  ];

  const headerLinks = [
    { href: '#book-court', label: 'Book a Court' },
    { href: '#tournaments', label: 'Tournaments' },
    { href: '/venues', label: 'Explore Venues' },
    { href: '/catalog', label: 'Shop Gear' },
    { href: '#fixture-tool', label: 'Fixture Tool', badge: 'Coming Soon' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-gray-900">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">DD</span>
              </div>
              <span>Dink-Dash</span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-8">
              {headerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors relative"
                >
                  {link.label}
                  {link.badge && (
                    <span className="absolute -top-2 -right-12 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
              >
                <Languages className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setSeniorMode(!seniorMode)}
                className={`p-2 transition-colors ${seniorMode ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                aria-label={`${seniorMode ? 'Disable' : 'Enable'} senior mode`}
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center h-16 px-4">
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg text-gray-900">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">DD</span>
            </div>
            <span>Dink-Dash</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="px-4 py-4 space-y-3">
              {headerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    {link.label}
                    {link.badge && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="flex items-center space-x-2 text-gray-600"
                >
                  <Languages className="h-4 w-4" />
                  <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
                </button>
                
                <button
                  onClick={() => setSeniorMode(!seniorMode)}
                  className={`flex items-center space-x-2 ${seniorMode ? 'text-blue-600' : 'text-gray-600'}`}
                >
                  <Eye className="h-4 w-4" />
                  <span>Senior Mode</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <nav className="p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>{t('nav.home')}</span>
          </Link>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-5 h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">{t('nav.home')}</span>
          </Link>

          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}