'use client';

import { LanguageProvider } from '@/lib/i18n';
import { A11yProvider } from '@/lib/a11y';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <A11yProvider>
        {children}
      </A11yProvider>
    </LanguageProvider>
  );
}