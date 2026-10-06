'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { track } from './analytics';

export type Theme = 'light' | 'dark';
type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };
const ThemeContext = createContext<Ctx | null>(null);
const KEY = 'aqarati-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // the inline script in layout.tsx has already applied data-theme before paint
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark' || current === 'light') setThemeState(current);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    const el = document.documentElement;
    el.classList.add('theme-anim');
    el.setAttribute('data-theme', t);
    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* ignore */
    }
    track('theme_change', { theme: t });
    window.setTimeout(() => el.classList.remove('theme-anim'), 520);
  }, []);

  const value = useMemo<Ctx>(
    () => ({ theme, setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') }),
    [theme, setTheme],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Ctx {
  const c = useContext(ThemeContext);
  if (!c) throw new Error('useTheme must be used inside ThemeProvider');
  return c;
}

/** Inline script: applies saved theme / system preference and saved language before first paint (no flash). */
export const NO_FLASH_SCRIPT = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('${KEY}');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t);var l=localStorage.getItem('aqarati-lang');if(l==='ar'){d.lang='ar';d.dir='rtl'}}catch(e){}})();`;
