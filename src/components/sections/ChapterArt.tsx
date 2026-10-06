'use client';

import { BRAND_COLOURS } from '@/content/data';
import { useLang } from '@/lib/i18n';
import { BrandLogo } from '../brand/BrandLogo';

/** Construction guides read from Figma 02 (440 × 484 source units), same values as the home hero. */
const G = { axisX: 219.603, apexY: 12.484, leftX: 97.454, rightX: 334.458, waveTopY: 164.963, waveBaseY: 259.847 };

const BANNER = 'aspect-[16/10] sm:aspect-[2/1] md:aspect-[21/9] md:rounded-[20px]';
const frame = (aspect: string) => `relative w-full overflow-hidden rounded-2xl border border-line-soft ${aspect}`;
type A = { aspect?: string };

/** Identity: the approved master with its measured construction lines. */
export function IdentityArt({ aspect = BANNER }: A) {
  const { t } = useLang();
  const line = { stroke: 'rgb(var(--brand) / 0.4)', strokeWidth: 0.6, strokeDasharray: '2 3', fill: 'none' } as const;
  return (
    <div className={`${frame(aspect)} bg-bg-2`} data-cursor="logo">
      <div className="absolute inset-0 flex items-center justify-center px-4 py-5">
      <BrandLogo viewBox="-120 -34 680 552" className="h-full max-w-full w-auto" label="AQARATI عقاراتي — Your Property Journey">
        <g aria-hidden="true">
          <path {...line} d={`M${G.axisX} -30 V 512`} />
          <path {...line} d={`M-114 ${G.apexY} H 554`} />
          <path {...line} d={`M${G.leftX} -30 V ${G.waveBaseY + 10}`} />
          <path {...line} d={`M${G.rightX} -30 V ${G.waveBaseY + 10}`} />
          <path {...line} d={`M-114 ${G.waveTopY} H 554`} />
          <path {...line} d={`M-114 ${G.waveBaseY} H 554`} />
          <g fontSize="5.4" fill="rgb(var(--text-3))" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}>
            <text x="-114" y={G.apexY - 3}>APEX · y 12.484</text>
            <text x="-114" y={G.waveTopY - 3}>WAVE TOP · y 164.963</text>
            <text x="-114" y={G.waveBaseY - 3}>BASELINE · y 259.847</text>
          </g>
        </g>
      </BrandLogo>
      </div>
      <span className={`t-eyebrow absolute bottom-4 start-5 text-ink-3 ${aspect === BANNER ? 'hidden md:block' : 'hidden'}`}>{t({ en: 'Approved master · measured construction', ar: 'الشعار المعتمد · بناء مقاس' })}</span>
    </div>
  );
}

/** Typography: the three families as a specimen. Sizes follow the frame width (container units), so it holds in banners and cards. */
export function TypographyArt({ aspect = BANNER }: A) {
  const { t } = useLang();
  return (
    <div className={`${frame(aspect)} bg-surface`} style={{ containerType: 'inline-size' }}>
      <div className="absolute inset-0 flex items-center justify-between gap-[3cqw] px-[5cqw]">
        <p className="font-display shrink-0 select-none leading-none text-accent" style={{ fontSize: 'clamp(64px, 22cqw, 260px)' }} aria-hidden="true">Aa</p>
        <div className="tyart-mid min-w-0 flex-1">
          <p className="font-display text-ink" style={{ fontSize: 'clamp(16px, 3.2cqw, 42px)', lineHeight: 1.15 }}>A place to belong.</p>
          <p className="mt-2 text-ink-2" style={{ fontSize: 'clamp(11px, 1.4cqw, 16px)' }}>Search, compare and connect with confidence.</p>
          <p className="t-eyebrow mt-3 text-ink-3">Fraunces · Plus Jakarta Sans</p>
        </div>
        <p className="shrink-0 select-none leading-none text-ink" dir="rtl" style={{ fontFamily: 'var(--font-arabic), serif', fontSize: 'clamp(48px, 15cqw, 170px)', fontWeight: 500 }} aria-hidden="true">عق</p>
      </div>
      <span className="t-eyebrow absolute bottom-3 start-[5cqw] hidden text-ink-3 sm:block">{t({ en: 'English and Arabic, set together', ar: 'الإنجليزية والعربية، معاً' })}</span>
    </div>
  );
}

/** Colour: the three measured brand colours as a single field. */
export function ColourArt({ aspect = BANNER }: A) {
  const { t } = useLang();
  return (
    <div className={`${frame(aspect)} grid grid-cols-3`}>
      {BRAND_COLOURS.map((c) => {
        const light = c.id === 'ivory';
        return (
          <div key={c.id} className="flex flex-col justify-end p-4 md:p-8" style={{ background: c.hex, color: light ? '#2D2823' : '#F4EEE6' }}>
            <p className="font-display" style={{ fontSize: 'clamp(18px, 3vw, 44px)', lineHeight: 1.1 }}>{t(c.name)}</p>
            <p className="mt-1 text-[12px] tabular-nums opacity-80 md:text-[14px]" dir="ltr">{c.hex}</p>
          </div>
        );
      })}
    </div>
  );
}
