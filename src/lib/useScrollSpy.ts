'use client';

import { useEffect, useState } from 'react';

export type SpyState = { active: string; band: 'light' | 'dark'; progress: number; atTop: boolean };

const sectionIds = () => Array.from(document.querySelectorAll<HTMLElement>('[data-section][id]')).map((el) => el.id);

/**
 * Tracks the section in view (read from the page's `[data-section]` elements), the band (paper/ivory vs deep neutral) behind the floating dock, and page progress.
 * Native scrolling only; this just reads positions on animation frames.
 */
/** `pageKey` (the pathname) re-runs the spy when the route changes. */
export function useScrollSpy(pageKey: string): SpyState {
  const [state, setState] = useState<SpyState>({ active: '', band: 'light', progress: 0, atTop: true });

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const vh = window.innerHeight;
      const mid = vh * 0.42;
      const ids = sectionIds();
      let active = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) active = id;
      }
      const line = vh - 56;
      let band: 'light' | 'dark' = 'light';
      document.querySelectorAll<HTMLElement>('[data-section]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) band = el.dataset.band === 'dark' ? 'dark' : 'light';
      });
      const max = document.documentElement.scrollHeight - vh;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const atTop = window.scrollY < 80;
      setState((p) => (p.active === active && p.band === band && p.atTop === atTop && Math.abs(p.progress - progress) < 0.004 ? p : { active, band, progress, atTop }));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', onScroll);
    window.addEventListener('hashchange', onScroll);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onScroll) : null; // layout shifts as images settle
    ro?.observe(document.body);
    const late = window.setTimeout(calc, 600);
    const later = window.setTimeout(calc, 2000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('load', onScroll);
      window.removeEventListener('hashchange', onScroll);
      ro?.disconnect();
      window.clearTimeout(late);
      window.clearTimeout(later);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey]);

  return state;
}
