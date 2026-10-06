'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Screen } from '@/content/data';
import { useLang } from '@/lib/i18n';

/** A product screen exactly as exported from Figma, with a quiet frame. */
export function DeviceFrame({ file, ratio, alt, className = '', priority }: { file: string; ratio: number; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[30px] bg-surface shadow-[var(--elev-3)] ring-1 ring-line ${className}`} style={{ aspectRatio: `${1} / ${ratio}` }}>
      <Image src={`/screens/${file}.webp`} alt={alt} width={900} height={Math.round(900 * ratio)} sizes="(min-width: 1024px) 360px, 70vw" className="h-full w-full object-cover" priority={priority} />
    </div>
  );
}

/** Choose a screen on the left, see it large with the next one standing behind. */
export function ScreenShowcase({ screens, label }: { screens: Screen[]; label: string }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const cur = screens[i];
  const next = screens[(i + 1) % screens.length];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <ol className="lg:col-span-5" aria-label={label}>
        {screens.map((s, n) => (
          <li key={s.file}>
            <button
              type="button"
              aria-current={n === i ? 'true' : undefined}
              onClick={() => setI(n)}
              className="group grid w-full grid-cols-[32px_1fr] items-baseline gap-3 border-t border-line-soft py-4 text-start transition-colors duration-[120ms] last:border-b"
            >
              <span className={`font-display text-[13px] tabular-nums ${n === i ? 'text-accent' : 'text-ink-3'}`}>{String(n + 1).padStart(2, '0')}</span>
              <span>
                <span className={`t-h2 block font-normal transition-colors duration-[220ms] ${n === i ? 'text-ink' : 'text-ink-3 group-hover:text-ink-2'}`}>{t(s.title)}</span>
                <span className={`t-body-sm mt-1 block max-w-[38ch] overflow-hidden text-ink-2 transition-[max-height,opacity] duration-[360ms] ease-aq ${n === i ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>{t(s.note)}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className="relative flex min-h-[560px] items-center justify-center overflow-x-clip lg:col-span-7 lg:min-h-[720px]">
        <div className="relative h-[min(72vh,640px)]" style={{ aspectRatio: `1 / ${cur.ratio}` }}>
          <AnimatePresence initial={false}>
            <motion.div key={`n-${next.file}`} aria-hidden="true" className="absolute inset-0 hidden sm:block" style={{ translateX: '58%', translateY: '6%', scale: 0.86, zIndex: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 0.55 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.3 }}>
              <DeviceFrame file={next.file} ratio={next.ratio} alt="" className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={cur.file} className="relative z-10 h-full" initial={{ opacity: 0, y: reduce ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}>
              <DeviceFrame file={cur.file} ratio={cur.ratio} alt={`${t(cur.title)} — AQARATI`} className="h-full w-full" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
