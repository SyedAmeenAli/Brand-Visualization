'use client';

import { useState } from 'react';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { BrandLogo } from './BrandLogo';

/**
 * Figma 04 — MINIMUM SIZE. Everything here is an observation on the intact master; no minimum is approved yet.
 * Proportions are measured from the 440 × 484 master: tagline text 12.601 px high, symbol 349.141 px wide.
 */
const STEPS = [440, 240, 120, 80, 48, 32, 24, 16];
const TAGLINE_H = 12.601 / 484;
const SYMBOL_W = 349.141 / 484;

export function MinimumSizeDemo() {
  const { t } = useLang();
  const [h, setH] = useState(240);
  const tagline = h * TAGLINE_H;
  const symbol = h * SYMBOL_W;
  const impractical = tagline < 1;

  return (
    <div className="rounded-xl border border-line-soft bg-bg-2 p-6 md:p-10">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_320px]">
        <div className="relative grid min-h-[300px] place-items-center md:min-h-[420px]" data-cursor="logo">
          {/* baseline ruler */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden="true" />
          <div className="flex items-end justify-center pb-6">
            <div style={{ height: h }}>
              <BrandLogo className="block h-full w-auto" label={`AQARATI at ${h} px container height`} />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="min-size" className="t-eyebrow text-ink-3">{t(COPY.identity.sizeLabel)}</label>
          <p className="font-display mt-2 text-[56px] leading-none tabular-nums" aria-live="polite">{h}<span className="ms-2 text-[18px] text-ink-3">px</span></p>
          <input
            id="min-size"
            type="range"
            min={16}
            max={440}
            step={1}
            value={h}
            onChange={(e) => setH(Number(e.target.value))}
            className="mt-6 h-2 w-full cursor-pointer accent-[rgb(var(--brand))]"
            aria-valuetext={`${h} px`}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            {STEPS.map((s) => (
              <button key={s} type="button" aria-pressed={h === s} onClick={() => setH(s)} className="chip tabular-nums">{s}</button>
            ))}
          </div>
          <dl className="mt-8 space-y-3 border-t border-line-soft pt-5 text-[13px]">
            <div className="flex justify-between gap-4"><dt className="text-ink-3">{t({ en: 'Tagline text height', ar: 'ارتفاع نص العبارة' })}</dt><dd className="tabular-nums">{tagline.toFixed(2)} px</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-ink-3">{t({ en: 'Symbol width', ar: 'عرض الرمز' })}</dt><dd className="tabular-nums">{symbol.toFixed(1)} px</dd></div>
          </dl>
          <p className={`mt-5 rounded-lg border px-3 py-2.5 text-[13px] ${impractical ? 'border-error/50 text-error' : 'border-line-soft text-ink-2'}`} role="status">
            {impractical
              ? t({ en: 'Not practical: critical detail is difficult to read at this scale.', ar: 'غير عملي: يصعب قراءة التفاصيل الدقيقة بهذا الحجم.' })
              : t(COPY.identity.sizeNote)}
          </p>
        </div>
      </div>
    </div>
  );
}
