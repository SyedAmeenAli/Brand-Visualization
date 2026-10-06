'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';
import { COPY } from '@/content/copy';
import { EASINGS, MOTION_TOKENS } from '@/content/data';
import { useLang } from '@/lib/i18n';
import { BrandSymbol } from '../brand/BrandLogo';

/** Figma 17 — MOTION PRINCIPLES (proposed): 120 / 220 / 360 ms, cubic-bezier(0.2, 0, 0, 1), no decorative overshoot. */
const E = [0.2, 0, 0, 1] as const;

function Card({ title, ms, children, onPlay, reduced }: { title: string; ms: string; children: ReactNode; onPlay: () => void; reduced: boolean }) {
  const { t } = useLang();
  return (
    <div className="flex flex-col rounded-xl border border-line-soft bg-surface/50 p-5" data-cursor="motion">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="t-h4">{title}</h4>
        <span className="t-caption tabular-nums text-ink-3" dir="ltr">{reduced ? '0 ms' : ms}</span>
      </div>
      <div className="relative mt-4 flex min-h-[188px] flex-1 items-center justify-center overflow-hidden rounded-lg bg-bg-2 p-4">{children}</div>
      <button type="button" onClick={onPlay} className="chip mt-4 self-start">{t(COPY.visual.replay)}</button>
    </div>
  );
}

function ErrorField({ replay, off, label }: { replay: number; off: boolean; label: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(false);
    const id = window.setTimeout(() => setOn(true), off ? 0 : 60);
    return () => window.clearTimeout(id);
  }, [replay, off]);
  return (
    <div className={`rounded-lg border-2 bg-surface px-3 py-3 text-[13px] text-ink-3 transition-colors duration-[220ms] ease-aq ${on ? 'border-error' : 'border-line'}`}>{label}</div>
  );
}

