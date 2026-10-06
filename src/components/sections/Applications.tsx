'use client';

import Image from 'next/image';
import { useState } from 'react';
import { COPY } from '@/content/copy';
import { SPLASH } from '@/content/data';
import { useLang } from '@/lib/i18n';
import { BrandLogo, BrandSymbol } from '../brand/BrandLogo';
import { PlateExplorer, type PlateRef } from '../gallery/PlateExplorer';
import { Photo } from '../gallery/Photo';
import { Reveal } from '../motion/Reveal';
import { StatusBadge } from './SectionShell';
import { ChapterHeader, SectionShell, SubHeader } from './SectionShell';

const ICON_PLATES: PlateRef[] = [
  { id: 'appicon-final', title: { en: 'Final candidate', ar: 'المرشح النهائي' } },
  { id: 'appicon-small', title: { en: 'Small sizes', ar: 'الأحجام الصغيرة' } },
  { id: 'appicon-light', title: { en: 'Light background', ar: 'خلفية فاتحة' } },
  { id: 'appicon-dark', title: { en: 'Dark background', ar: 'خلفية داكنة' } },
];

/** A launch screen composed live from the exact master symbol and the Figma surface tokens. */
function SplashPhone({ tone, active }: { tone: 'ivory' | 'dark' | 'paper'; active: boolean }) {
  const dark = tone === 'dark';
  const bg = dark ? 'bg-bg' : tone === 'ivory' ? 'bg-bg-2' : 'bg-bg';
  return (
    <div data-band={dark ? 'dark' : undefined} className={`relative aspect-[9/19.5] w-full overflow-hidden rounded-[28px] ${bg} shadow-[var(--elev-3)] ring-1 ring-line`}>
      <div className="absolute inset-x-[38%] top-2.5 h-1.5 rounded-full bg-ink/15" aria-hidden="true" />
      <div className="absolute inset-0 grid place-items-center">
        <BrandSymbol className={`h-auto ${tone === 'paper' ? 'w-[46%]' : 'w-[40%]'}`} decorative tone={dark ? 'reverse' : 'mocha'} />
      </div>
      <div className="absolute inset-x-[30%] bottom-[9%] h-px overflow-hidden bg-line" aria-hidden="true">
        <span className={`block h-full bg-brand transition-[width] duration-[1200px] ease-aq ${active ? 'w-full' : 'w-1/3'}`} style={{ transitionDuration: '1200ms' }} />
      </div>
    </div>
  );
}

