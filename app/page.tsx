'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      {/* a11y: skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded"
      >
        {t('a11y.skip.content') ?? 'Skip to content'}
      </a>

      <main id="main">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden px-4 py-16 md:py-24">
          {/* background gradients */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20"
            style={{
              background:
                'radial-gradient(1200px 600px at 80% -10%, rgba(200,255,90,0.25), transparent 60%), radial-gradient(1000px 500px at -10% 110%, rgba(11,27,43,0.9), #0B1B2B)',
            }}
          />
          {/* readability overlay */}
          <div className="absolute inset-0 -z-10 bg-black/45" aria-hidden="true" />

          <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl"
            >
              {t('home.title') ?? 'PickleBay'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mx-auto mb-8 max-w-2xl text-lg md:text-xl/relaxed text-white/85"
            >
              {t('home.subtitle') ??
                'Zero-drama pickleball: book instantly, compete transparently, belong.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center gap-3"
            >
              <Button asChild variant="primary" size="lg" className="shadow">
                <Link href="/venues" aria-label="Find a court">
                  {t('cta.find.court') ?? 'Find a court'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-white/15 hover:bg-white/25 text-white border border-white/30"
              >
                <Link href="/tournaments" aria-label="Find a tournament">
                  {t('cta.find.tournament') ?? 'Find a tournament'}
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ===== FEATURE TILES ===== */}
        <section className="px-4 py-10">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
              {t('home.everything') ?? 'Everything you need for pickleball'}
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              {t('home.everything.sub') ??
                'Discover venues, join tournaments, and get the best gear'}
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {t('home.venues') ?? 'Explore Venues'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('home.venues.sub') ?? 'Find and book courts across NCR'}
                </p>
                <Button asChild variant="outline">
                  <Link href="/venues">Explore</Link>
                </Button>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {t('home.tournaments') ?? 'Join Tournaments'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('home.tournaments.sub') ?? 'Compete in local tournaments'}
                </p>
                <Button asChild variant="outline">
                  <Link href="/tournaments">Explore</Link>
                </Button>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {t('home.catalog') ?? 'Shop Gear'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('home.catalog.sub') ?? 'Browse premium equipment'}
                </p>
                <Button asChild variant="outline">
                  <Link href="/catalog">Explore</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
