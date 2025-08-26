// app/page.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Trophy, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 px-4 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            {t('home.title')}
          </h1>
          <p className="mb-8 text-lg md:text-xl opacity-90">
            {t('home.subtitle')}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/venues" aria-label="Find a court">
                {t('home.exploreVenues')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="secondary" size="lg">
              <Link href="/tournaments" aria-label="Find a tournament">
                {t('home.joinTournaments')}
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative soft vignettes for readability (no motion) */}
        <div className="pointer-events-none absolute -top-10 -left-10 h-20 w-20 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      </section>

      {/* Feature cards */}
      <section className="bg-gray-50 px-4 py-12">
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

            <div className="card">
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
    </div>
  );
}