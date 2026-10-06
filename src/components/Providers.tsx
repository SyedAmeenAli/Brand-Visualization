'use client';

import type { ReactNode } from 'react';
import { LangProvider, useLang } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/theme';
import { COPY } from '@/content/copy';
import { Footer } from './sections/Final';
import { FloatingGlassNav } from './navigation/FloatingGlassNav';
import { PointerHalo } from './motion/PointerHalo';

function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="fixed start-4 top-3 z-[100] -translate-y-20 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0"
    >
      {t(COPY.site.skip)}
    </a>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <ThemeProvider>
        <SkipLink />
        <main id="main">{children}</main>
        <Footer />
        <FloatingGlassNav />
        <PointerHalo />
      </ThemeProvider>
    </LangProvider>
  );
}
