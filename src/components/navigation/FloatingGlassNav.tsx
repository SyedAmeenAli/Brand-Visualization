'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV } from '@/content/data';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { track } from '@/lib/analytics';
import { useScrollSpy } from '@/lib/useScrollSpy';
import { BrandSymbol } from '../brand/BrandLogo';

const SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.8 } as const;

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </svg>
  );
}

/**
 * The AQARATI floating glass dock. Glass is a material used for this navigation only.
 * - minimises while scrolling down, restores on scroll up / pointer / focus
 * - horizontally draggable (mouse) and swipeable (touch), keeps the active chapter centred
 * - adapts its tint to the band behind it
 */
export function FloatingGlassNav() {
  const { t, lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const spy = useScrollSpy(pathname);

  const [expanded, setExpanded] = useState(true);
  const [engaged, setEngaged] = useState(false); // hover / focus inside
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const drag = useRef({ active: false, moved: 0, startX: 0, startLeft: 0, lastX: 0, vx: 0, raf: 0 });
  const lastY = useRef(0);
  const lastSection = useRef('');

  const activeItem = NAV.find((n) => n.href === '/' ? pathname === '/' : pathname === n.href || pathname.startsWith(`${n.href}/`)) ?? NAV[0];
  const activeKey = activeItem.key;
  const dark = theme === 'dark' || spy.band === 'dark';

  /* minimise on scroll down, restore on scroll up */
  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const d = y - lastY.current;
        if (y < 80) setExpanded(true);
        else if (d > 8 && !drag.current.active) setExpanded(false);
        else if (d < -8) setExpanded(true);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* a new page opens with the dock expanded */
  useEffect(() => {
    setExpanded(true);
    lastY.current = 0;
  }, [pathname]);

  /* section_view hook */
  useEffect(() => {
    if (lastSection.current !== spy.active) {
      lastSection.current = spy.active;
      track('section_view', { section: spy.active, page: pathname });
    }
  }, [spy.active, pathname]);

  /* keep the active item centred inside the scroller */
  useEffect(() => {
    const sc = scrollerRef.current;
    const el = itemRefs.current[activeKey];
    if (!sc || !el || drag.current.active || !expanded) return;
    const left = el.offsetLeft - (sc.clientWidth - el.offsetWidth) / 2;
    sc.scrollTo({ left: Math.max(0, left), behavior: reduce ? 'auto' : 'smooth' });
  }, [activeKey, expanded, reduce]);

  /* mouse drag with momentum */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const sc = scrollerRef.current;
    if (!sc) return;
    cancelAnimationFrame(drag.current.raf);
    drag.current = { ...drag.current, active: true, moved: 0, startX: e.clientX, startLeft: sc.scrollLeft, lastX: e.clientX, vx: 0 };
  };
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = drag.current;
      const sc = scrollerRef.current;
      if (!d.active || !sc) return;
      const dx = e.clientX - d.startX;
      d.moved = Math.max(d.moved, Math.abs(dx));
      d.vx = e.clientX - d.lastX;
      d.lastX = e.clientX;
      sc.scrollLeft = d.startLeft - dx;
    };
    const up = () => {
      const d = drag.current;
      const sc = scrollerRef.current;
      if (!d.active) return;
      d.active = false;
      if (!sc || reduce || Math.abs(d.vx) < 1) return;
      let v = -d.vx;
      const step = () => {
        v *= 0.94;
        sc.scrollLeft += v;
        if (Math.abs(v) > 0.4) d.raf = requestAnimationFrame(step);
      };
      d.raf = requestAnimationFrame(step);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [reduce]);

  /* a drag must not count as a click on the item it ended over */
  const guard = (e: React.MouseEvent) => {
    if (drag.current.moved > 5) { e.preventDefault(); drag.current.moved = 0; }
  };

  const show = expanded || engaged;
  const label = (n: (typeof NAV)[number]) => t(n.label);

  return (
    <nav
      aria-label={t(COPY.ui.menu)}
      className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-3 sm:px-4"
      style={{ bottom: 'max(14px, env(safe-area-inset-bottom))' }}
    >
      <motion.div
        layout
        transition={reduce ? { duration: 0 } : SPRING}
        data-band={dark ? 'dark' : undefined}
        data-nav-dock
        onPointerEnter={() => setEngaged(true)}
        onPointerLeave={() => setEngaged(false)}
        onFocusCapture={(e) => { if ((e.target as HTMLElement).matches(':focus-visible')) setEngaged(true); }}
        onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setEngaged(false); }}
        className="glass pointer-events-auto relative flex max-w-full items-center gap-1 overflow-hidden rounded-[26px] p-1.5 text-ink"
        style={{ width: show ? 'min(100%, 880px)' : undefined }}
      >
        {/* symbol: back to the top */}
        <motion.div layout="position" className="shrink-0">
        <Link
          href="/"
          aria-label={t({ en: 'AQARATI, home', ar: 'عقاراتي، الرئيسية' })}
          className="grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-[120ms] ease-aq active:scale-95"
        >
          <BrandSymbol className="h-6 w-auto" decorative tone={dark ? 'reverse' : 'mocha'} />
        </Link>
        </motion.div>

        <AnimatePresence initial={false} mode="popLayout">
          {show ? (
            <motion.div
              key="items"
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative min-w-0 flex-1"
            >
              <div
                ref={scrollerRef}
                onPointerDown={onPointerDown}
                className="no-scrollbar flex cursor-grab touch-pan-x snap-none items-center gap-0.5 overflow-x-auto overscroll-x-contain px-1 active:cursor-grabbing"
                style={{ maskImage: 'linear-gradient(to right, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 14px, #000 calc(100% - 14px), transparent 100%)' }}
                role="list"
              >
                {NAV.map((n) => {
                  const active = n.key === activeKey;
                  return (
                    <Link
                      key={n.key}
                      ref={(el) => { itemRefs.current[n.key] = el; }}
                      role="listitem"
                      href={n.href}
                      onClick={guard}
                      aria-current={active ? 'page' : undefined}
                      draggable={false}
                      className={`relative flex min-h-11 shrink-0 select-none items-center whitespace-nowrap rounded-2xl px-3.5 text-[13px] transition-[color,transform] duration-[120ms] ease-aq active:scale-95 sm:px-4 ${active ? 'font-semibold text-ink' : 'font-medium text-ink-2 hover:text-ink'}`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          transition={reduce ? { duration: 0 } : SPRING}
                          className="absolute inset-0 rounded-2xl bg-ink/[0.075] shadow-[inset_0_0_0_1px_rgb(var(--text)/0.06)]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">{label(n)}</span>
                      {active && <span className="absolute inset-x-1/2 bottom-1 mx-auto h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-brand" aria-hidden="true" />}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="compact"
              layout="position"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setExpanded(true)}
              aria-expanded={false}
              aria-label={`${t(COPY.ui.openMenu)}. ${label(activeItem)}`}
              className="flex min-h-11 items-center gap-3 rounded-2xl px-3 text-start"
            >
              <span className="font-display text-[13px] tabular-nums text-ink-3">{activeItem.num}</span>
              <span className="text-[13px] font-semibold">{label(activeItem)}</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/[0.08]" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6.5 5 3.5l3 3" /></svg>
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {show && (
          <motion.div layout="position" className="flex shrink-0 items-center gap-0.5 ps-1 border-s border-line-soft">
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              aria-label={t(lang === 'en' ? COPY.ui.toArabic : COPY.ui.toEnglish)}
              className="grid h-11 min-w-11 place-items-center rounded-2xl px-2 text-[13px] font-semibold text-ink-2 transition-[color,transform] duration-[120ms] ease-aq hover:text-ink active:scale-95"
            >
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={t(theme === 'dark' ? COPY.ui.toLight : COPY.ui.toDark)}
              className="grid h-11 w-11 place-items-center rounded-2xl text-ink-2 transition-[color,transform] duration-[120ms] ease-aq hover:text-ink active:scale-95"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </motion.div>
        )}

        {/* page progress, integrated into the dock */}
        <div className="pointer-events-none absolute inset-x-5 bottom-0 h-[2px] overflow-hidden rounded-full" aria-hidden="true">
          <div className="h-full origin-left bg-brand/70 rtl:origin-right" style={{ transform: `scaleX(${spy.progress})`, transition: 'transform 120ms linear' }} />
        </div>
      </motion.div>
    </nav>
  );
}
