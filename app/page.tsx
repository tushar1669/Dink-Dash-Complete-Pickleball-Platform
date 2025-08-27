// app/page.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Trophy, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';
import Hero from '@/components/marketing/Hero';
import FixtureTool from '@/components/marketing/FixtureTool';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Feature cards */}
      <section id="book-court" className="bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-slate-900">{t('home.everything') ?? 'Everything you need for pickleball'}</h2>
          <p className="mt-2 text-center text-slate-600">
            Discover venues, join tournaments, and get the best gear
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="card">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-slate-900">{t('home.exploreVenues')}</h3>
              <p className="mb-3 text-slate-600">Find and book courts across NCR</p>
              <Button asChild variant="ghost">
                <Link href="/venues">Explore</Link>
              </Button>
            </div>

            <div id="tournaments" className="card">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                <Trophy className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-slate-900">{t('home.joinTournaments')}</h3>
              <p className="mb-3 text-slate-600">Compete in local tournaments</p>
              <Button asChild variant="ghost">
                <Link href="/tournaments">Explore</Link>
              </Button>
            </div>

            <div className="card">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <ShoppingBag className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-slate-900">{t('home.shopGear')}</h3>
              <p className="mb-3 text-slate-600">Browse premium equipment</p>
              <Button asChild variant="ghost">
                <Link href="/catalog">Explore</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fixture Tool Section */}
      <FixtureTool />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the Dink-Dash community and experience the future of pickleball in India.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/venues"
              className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 focus:scale-105 inline-flex items-center"
            >
              Start Booking
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              href="/tournaments"
              className="btn-secondary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 focus:scale-105"
            >
              Join Tournament
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}