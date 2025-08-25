'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/ui/Navigation';
import { Button } from '@/components/ui/Button';
import Hero from '@/components/marketing/Hero';
import FixtureTool from '@/components/marketing/FixtureTool';
import Footer from '@/components/Footer';
import { useI18n } from '@/lib/i18n';

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      {/* a11y: skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded z-50"
      >
        {t('a11y.skip.content') ?? 'Skip to content'}
      </a>

      <Navigation />

      <main id="main">
        {/* Hero Section */}
        <Hero />

        {/* Anchor for Book a Court CTA */}
        <div id="book-court" className="sr-only">Book a Court Section</div>

        {/* ===== FEATURE TILES ===== */}
        <section className="px-4 py-16 bg-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
              {t('home.everything') ?? 'Everything you need for pickleball'}
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              {t('home.everything.sub') ??
                'Discover venues, join tournaments, and get the best gear'}
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="card p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {t('home.venues') ?? 'Explore Venues'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('home.venues.sub') ?? 'Find and book courts across NCR'}
                </p>
                <Button asChild variant="outline">
                  <Link href="/venues">Explore</Link>
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="card p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {t('home.tournaments') ?? 'Join Tournaments'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('home.tournaments.sub') ?? 'Compete in local tournaments'}
                </p>
                <Button asChild variant="outline">
                  <Link href="/tournaments">Explore</Link>
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="card p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {t('home.catalog') ?? 'Shop Gear'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('home.catalog.sub') ?? 'Browse premium equipment'}
                </p>
                <Button asChild variant="outline">
                  <Link href="/catalog">Explore</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Anchor for Tournaments CTA */}
        <div id="tournaments" className="sr-only">Tournaments Section</div>

        {/* Fixture Tool Section */}
        <FixtureTool />
      </main>

      <Footer />
    </>
  );
}