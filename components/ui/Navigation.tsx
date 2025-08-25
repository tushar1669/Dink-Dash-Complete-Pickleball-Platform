'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, Trophy, ShoppingBag, User, Users, Building } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useA11y } from '@/lib/a11y';
import { Button } from './Button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, labelKey: 'nav.home' },
  { href: '/venues', icon: MapPin, labelKey: 'nav.venues' },
  { href: '/tournaments', icon: Trophy, labelKey: 'nav.tournaments' },
  { href: '/catalog', icon: ShoppingBag, labelKey: 'nav.catalog' },
  { href: '/profile', icon: User, labelKey: 'nav.profile' },
];

const moreItems = [
  { href: '/community', icon: Users, labelKey: 'nav.community' },
  { href: '/organizer/dashboard', icon: Building, labelKey: 'nav.organizer' },
];

export function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useI18n();
  const { seniorMode, setSeniorMode } = useA11y();

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-accent-500 text-navy px-4 py-2 rounded-md"
      >
        {t('nav.skipToContent')}
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-accent-500 rounded-full"></div>
            </div>
            <span className="font-bold text-lg text-navy">PickleBay</span>
          </Link>

          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </Button>

            {/* Senior Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSeniorMode(!seniorMode)}
              aria-label="Toggle senior mode"
            >
              A{seniorMode && '+'}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 md:hidden">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center space-y-1 text-xs',
                  isActive ? 'text-accent-600' : 'text-gray-600'
                )}
                aria-label={t(item.labelKey)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar - Hidden for now, can be expanded */}
      <aside className="hidden md:block fixed left-0 top-14 z-30 w-64 h-[calc(100vh-3.5rem)] border-r border-gray-200 bg-white">
        <nav className="p-4 space-y-2">
          {[...navItems, ...moreItems].map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-accent-100 text-accent-700'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}