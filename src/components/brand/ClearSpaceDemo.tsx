'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { BrandLogo } from './BrandLogo';

/**
 * Figma 03 — CLEAR SPACE (PROPOSED). X = height of the first Latin capital A = 60.620 source px in the 660 × 726 reference,
 * i.e. 40.413 in the 440 × 484 master coordinates. Visible artwork bounds come from the construction summary: 428.982 × 456.304.
 */
const X = (60.62 * 440) / 660;
const ART = { x: 5.9686, y: 12.4838, w: 428.982, h: 456.304 };

export function ClearSpaceDemo() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [on, setOn] = useState(false);
  const bx = ART.x - X, by = ART.y - X, bw = ART.w + 2 * X, bh = ART.h + 2 * X;
  const vb = `${bx - 24} ${by - 24} ${bw + 48} ${bh + 48}`;
  const tick = (x: number, y: number, label: string, anchor: 'middle' | 'start' | 'end' = 'middle') => (
    <text x={x} y={y} fontSize="9" textAnchor={anchor} fill="rgb(var(--brand))" style={{ fontFamily: 'var(--font-display)' }}>{label}</text>
  );

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-line-soft bg-bg-2 p-6 md:p-10"
      onPointerEnter={() => setOn(true)}
      onPointerLeave={() => setOn(false)}
      data-cursor="logo"
    >
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className="absolute end-4 top-4 z-10 min-h-10 rounded-lg border border-line px-3 text-[12px] font-medium text-ink-2 transition-colors hover:text-ink"
      >
        {on ? t({ en: 'Hide boundary', ar: 'إخفاء الحدود' }) : t({ en: 'Show boundary', ar: 'إظهار الحدود' })}
      </button>
      <BrandLogo viewBox={vb} className="mx-auto block h-auto max-h-[62vh] w-full max-w-[520px]" label="AQARATI, clear space study">
        <g aria-hidden="true" style={{ opacity: on ? 1 : 0, transition: reduce ? 'none' : 'opacity 360ms cubic-bezier(0.2,0,0,1)' }}>
          <rect x={ART.x} y={ART.y} width={ART.w} height={ART.h} fill="none" stroke="rgb(var(--text-3))" strokeWidth="0.8" strokeDasharray="3 3" />
          <rect x={bx} y={by} width={bw} height={bh} fill="rgb(var(--brand) / 0.05)" stroke="rgb(var(--brand))" strokeWidth="1" strokeDasharray="6 4" />
          {/* X units on four sides */}
          <rect x={bx} y={by + bh / 2 - 8} width={X} height={16} fill="rgb(var(--brand) / 0.18)" />
          <rect x={ART.x + ART.w} y={by + bh / 2 - 8} width={X} height={16} fill="rgb(var(--brand) / 0.18)" />
          <rect x={bx + bw / 2 - 8} y={by} width={16} height={X} fill="rgb(var(--brand) / 0.18)" />
          <rect x={bx + bw / 2 - 8} y={ART.y + ART.h} width={16} height={X} fill="rgb(var(--brand) / 0.18)" />
          {tick(bx + X / 2, by + bh / 2 + 3.5, 'X')}
          {tick(ART.x + ART.w + X / 2, by + bh / 2 + 3.5, 'X')}
          {tick(bx + bw / 2, by + X / 2 + 3.5, 'X')}
          {tick(bx + bw / 2, ART.y + ART.h + X / 2 + 3.5, 'X')}
        </g>
      </BrandLogo>
      <p className="t-caption mt-6 text-center text-ink-3">{t(COPY.identity.clearHover)}</p>
      <motion.p className="t-caption mt-1 text-center tabular-nums text-ink-3" animate={{ opacity: on ? 1 : 0.55 }}>
        X = 60.620 px · 660 × 726 {t({ en: 'reference', ar: 'مرجع' })} · {t(COPY.ui.proposed)}
      </motion.p>
    </div>
  );
}
