'use client';

import { useState } from 'react';
import { COPY } from '@/content/copy';
import { PLATE_SETS } from '@/content/data';
import { useLang } from '@/lib/i18n';
import { BrandLogo } from '../brand/BrandLogo';
import { ClearSpaceDemo } from '../brand/ClearSpaceDemo';
import { LogoVariants } from '../brand/LogoVariants';
import { MinimumSizeDemo } from '../brand/MinimumSizeDemo';
import { PlateExplorer } from '../gallery/PlateExplorer';
import { Reveal } from '../motion/Reveal';
import { ChapterHeader, SectionShell, SubHeader } from './SectionShell';

type Part = 'symbol' | 'arabic' | 'latin' | 'tagline';
const PART_KEYS: Part[] = ['symbol', 'arabic', 'latin', 'tagline'];

export function Identity() {
  const { t } = useLang();
  const c = COPY.identity;
  const [focus, setFocus] = useState<Part | null>(null);
  const set = (id: string) => PLATE_SETS.find((s) => s.id === id)!;

  return (
    <SectionShell id="identity" band="ivory" label={t(c.title)}>
      <div className="container-x pb-20 md:pb-28">
        <ChapterHeader num={c.num} title={c.title} lead={c.lead} chapter="identity" />

        {/* master specimen */}
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-xl border border-line-soft bg-surface/40 p-8 md:min-h-[680px]" data-cursor="logo">
              <span className="t-eyebrow absolute start-5 top-5 text-ink-3">{t(c.masterLabel)}</span>
              <span className="t-caption absolute end-5 top-5 tabular-nums text-ink-3">440 × 484</span>
              <BrandLogo className="h-auto w-[min(70vw,380px)] md:w-[min(32vw,460px)]" focus={focus} />
              <span className="t-caption absolute bottom-5 start-5 text-ink-3">Figma · 01 — LOGO / Master logo</span>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between gap-10">
              <ol className="border-t border-ink">
                {PART_KEYS.map((k, i) => {
                  const p = c.parts[i];
                  return (
                    <li key={k}>
                      <button
                        type="button"
                        onPointerEnter={() => setFocus(k)}
                        onPointerLeave={() => setFocus(null)}
                        onFocus={() => setFocus(k)}
                        onBlur={() => setFocus(null)}
                        onClick={() => setFocus((f) => (f === k ? null : k))}
                        aria-pressed={focus === k}
                        className="group flex min-h-16 w-full items-baseline gap-5 border-b border-line-soft py-4 text-start transition-colors duration-[120ms] hover:text-accent"
                      >
                        <span className="font-display text-[13px] tabular-nums text-ink-3">{p.n}</span>
                        <span className="flex-1">
                          <span className="t-h4 block">{t(p.t)}</span>
                          <span className="t-body-sm block text-ink-2" dir="auto">{t(p.d)}</span>
                        </span>
                        <span className="h-px w-5 bg-line transition-[width,background-color] duration-[220ms] ease-aq group-hover:w-9 group-hover:bg-brand" aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ol>
              <p className="t-body-sm text-ink-2">{t(c.masterNote)}</p>
            </div>
          </Reveal>
        </div>

        {/* construction */}
        <div className="mt-20 md:mt-28">
          <SubHeader num="02.1" title={{ en: 'Construction', ar: 'البناء' }} lead={set('construction').lead} />
          <div className="mt-10"><PlateExplorer plates={set('construction').plates} status={set('construction').status} /></div>
        </div>

        {/* clear space */}
        <div className="mt-20 md:mt-28">
          <SubHeader num="02.2" title={c.clearTitle} lead={c.clearBody} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5"><ClearSpaceDemo /></div>
            <div className="lg:col-span-7"><PlateExplorer plates={set('clear-space').plates} status="proposed" /></div>
          </div>
        </div>

        {/* minimum size */}
        <div className="mt-20 md:mt-28">
          <SubHeader num="02.3" title={c.sizeTitle} lead={c.sizeLead} />
          <div className="mt-10"><MinimumSizeDemo /></div>
          <div className="mt-8"><PlateExplorer plates={set('minimum-size').plates} status="proposed" /></div>
        </div>

        {/* variants */}
        <div className="mt-20 md:mt-28">
          <SubHeader num="02.4" title={c.variantsTitle} lead={c.variantsLead} />
          <div className="mt-10"><LogoVariants /></div>
          <div className="mt-10"><PlateExplorer plates={set('variants').plates} status="proposed" /></div>
        </div>
      </div>
    </SectionShell>
  );
}
