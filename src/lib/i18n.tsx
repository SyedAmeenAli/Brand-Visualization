'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { track } from './analytics';

export type Lang = 'en' | 'ar';
export type L = { en: string; ar: string };

type Ctx = {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (l: Lang) => void;
  t: (v: L) => string;
};

const LangContext = createContext<Ctx | null>(null);
const KEY = 'aqarati-lang';

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved === 'ar' || saved === 'en') setLangState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    // Single document: keep the chapter under the viewport pinned while direction and copy change.
    const anchor = Array.from(document.querySelectorAll<HTMLElement>('[data-section]')).find((el) => el.getBoundingClientRect().bottom > 120);
    const offset = anchor ? anchor.getBoundingClientRect().top : 0;
    setLangState(l);
    if (anchor) {
      const restore = () => window.scrollTo({ top: window.scrollY + anchor.getBoundingClientRect().top - offset, behavior: 'instant' as ScrollBehavior });
      requestAnimationFrame(() => requestAnimationFrame(restore));
      window.setTimeout(restore, 350);
    }
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
    track('language_change', { lang: l });
  }, []);

  const value = useMemo<Ctx>(
    () => ({ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', setLang, t: (v) => v[lang] }),
    [lang, setLang],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const c = useContext(LangContext);
  if (!c) throw new Error('useLang must be used inside LangProvider');
  return c;
}
