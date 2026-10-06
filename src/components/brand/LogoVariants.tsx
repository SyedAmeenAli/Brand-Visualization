'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import platesData from '@/content/plates.json';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { track } from '@/lib/analytics';
import { StatusBadge } from '../sections/SectionShell';
import { BrandLogo, BrandSymbol } from './BrandLogo';

const PLATES = platesData as Record<string, { w: number; h: number }>;

type VariantId = 'primary' | 'symbol' | 'mono' | 'reverse' | 'compact' | 'horizontal' | 'stacked';
const VARIANTS: { id: VariantId; plate?: string; surface: 'ivory' | 'paper' | 'dark' }[] = [
  { id: 'primary', surface: 'ivory' },
  { id: 'symbol', surface: 'ivory' },
  { id: 'mono', surface: 'paper' },
  { id: 'reverse', surface: 'dark' },
  { id: 'compact', plate: 'var-compact', surface: 'ivory' },
  { id: 'horizontal', plate: 'var-horizontal', surface: 'ivory' },
  { id: 'stacked', plate: 'var-stacked', surface: 'ivory' },
];

function Specimen({ id, big }: { id: VariantId; big?: boolean }) {
  const v = VARIANTS.find((x) => x.id === id)!;
  if (v.plate) {
    const m = PLATES[v.plate];
    return (
      <div className={`relative ${big ? 'w-full' : 'w-[168px]'}`} style={{ aspectRatio: `${m.w} / ${m.h}` }}>
        <Image src={`/plates/${v.plate}.webp`} alt="" fill sizes={big ? '(min-width: 1024px) 60vw, 100vw' : '25vw'} className="object-contain" />
      </div>
    );
  }
  const logoClass = big ? 'h-auto w-[min(100%,400px)]' : 'h-[88px] w-auto';
  if (id === 'symbol') return <BrandSymbol className={big ? 'h-auto w-[min(60%,260px)]' : 'h-[64px] w-auto'} decorative />;
  if (id === 'mono') return <div className="text-[#2D2823]" style={{ ['--logo-k' as string]: '255 255 255' }}><BrandLogo tone="mono" className={logoClass} decorative /></div>;
  if (id === 'reverse') return <div style={{ ['--logo-k' as string]: '45 40 35' }}><BrandLogo tone="reverse" className={logoClass} decorative /></div>;
  if (id === 'primary') return <div style={{ ['--logo-k' as string]: 'var(--bg-2)' }}><BrandLogo className={logoClass} decorative /></div>;
  return <BrandLogo className={logoClass} decorative />;
}

const surfaceClass = (s: 'ivory' | 'paper' | 'dark') => (s === 'dark' ? 'bg-[#2D2823]' : s === 'paper' ? 'bg-white' : 'bg-bg-2');

export function LogoVariants() {
  const { t } = useLang();
  const [sel, setSel] = useState<VariantId>('primary');
  const cur = VARIANTS.find((v) => v.id === sel)!;
  const label = (id: VariantId) => t(COPY.identity.tones[id]);
  const note = (id: VariantId) => t(COPY.identity.toneNote[id]);

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* selected specimen */}
      <div className="lg:col-span-7">
        <div className={`relative grid min-h-[360px] place-items-center overflow-hidden rounded-xl border border-line-soft p-5 transition-colors sm:p-8 duration-[360ms] ease-aq md:min-h-[560px] ${surfaceClass(cur.surface)}`} data-cursor="logo">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={sel} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }} transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }} className="flex w-full items-center justify-center">
              <Specimen id={sel} big />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="t-h2">{label(sel)}</p>
            <p className="t-body mt-1 max-w-[46ch] text-ink-2" aria-live="polite">{note(sel)}</p>
          </div>
          <StatusBadge status={sel === 'primary' ? 'measured' : 'proposed'} />
        </div>
      </div>

      {/* variant picker */}
      <div className="lg:col-span-5">
        <ul className="grid grid-cols-2 gap-3" role="list">
          {VARIANTS.map((v) => (
            <li key={v.id}>
              <button
                type="button"
                aria-pressed={sel === v.id}
                onClick={() => { setSel(v.id); track('logo_variant_select', { variant: v.id }); }}
                className={`group relative block w-full overflow-hidden rounded-xl border text-start transition-[border-color,transform,box-shadow] duration-[220ms] ease-aq hover:-translate-y-0.5 hover:shadow-[var(--elev-2)] active:scale-[0.985] ${sel === v.id ? 'border-brand' : 'border-line-soft'}`}
              >
                <span className={`grid h-[132px] place-items-center p-3 transition-colors duration-[220ms] ${surfaceClass(v.surface)}`}>
                  <span className="grid place-items-center transition-transform duration-[220ms] ease-aq group-hover:scale-[1.06]">
                    <Specimen id={v.id} />
                  </span>
                </span>
                <span className="flex items-center justify-between gap-2 border-t border-line-soft bg-surface/60 px-3 py-2.5">
                  <span className="t-label">{label(v.id)}</span>
                  <span className="t-caption translate-y-1 text-ink-3 opacity-0 transition-[opacity,transform] duration-[220ms] ease-aq group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    {v.id === 'primary' ? t({ en: 'Master', ar: 'الرئيسي' }) : t({ en: 'Derived', ar: 'مشتق' })}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
