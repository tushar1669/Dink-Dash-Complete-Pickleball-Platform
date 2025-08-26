// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/lib/i18n';
import { A11yProvider } from '@/lib/a11y';
import { Navigation } from '@/components/ui/Navigation';

export const metadata: Metadata = {
  title: 'PickleBay',
  description: 'Zero-drama pickleball: book instantly, compete transparently, belong.',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', type: 'image/png' },
      { url: '/icons/icon-512.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gray-50 text-gray-900 antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 bg-white px-3 py-2 rounded shadow">
          Skip to content
        </a>

        <LanguageProvider>
          <A11yProvider>
            <Navigation />
            <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
              {children}
            </main>
          </A11yProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}