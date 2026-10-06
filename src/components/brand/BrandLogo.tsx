'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { MASTER_GROUPS, MASTER_VIEWBOX, SYMBOL_VIEWBOX, type LogoPath } from '@/lib/logo-paths';

type Tone = 'auto' | 'mono' | 'mocha' | 'reverse';

type Props = {
  tone?: Tone;
  className?: string;
  label?: string;
  /** reveal the symbol, Arabic, Latin and tagline in sequence */
  animate?: boolean;
  /** extra drawing inside the same coordinate system (e.g. construction guides) */
  children?: ReactNode;
  /** viewBox override when children extend beyond the artwork */
  viewBox?: string;
  decorative?: boolean;
  /** dim every part except one (used by the anatomy list) */
  focus?: 'symbol' | 'arabic' | 'latin' | 'tagline' | null;
};

function Paths({ items }: { items: LogoPath[] }) {
  return (
    <>
      {items.map((p, i) => (
        <path key={i} className={p.c} d={p.d} fillRule={p.e ? 'evenodd' : undefined} />
      ))}
    </>
  );
}

/**
 * The approved AQARATI master vector, extracted from Figma (01 — LOGO / Master logo).
 * The geometry is never recomputed: paths are copied verbatim and only recoloured through tokens.
 */
export function BrandLogo({ tone = 'auto', className, label = 'AQARATI عقاراتي — Your Property Journey', animate = false, children, viewBox, decorative, focus = null }: Props) {
  const reduce = useReducedMotion();
  const dataTone = tone === 'auto' ? undefined : tone;
  const a11y = decorative ? { 'aria-hidden': true as const } : { role: 'img' as const, 'aria-label': label };

  if (!animate) {
    return (
      <svg viewBox={viewBox ?? MASTER_VIEWBOX} className={`logo ${className ?? ''}`} data-tone={dataTone} overflow="visible" {...a11y}>
        {(['symbol', 'arabic', 'latin', 'tagline'] as const).map((k) => (
          <g key={k} style={{ opacity: focus && focus !== k ? 0.14 : 1, transition: 'opacity 220ms cubic-bezier(0.2, 0, 0, 1)' }}>
            <Paths items={MASTER_GROUPS[k]} />
          </g>
        ))}
        {children}
      </svg>
    );
  }

  const rise = (delay: number): Variants => ({
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : delay, ease: [0.2, 0, 0, 1] } },
  });

  return (
    <motion.svg
      viewBox={viewBox ?? MASTER_VIEWBOX}
      className={`logo ${className ?? ''}`}
      data-tone={dataTone}
      overflow="visible"
      initial="hidden"
      animate="show"
      {...a11y}
    >
      <motion.g variants={rise(0.2)}><Paths items={MASTER_GROUPS.symbol} /></motion.g>
      <motion.g variants={rise(0.55)}><Paths items={MASTER_GROUPS.arabic} /></motion.g>
      <motion.g variants={rise(0.8)}><Paths items={MASTER_GROUPS.latin} /></motion.g>
      <motion.g variants={rise(1.05)}><Paths items={MASTER_GROUPS.tagline} /></motion.g>
      {children}
    </motion.svg>
  );
}

/** The symbol only: house and wave, taken from the same master paths. */
export function BrandSymbol({ tone = 'auto', className, label = 'AQARATI symbol', decorative }: { tone?: Tone; className?: string; label?: string; decorative?: boolean }) {
  const a11y = decorative ? { 'aria-hidden': true as const } : { role: 'img' as const, 'aria-label': label };
  return (
    <svg viewBox={SYMBOL_VIEWBOX} className={`logo ${className ?? ''}`} data-tone={tone === 'auto' ? undefined : tone} {...a11y}>
      <g><Paths items={MASTER_GROUPS.symbol} /></g>
    </svg>
  );
}