export function MotionDemo() {
  const { t } = useLang();
  const sys = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  const off = Boolean(sys) || reduced;
  const [k, setK] = useState({ reveal: 0, selection: 0, sheet: 0, loading: 0, success: 0, error: 0, nav: 0, timing: 0 });
  const bump = (key: keyof typeof k) => setK((s) => ({ ...s, [key]: s[key] + 1 }));
  const dur = (ms: number) => (off ? 0.001 : ms / 1000);
  const [sel, setSel] = useState(0);
  const [navOpen, setNavOpen] = useState(true);
  const opts = [t(COPY.visual.selectA), t(COPY.visual.selectB), t(COPY.visual.selectC)];
  const v = COPY.visual;

  return (
    <div>
      <div className="mb-8 grid gap-8 lg:grid-cols-12">
        {/* timing tokens */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between">
            <p className="t-eyebrow text-ink-3">{t({ en: 'Timing', ar: 'التوقيت' })}</p>
            <button type="button" onClick={() => bump('timing')} className="chip">{t(v.play)}</button>
          </div>
          <ul className="mt-4 space-y-4">
            {MOTION_TOKENS.map((m) => (
              <li key={m.id} className="grid grid-cols-[104px_1fr] items-center gap-4 sm:grid-cols-[132px_1fr_160px]">
                <span className="t-label" dir="ltr">motion.{m.id}<span className="block text-[12px] font-normal tabular-nums text-ink-3">{m.ms} ms</span></span>
                <span className="relative block h-9 border-b border-line">
                  <motion.span key={`${m.id}-${k.timing}`} className="absolute top-1/2 block h-3 w-3 -translate-y-1/2 rounded-full bg-brand" initial={{ insetInlineStart: '0%' }} animate={{ insetInlineStart: 'calc(100% - 12px)' }} transition={{ duration: dur(m.ms), ease: E }} />
                </span>
                <span className="t-caption hidden text-ink-3 sm:block">{t(m.use)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <p className="t-eyebrow text-ink-3">{t({ en: 'Easing', ar: 'منحنيات الحركة' })}</p>
          <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
            {EASINGS.map((e) => (
              <li key={e.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 text-[13px]">
                <span className="t-label" dir="ltr">ease.{e.id}</span>
                <span className="tabular-nums text-ink-3" dir="ltr">{e.curve}</span>
                <span className="w-full text-ink-2">{t(e.use)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-6">
        <p className="t-body-sm max-w-[60ch] text-ink-2">{t(v.reducedNote)}</p>
        <label className="chip cursor-pointer gap-2">
          <input type="checkbox" checked={off} disabled={Boolean(sys)} onChange={(e) => setReduced(e.target.checked)} className="accent-[rgb(var(--brand))]" />
          {t(v.reduced)}{sys ? ` · ${t({ en: 'system', ar: 'النظام' })}` : ''}
        </label>
      </div>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="list">
        {/* reveal */}
        <li><Card title={t(v.demoTitles.reveal)} ms="220 ms" onPlay={() => bump('reveal')} reduced={off}>
          <motion.div key={k.reveal} initial={{ opacity: 0, y: off ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur(220), ease: E }} className="w-full max-w-[220px] rounded-xl bg-surface p-4 shadow-[var(--elev-1)]">
            <p className="t-label">{t(COPY.product.propertyName)}</p><p className="t-caption mt-1 text-ink-3">{t(COPY.product.propertyLoc)}</p>
          </motion.div>
        </Card></li>

        {/* selection */}
        <li><Card title={t(v.demoTitles.selection)} ms="120 ms" onPlay={() => { setSel((s) => (s + 1) % 3); bump('selection'); }} reduced={off}>
          <div role="radiogroup" aria-label={t(v.demoTitles.selection)} className="relative flex gap-1 rounded-xl bg-surface p-1 shadow-[var(--elev-1)]">
            {opts.map((o, i) => (
              <button key={i} role="radio" aria-checked={sel === i} onClick={() => setSel(i)} className={`relative min-h-10 rounded-lg px-4 text-[13px] font-medium transition-[transform,color] duration-[120ms] active:scale-[0.97] ${sel === i ? 'text-white' : 'text-ink-2'}`}>
                {sel === i && <motion.span layoutId="motion-sel" transition={{ duration: dur(120), ease: E }} className="absolute inset-0 rounded-lg bg-brand" />}
                <span className="relative">{o}</span>
              </button>
            ))}
          </div>
        </Card></li>

        {/* sheet */}
        <li><Card title={t(v.demoTitles.sheet)} ms="360 ms" onPlay={() => bump('sheet')} reduced={off}>
          <div className="relative h-[170px] w-full max-w-[210px] overflow-hidden rounded-xl bg-bg">
            <p className="t-caption p-3 text-ink-3">{t(COPY.product.propertyLoc)}</p>
            <motion.div key={`s${k.sheet}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: dur(360), ease: E }} className="absolute inset-0 bg-ink/20" />
            <motion.div key={`h${k.sheet}`} initial={{ y: off ? 0 : '100%' }} animate={{ y: 0 }} transition={{ duration: dur(360), ease: E }} className="absolute inset-x-0 bottom-0 rounded-t-[20px] bg-elevated px-4 pb-4 pt-3 shadow-[var(--elev-3)]">
              <span className="mx-auto mb-2 block h-1 w-8 rounded-full bg-line" />
              <p className="t-label">{t(v.sheetTitle)}</p>
              <p className="t-caption mt-1 line-clamp-2 text-ink-2">{t(v.sheetBody)}</p>
            </motion.div>
          </div>
        </Card></li>

        {/* loading */}
        <li><Card title={t(v.demoTitles.loading)} ms="∞ · 1.6 s" onPlay={() => bump('loading')} reduced={off}>
          <div className="w-full max-w-[220px] space-y-3" aria-busy="true" aria-label={t({ en: 'Loading', ar: 'جارٍ التحميل' })}>
            {[100, 72, 88].map((w, i) => (
              <motion.div key={`${k.loading}-${i}`} className="h-3 rounded-md bg-ink/10" style={{ width: `${w}%` }} animate={off ? undefined : { opacity: [0.45, 1, 0.45] }} transition={{ duration: 1.6, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: i * 0.12 }} />
            ))}
          </div>
        </Card></li>

        {/* success */}
        <li><Card title={t(v.demoTitles.success)} ms="360 ms" onPlay={() => bump('success')} reduced={off}>
          <motion.div key={k.success} className="flex flex-col items-center text-center" initial={{ opacity: 0, y: off ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur(360), ease: E }}>
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <motion.circle cx="22" cy="22" r="19" stroke="rgb(var(--success))" strokeWidth="2" initial={{ pathLength: off ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur(360), ease: E }} />
              <motion.path d="M13.5 22.5 19.5 28.5 30.5 16" stroke="rgb(var(--success))" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: off ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: dur(360), delay: off ? 0 : 0.16, ease: E }} />
            </svg>
            <p className="t-label mt-3">{t(v.submitted)}</p><p className="t-caption mt-1 text-ink-2">{t(v.submittedNote)}</p>
          </motion.div>
        </Card></li>

        {/* error */}
        <li><Card title={t(v.demoTitles.error)} ms="220 ms" onPlay={() => bump('error')} reduced={off}>
          <div className="w-full max-w-[220px]">
            <ErrorField replay={k.error} off={off} label={t({ en: 'Preferred viewing date', ar: 'موعد المعاينة المفضل' })} />
            <motion.p key={`m${k.error}`} initial={{ opacity: 0, y: off ? 0 : -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur(220), delay: off ? 0 : 0.08, ease: E }} className="mt-2 text-[12px] font-medium text-error" role="alert">{t(v.errorTitle)}. {t(v.errorNote)}</motion.p>
          </div>
        </Card></li>

        {/* navigation */}
        <li><Card title={t({ en: 'Navigation', ar: 'التنقل' })} ms="spring" onPlay={() => { setNavOpen((o) => !o); bump('nav'); }} reduced={off}>
          <motion.div layout transition={off ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }} className="glass flex items-center gap-1 rounded-2xl p-1.5 text-[12px] font-medium">
            <motion.span layout="position" className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10"><BrandSymbol className="h-5 w-auto" decorative tone="mocha" /></motion.span>
            {navOpen ? COPY.product.productNav.slice(0, 4).map((n, i) => <motion.span key={i} layout="position" className={`px-2.5 py-2 ${i === 1 ? 'rounded-xl bg-ink/10' : 'text-ink-2'}`}>{t(n)}</motion.span>) : <motion.span layout="position" className="px-2.5">{t(COPY.product.productNav[1])}</motion.span>}
          </motion.div>
        </Card></li>
      </ul>
    </div>
  );
}
