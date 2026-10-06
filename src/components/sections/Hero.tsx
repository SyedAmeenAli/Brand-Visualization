'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { BrandLogo } from '../brand/BrandLogo';

/** Construction measurements read from Figma 02 — LOGO CONSTRUCTION (440 × 484 source units). */
const GUIDES = {
  axisX: 219.603,
  apexY: 12.484,
  leftX: 97.454,
  rightX: 334.458,
  waveTopY: 164.963,
  waveBaseY: 259.847,
};

function Guide({ d, delay }: { d: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgb(var(--brand) / 0.38)"
      strokeWidth={0.6}
      strokeDasharray="2 3"
      initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : delay, ease: [0.2, 0, 0, 1] }}
    />
  );
}

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.2 : 0.8, delay: reduce ? 0 : delay, ease: [0.2, 0, 0, 1] as const },
  });

  return (
    <section id="home" data-band="ivory" data-section aria-label={t(COPY.site.title)} className="relative min-h-[100svh] overflow-hidden bg-bg text-ink">
      {/* soft background arrival */}
      <motion.div aria-hidden="true" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.8 }} />

      <div className="container-x relative grid min-h-[100svh] grid-cols-12 items-center gap-x-6 pb-44 pt-14 md:pb-28 md:pt-10">
        {/* logo */}
        <div className="col-span-12 flex justify-center md:order-2 md:col-span-6 md:justify-end md:pe-[2vw]">
          <div className="relative w-[min(72vw,340px)] md:w-[min(46vw,560px)] lg:w-[min(40vw,600px)]" data-cursor="logo">
            <BrandLogo animate viewBox="-90 -34 620 552" className="h-auto w-full" label="AQARATI عقاراتي — Your Property Journey">
              <g aria-hidden="true">
                <Guide d={`M${GUIDES.axisX} -30 V 512`} delay={1.15} />
                <Guide d={`M-84 ${GUIDES.apexY} H 524`} delay={1.25} />
                <Guide d={`M${GUIDES.leftX} -30 V ${GUIDES.waveBaseY + 10}`} delay={1.35} />
                <Guide d={`M${GUIDES.rightX} -30 V ${GUIDES.waveBaseY + 10}`} delay={1.45} />
                <Guide d={`M-84 ${GUIDES.waveTopY} H 524`} delay={1.55} />
                <Guide d={`M-84 ${GUIDES.waveBaseY} H 524`} delay={1.65} />
                <g fontSize="5.2" fill="rgb(var(--text-3))" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}>
                  <text x="-84" y={GUIDES.apexY - 3}>APEX · y 12.484</text>
                  <text x="-84" y={GUIDES.waveTopY - 3}>WAVE TOP · y 164.963</text>
                  <text x="-84" y={GUIDES.waveBaseY - 3}>WAVE BASELINE · y 259.847</text>
                  <text x={GUIDES.leftX - 2} y="-24" textAnchor="end">x 97.454</text>
                  <text x={GUIDES.rightX + 2} y="-24">x 334.458</text>
                </g>
              </g>
            </BrandLogo>
          </div>
        </div>

        {/* statement */}
        <div className="col-span-12 mt-10 md:order-1 md:col-span-6 md:mt-0">
          <motion.p className="t-eyebrow text-ink-3" {...rise(1.1)}>{t(COPY.hero.eyebrow)}</motion.p>
          <h1 className="t-display-lg mt-5 text-balance" style={{ fontSize: 'clamp(36px, 4.4vw, 64px)', lineHeight: 1.1 }}>
            <motion.span className="block" {...rise(1.25)}>{t(COPY.hero.line1)}</motion.span>
            <motion.span className="block text-accent" {...rise(1.4)}>{t(COPY.hero.line2)}</motion.span>
          </h1>
          <motion.p className="t-body-lg mt-7 max-w-[44ch] text-ink-2" {...rise(1.6)}>{t(COPY.hero.sub)}</motion.p>
          <motion.p className="t-caption mt-8 hidden tabular-nums text-ink-3 md:block" {...rise(1.8)}>{t(COPY.hero.measure)}</motion.p>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#brand"
        className="absolute bottom-24 start-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-ink-3 transition-colors hover:text-ink rtl:translate-x-1/2 md:bottom-28 md:start-[var(--gutter)] md:translate-x-0 md:rtl:translate-x-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 2, duration: 0.6 }}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('brand')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
        }}
        aria-label={t(COPY.ui.scroll)}
      >
        <span className="t-eyebrow">{t(COPY.ui.scroll)}</span>
        <span className="relative block h-10 w-px overflow-hidden bg-line" aria-hidden="true">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-brand"
            animate={reduce ? undefined : { y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
          />
        </span>
      </motion.a>
    </section>
  );
}