function SplashStudy() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const s = SPLASH[i];
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <ul role="tablist" aria-label={t(COPY.applications.splashTitle)} className="border-t border-line-soft">
          {SPLASH.map((x, n) => (
            <li key={x.file}>
              <button role="tab" aria-selected={n === i} onClick={() => setI(n)} className={`flex min-h-14 w-full items-baseline gap-4 border-b border-line-soft py-3 text-start transition-colors duration-[120ms] ${n === i ? 'text-ink' : 'text-ink-3 hover:text-ink-2'}`}>
                <span className="font-display text-[13px] tabular-nums">{String(n + 1).padStart(2, '0')}</span>
                <span className="t-h2 font-normal">{t(x.label)}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="t-body-sm mt-5 text-ink-2" aria-live="polite">{t(s.note)}</p>
        <div className="mt-5"><StatusBadge status="proposed" /></div>
      </div>
      <div className="grid grid-cols-3 items-end gap-4 lg:col-span-8">
        {SPLASH.map((x, n) => (
          <button key={x.file} type="button" onClick={() => setI(n)} aria-label={t(x.label)} aria-pressed={n === i} className={`transition-[transform,opacity] duration-[360ms] ease-aq ${n === i ? 'scale-100' : 'scale-[0.96] hover:scale-[0.98]'}`}>
            <SplashPhone tone={n === 1 ? 'dark' : n === 2 ? 'paper' : 'ivory'} active={n === i} />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Illustrative studies composed from approved assets only (real logo, symbol, tokens, photography). */
function Studies() {
  const { t } = useLang();
  const c = COPY.applications;
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* web header */}
      <figure className="lg:col-span-7">
        <div className="overflow-hidden rounded-xl border border-line-soft bg-bg shadow-[var(--elev-1)]">
          <div className="flex items-center gap-1.5 border-b border-line-soft px-4 py-2.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" />
          </div>
          <div className="flex items-center justify-between gap-6 px-6 py-4">
            <BrandSymbol className="h-9 w-auto" label="AQARATI" />
            <ul className="hidden gap-7 text-[13px] font-medium text-ink-2 sm:flex">{c.webNav.map((n, i) => <li key={i}>{t(n)}</li>)}</ul>
            <span className="rounded-lg bg-brand px-4 py-2 text-[13px] font-semibold text-white">{t(COPY.product.propertyCta)}</span>
          </div>
          <Photo src="/photo/p20-1895x1272.webp" w={1895} h={1272} alt={t({ en: 'White residential buildings below a mountain ridge.', ar: 'مبانٍ سكنية بيضاء أسفل سلسلة جبلية.' })} sizes="60vw" className="aspect-[16/7] w-full" fill interactive={false}>
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden="true" />
            <span className="font-display absolute bottom-5 start-6 text-[clamp(24px,3.2vw,40px)] leading-[1.15] text-white">{t(COPY.hero.line1)}<br />{t(COPY.hero.line2)}</span>
          </Photo>
        </div>
        <figcaption className="t-caption mt-3 text-ink-3">{t(c.web)} · {t(c.studiesNote)}</figcaption>
      </figure>

      {/* letterhead */}
      <figure className="lg:col-span-5">
        <div className="mx-auto w-full max-w-[420px] rounded-sm border border-line-soft bg-surface p-8 shadow-[var(--elev-2)] md:p-10" style={{ aspectRatio: '1 / 1.414', ['--logo-k' as string]: 'var(--surface)' }}>
          <BrandLogo tone="mocha" className="h-auto w-[104px]" label="AQARATI" />
          <div className="mt-10">
            <p className="t-eyebrow text-ink-3">{t(c.docMeta)}</p>
            <h3 className="font-display mt-3 text-[24px] font-semibold leading-[1.2]">{t(c.docTitle)}</h3>
            <p className="t-body-sm mt-4 text-ink-2">{t(c.docBody)}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-line-soft pt-5 text-[12px]">
              {[
                [t({ en: 'Property', ar: 'العقار' }), t(COPY.product.propertyName)],
                [t({ en: 'Location', ar: 'الموقع' }), t(COPY.product.propertyLoc)],
                [t({ en: 'Status', ar: 'الحالة' }), t({ en: 'Request recorded', ar: 'تم تسجيل الطلب' })],
                [t({ en: 'Next step', ar: 'الخطوة التالية' }), t({ en: 'Availability confirmation', ar: 'تأكيد التوفر' })],
              ].map(([k, v]) => (
                <div key={k}><dt className="t-eyebrow text-ink-3">{k}</dt><dd className="mt-1 text-ink">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="mt-8 flex items-end justify-between gap-4 border-t border-line-soft pt-4">
            <p className="t-caption text-ink-3">{t(COPY.site.tagline)}</p>
            <BrandSymbol className="h-6 w-auto opacity-80" decorative tone="mocha" />
          </div>
        </div>
        <figcaption className="t-caption mt-3 text-center text-ink-3">{t(c.document)} · {t(c.studiesNote)}</figcaption>
      </figure>

      {/* social profile */}
      <figure className="lg:col-span-12">
        <div className="overflow-hidden rounded-xl border border-line-soft bg-bg-2">
          <div className="relative h-36 md:h-52">
            <Image src="/photo/p19-5184x3888.webp" alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: '50% 40%' }} />
            <span className="absolute inset-0 bg-[rgb(var(--bg-2)/0.28)]" aria-hidden="true" />
          </div>
          <div className="flex flex-wrap items-end gap-5 px-6 pb-6 md:px-10">
            <span className="relative z-10 -mt-12 grid h-24 w-24 shrink-0 place-items-center rounded-[22px] border-4 border-bg-2 bg-bg-2 shadow-[var(--elev-1)] md:-mt-14 md:h-28 md:w-28">
              <BrandSymbol className="h-[58%] w-auto" label="AQARATI" />
            </span>
            <div className="min-w-0 flex-1 pt-3">
              <p className="font-display text-[22px] font-semibold">{t({ en: 'Your property journey', ar: 'رحلتك العقارية' })}</p>
              <p className="t-body-sm text-ink-2">{t(c.socialLine)}</p>
            </div>
          </div>
        </div>
        <figcaption className="t-caption mt-3 text-ink-3">{t(c.social)} · {t(c.studiesNote)}</figcaption>
      </figure>
    </div>
  );
}

export function Applications() {
  const { t } = useLang();
  const c = COPY.applications;
  return (
    <SectionShell id="applications" band="light" label={t(c.title)}>
      <div className="container-x pb-20 md:pb-28">
        <ChapterHeader num={c.num} title={c.title} lead={c.lead} chapter="applications" />

        <SubHeader num="10.1" title={c.iconTitle} lead={c.iconLead} />
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <div className="flex max-w-full flex-wrap items-end gap-x-3 gap-y-3 sm:gap-4" aria-label={t(c.iconSizes)}>
            {[96, 64, 40, 24, 16].map((px) => (
              <span key={px} className="grid shrink-0 place-items-center bg-bg-2 shadow-[var(--elev-1)]" style={{ width: px, height: px, borderRadius: Math.round(px * 0.22) }}>
                <BrandSymbol className="h-[58%] w-auto" decorative tone="mocha" />
              </span>
            ))}
          </div>
          <StatusBadge status="proposed" />
        </div>
        <p className="t-caption mt-2 text-ink-3">{t(c.iconStatus)}</p>
        <div className="mt-8"><PlateExplorer plates={ICON_PLATES} /></div>

        <div className="mt-20 md:mt-28">
          <SubHeader num="10.2" title={c.splashTitle} lead={c.splashLead} />
          <div className="mt-12"><Reveal><SplashStudy /></Reveal></div>
          <p className="t-caption mt-6 text-ink-3">{t(c.splashStatus)}</p>
        </div>

        <div className="mt-20 md:mt-28">
          <SubHeader num="10.3" title={c.studiesTitle} lead={c.studiesLead} />
          <div className="mt-12"><Studies /></div>
        </div>
      </div>
    </SectionShell>
  );
}
