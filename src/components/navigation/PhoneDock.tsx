'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV } from '@/content/data';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { BrandSymbol } from '../brand/BrandLogo';

const SAFE = 'max(12px, env(safe-area-inset-bottom))';

function Chevron({ dir }: { dir: 'prev' | 'next' | 'up' }) {
  const d = dir === 'up' ? 'M6 15l6-6 6 6' : dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={dir === 'up' ? '' : 'rtl:-scale-x-100'}>
      <path d={d} />
    </svg>
  );
}

/**
 * Phone navigation. Same glass dock, built for thumbs: previous / current chapter / next in one row,
 * and a large-target sheet with every chapter plus language and theme. No sideways swiping.
 */
export function PhoneDock({ pathname, progress, dark }: { pathname: string; progress: number; dark: boolean }) {
  const { t, lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const idx = Math.max(0, NAV.findIndex((n) => (n.href === '/' ? pathname === '/' : pathname === n.href || pathname.startsWith(`${n.href}/`))));
  const cur = NAV[idx];
  const prev = NAV[idx - 1];
  const next = NAV[idx + 1];

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const step = 'grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-[color,background-color,transform] duration-[120ms] ease-aq active:scale-95';
  const closeLabel = t({ en: 'Close menu', ar: 'إغلاق القائمة' });
  const prevLabel = t({ en: 'Previous chapter', ar: 'الفصل السابق' });
  const nextLabel = t({ en: 'Next chapter', ar: 'الفصل التالي' });

  return (
    <div className="sm:hidden" data-nav-phone>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
            />
            <motion.div
              id="phone-menu"
              role="dialog"
              aria-label={t(COPY.ui.menu)}
              data-band={dark ? 'dark' : undefined}
              className="glass fixed inset-x-3 z-50 max-h-[72svh] overflow-y-auto overscroll-contain rounded-[28px] p-2 text-ink"
              style={{ bottom: `calc(${SAFE} + 70px)` }}
              initial={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 10 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: [0.2, 0, 0, 1] }}
            >
              <ul>
                {NAV.map((n) => {
                  const active = n.key === cur.key;
                  return (
                    <li key={n.key}>
                      <Link
                        href={n.href}
                        aria-current={active ? 'page' : undefined}
                        className={`flex min-h-14 items-center gap-4 rounded-2xl px-4 text-[17px] transition-colors duration-[120ms] active:bg-ink/[0.1] ${active ? 'bg-ink/[0.075] font-semibold' : 'font-medium text-ink-2'}`}
                      >
                        <span className="w-6 font-display text-[13px] tabular-nums text-ink-3">{n.num}</span>
                        <span className="flex-1">{t(n.label)}</span>
                        {active && <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-1 grid grid-cols-2 gap-2 border-t border-line-soft p-2 pt-3">
                <button
                  type="button"
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  aria-label={t(lang === 'en' ? COPY.ui.toArabic : COPY.ui.toEnglish)}
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-ink/[0.06] text-[15px] font-semibold active:scale-[0.98]"
                >
                  {lang === 'en' ? 'عربي' : 'English'}
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={t(theme === 'dark' ? COPY.ui.toLight : COPY.ui.toDark)}
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-ink/[0.06] text-[15px] font-semibold active:scale-[0.98]"
                >
                  {theme === 'dark' ? t(COPY.ui.light) : t(COPY.ui.dark)}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav aria-label={t(COPY.ui.menu)} className="pointer-events-none fixed inset-x-0 z-50 px-3" style={{ bottom: SAFE }}>
        <div data-band={dark ? 'dark' : undefined} data-nav-dock className="glass pointer-events-auto relative flex items-center gap-1 overflow-hidden rounded-[26px] p-1.5 text-ink">
          {prev ? (
            <Link href={prev.href} aria-label={`${prevLabel}: ${t(prev.label)}`} className={`${step} text-ink-2 active:bg-ink/[0.08]`}>
              <Chevron dir="prev" />
            </Link>
          ) : (
            <span className={step} aria-hidden="true" />
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="phone-menu"
            aria-label={`${t(COPY.ui.menu)}: ${t(cur.label)}`}
            className="flex h-12 min-w-0 flex-1 items-center justify-center gap-3 rounded-2xl bg-ink/[0.06] px-3 transition-[background-color,transform] duration-[120ms] ease-aq active:scale-[0.98] active:bg-ink/[0.1]"
          >
            <BrandSymbol className="h-5 w-auto shrink-0" decorative tone={dark ? 'reverse' : 'mocha'} />
            <span className="font-display text-[13px] tabular-nums text-ink-3">{cur.num}</span>
            <span className="truncate text-[15px] font-semibold">{t(cur.label)}</span>
            <span className={`text-ink-2 transition-transform duration-[220ms] ease-aq ${open ? 'rotate-180' : ''}`}>
              <Chevron dir="up" />
            </span>
          </button>

          {next ? (
            <Link href={next.href} aria-label={`${nextLabel}: ${t(next.label)}`} className={`${step} text-ink-2 active:bg-ink/[0.08]`}>
              <Chevron dir="next" />
            </Link>
          ) : (
            <Link href="/" aria-label={t({ en: 'Back to home', ar: 'العودة إلى الرئيسية' })} className={`${step} text-ink-2 active:bg-ink/[0.08]`}>
              <Chevron dir="up" />
            </Link>
          )}

          <div className="pointer-events-none absolute inset-x-5 bottom-0 h-[2px] overflow-hidden rounded-full" aria-hidden="true">
            <div className="h-full origin-left bg-brand/70 rtl:origin-right" style={{ transform: `scaleX(${progress})`, transition: 'transform 120ms linear' }} />
          </div>
        </div>
      </nav>
    </div>
  );
}
