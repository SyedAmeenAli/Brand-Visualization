'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { COPY } from '@/content/copy';
import { NAV } from '@/content/data';
import { useLang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { BrandLogo } from '../brand/BrandLogo';
import { SectionShell } from './SectionShell';

export function Final() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -15% 0px' },
    transition: { duration: reduce ? 0.2 : 1, delay: reduce ? 0 : delay, ease: [0.2, 0, 0, 1] as const },
  });
  return (
    <SectionShell id="final" band="dark" label={t({ en: 'Final expression', ar: 'التعبير الختامي' })}>
      <div className="container-x grid min-h-[100svh] place-items-center py-32 text-center">
        <div className="flex flex-col items-center">
          <motion.div {...fade(0)} className="w-[min(64vw,300px)] md:w-[min(30vw,360px)]">
            <BrandLogo className="h-auto w-full" label="AQARATI عقاراتي — Your Property Journey" />
          </motion.div>
          <motion.h2 {...fade(0.2)} className="t-display-lg mt-16 text-balance">
            <span className="block">{t(COPY.final.line1)}</span>
            <span className="block text-ink-2">{t(COPY.final.line2)}</span>
          </motion.h2>
          <motion.p {...fade(0.4)} className="t-eyebrow mt-10 text-ink-3">{t(COPY.final.closing)}</motion.p>
        </div>
      </div>
    </SectionShell>
  );
}

export function Footer() {
  const { t, lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  return (
    <footer data-band="dark" data-section className="bg-bg pb-32 pt-12 text-ink">
      <div className="container-x">
        <div className="hairline" />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandLogo className="h-auto w-[92px]" label="AQARATI عقاراتي" />
            <p className="t-eyebrow mt-5 text-ink-3">{t(COPY.site.tagline)}</p>
            <p className="t-caption mt-6 max-w-[44ch] text-ink-3">{t(COPY.footer.note)}</p>
          </div>
          <nav aria-label={t({ en: 'Footer', ar: 'التذييل' })} className="md:col-span-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[14px]">
              {NAV.filter((n) => n.key !== 'home').map((n) => (
                <li key={n.key}><Link href={n.href} className="inline-flex min-h-11 items-center text-ink-2 transition-colors duration-[120ms] hover:text-ink">{t(n.label)}</Link></li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-wrap items-start gap-3 md:col-span-3 md:justify-end">
            <div role="group" aria-label={t(COPY.ui.language)} className="flex gap-1">
              <button type="button" className="chip" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
              <button type="button" className="chip" aria-pressed={lang === 'ar'} onClick={() => setLang('ar')}>AR</button>
            </div>
            <div role="group" aria-label={t(COPY.ui.theme)} className="flex gap-1">
              <button type="button" className="chip" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>{t(COPY.ui.light)}</button>
              <button type="button" className="chip" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>{t(COPY.ui.dark)}</button>
            </div>
          </div>
        </div>
        <p className="t-caption mt-12 text-ink-3">{t(COPY.footer.rights)}</p>
      </div>
    </footer>
  );
}
