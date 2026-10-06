'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ELEVATION_TOKENS, RADIUS_TOKENS, SPACING_TOKENS } from '@/content/data';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';

/** Spacing, shown as architecture: a measured bar scale beside a box that takes the selected value as its inset. */
export function SpacingVisualizer() {
  const { t } = useLang();
  const [n, setN] = useState(6);
  const tok = SPACING_TOKENS.find((s) => s.n === n)!;
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ul className="lg:col-span-6" role="list">
        {SPACING_TOKENS.map((s) => (
          <li key={s.n}>
            <button
              type="button"
              aria-pressed={n === s.n}
              onClick={() => setN(s.n)}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setN(s.n); }}
              onFocus={() => setN(s.n)}
              className="group grid min-h-11 w-full grid-cols-[72px_1fr_56px] items-center gap-4 border-b border-line-soft py-2 text-start"
            >
              <span className="text-[12px] tabular-nums text-ink-3" dir="ltr">space.{s.n}</span>
              <span className="relative block h-3">
                <span className="absolute inset-y-0 start-0 block bg-brand transition-[opacity] duration-[120ms]" style={{ width: `${(s.px / 80) * 100}%`, opacity: n === s.n ? 1 : 0.35 }} />
                <span className="absolute -top-1 bottom-[-4px] block w-px bg-ink/60" style={{ insetInlineStart: `${(s.px / 80) * 100}%` }} aria-hidden="true" />
              </span>
              <span className={`text-end text-[13px] tabular-nums ${n === s.n ? 'text-ink' : 'text-ink-2'}`}>{s.px} px</span>
            </button>
          </li>
        ))}
        <li className="t-caption pt-3 text-ink-3">{t(COPY.visual.spacingHover)}</li>
      </ul>

      <div className="lg:col-span-6">
        <div className="relative rounded-xl border border-line-soft bg-bg-2 p-6 md:p-10" aria-live="polite">
          <p className="t-eyebrow text-ink-3">space.{n} = {tok.px} · {t(tok.use)}</p>
          <div className="relative mx-auto mt-14 w-full max-w-[340px]">
            {/* dimension lines */}
            <div className="absolute -top-3 start-0 h-px bg-brand/70 transition-[width] duration-[220ms] ease-aq" style={{ width: tok.px }} aria-hidden="true" />
            <span className="absolute -top-8 start-0 text-[11px] tabular-nums text-accent" aria-hidden="true">{tok.px}</span>
            <div className="border border-dashed border-brand/60 bg-surface/50 transition-[padding] duration-[220ms] ease-aq" style={{ padding: tok.px }}>
              <div className="bg-surface p-0 shadow-[var(--elev-1)]">
                <p className="t-eyebrow px-3 pt-3 text-success">{t(COPY.product.propertyTag)}</p>
                <p className="font-display px-3 pb-1 pt-2 text-[22px] font-semibold leading-[1.2]">{t(COPY.product.propertyName)}</p>
                <p className="t-body-sm px-3 pb-3 text-ink-2">{t(COPY.product.propertyLoc)}</p>
              </div>
            </div>
          </div>
          <p className="t-caption mt-6 text-ink-3">{t({ en: 'The dashed field is the inset; the line above measures it.', ar: 'الحقل المتقطع هو الحشوة، والخط أعلاه يقيسها.' })}</p>
        </div>
      </div>
    </div>
  );
}

/** Radius hierarchy from sharp architecture to softened containers. Not everything is a pill. */
export function RadiusVisualizer() {
  const { t } = useLang();
  const [hover, setHover] = useState<string | null>(null);
  const uses: { id: string; r: string; label: string; node: React.ReactNode }[] = [
    { id: 'lg', r: 'lg', label: t({ en: 'Button', ar: 'زر' }), node: <span className="grid min-h-12 w-full place-items-center bg-brand px-6 text-[14px] font-semibold text-white" style={{ borderRadius: 12 }}>{t(COPY.product.propertyCta)}</span> },
    { id: 'md', r: 'md', label: t({ en: 'Input', ar: 'حقل' }), node: <span className="block min-h-12 w-full border border-line bg-surface px-4 py-3 text-[14px] text-ink-3" style={{ borderRadius: 8 }}>{t({ en: 'Location, property type', ar: 'الموقع، نوع العقار' })}</span> },
    { id: 'xl', r: 'xl', label: t({ en: 'Card', ar: 'بطاقة' }), node: <span className="block w-full border border-line-soft bg-surface p-4 shadow-[var(--elev-1)]" style={{ borderRadius: 16 }}><span className="t-label block">{t(COPY.product.propertyLoc)}</span><span className="font-display mt-1 block text-[20px] font-semibold">{t(COPY.product.propertyPrice)}</span></span> },
    { id: 'hero', r: 'hero', label: t({ en: 'Sheet', ar: 'ورقة' }), node: <span className="block w-full border border-line-soft bg-elevated px-4 pb-8 pt-3 shadow-[var(--elev-3)]" style={{ borderRadius: '24px 24px 0 0' }}><span className="mx-auto mb-3 block h-1 w-9 rounded-full bg-line" /><span className="t-label block">{t(COPY.visual.sheetTitle)}</span></span> },
    { id: 'xxl', r: 'xxl', label: t({ en: 'Surface', ar: 'سطح' }), node: <span className="block w-full bg-bg-2 p-5 text-[14px] text-ink-2" style={{ borderRadius: 20 }}>{t({ en: 'Grouped content on a tonal surface', ar: 'محتوى مجمّع على سطح لوني' })}</span> },
    { id: 'none', r: 'none', label: t({ en: 'Image', ar: 'صورة' }), node: <span className="relative block h-24 w-full overflow-hidden" style={{ borderRadius: 0 }}><Image src="/photo/p05-3264x2448.webp" alt="" fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" style={{ objectPosition: '50% 55%' }} /></span> },
  ];
  return (
    <div>
      <ul className="grid grid-cols-4 gap-4 sm:grid-cols-7" role="list">
        {RADIUS_TOKENS.map((r) => (
          <li key={r.id} onPointerEnter={() => setHover(r.id)} onPointerLeave={() => setHover(null)}>
            <span className={`grid aspect-square place-items-center border-2 bg-bg-2 transition-colors duration-[220ms] ${hover === r.id ? 'border-brand bg-brand/10 text-accent' : 'border-line text-ink-3'}`} style={{ borderRadius: r.px }} aria-hidden="true"><span className="font-display text-[clamp(18px,2.2vw,30px)] tabular-nums">{r.px}</span></span>
            <p className="t-label mt-2 tabular-nums">{r.px} px</p>
            <p className="t-caption text-ink-3" dir="ltr">radius/{r.id}</p>
          </li>
        ))}
      </ul>
      <p className="t-caption mt-4 text-ink-3">{t({ en: 'Token values bound on native shapes. Pills are reserved for status.', ar: 'قيم الرموز مطبقة على الأشكال الأصلية. الأشكال الحبيّة للحالات فقط.' })}</p>
      <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {uses.map((u) => (
          <li key={u.id} onPointerEnter={() => setHover(u.r)} onPointerLeave={() => setHover(null)}>
            <div className="flex min-h-[88px] items-end">{u.node}</div>
            <p className="t-caption mt-3 flex justify-between text-ink-3"><span>{u.label}</span><span dir="ltr">radius/{u.r}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Elevation: surface contrast first, then four restrained shadows. */
export function ElevationDemo() {
  const { t } = useLang();
  const shadow = (id: string) => (id === 'none' ? 'none' : `var(--elev-${id})`);
  const demos = [
    { id: 'none', title: t({ en: 'Flat', ar: 'مسطح' }), body: <><p className="t-label">{t({ en: 'Property details', ar: 'تفاصيل العقار' })}</p><p className="t-body-sm mt-1 text-ink-2">{t(COPY.product.propertyLoc)}</p><p className="font-display mt-3 text-[22px] font-semibold">{t(COPY.product.propertyPrice)}</p></> , cls: 'border border-line-soft bg-bg rounded-none' },
    { id: '1', title: t({ en: 'Level 1', ar: 'المستوى 1' }), body: <><span className="t-eyebrow text-success">{t(COPY.product.propertyTag)}</span><p className="t-label mt-2">{t(COPY.product.propertyName)}</p><p className="t-caption mt-1 text-ink-3">{t(COPY.product.propertyFacts)}</p></>, cls: 'bg-surface rounded-2xl' },
    { id: '2', title: t({ en: 'Level 2', ar: 'المستوى 2' }), body: <p className="t-body-sm flex items-center gap-3 text-ink-3"><span className="h-3 w-3 rounded-full border border-ink-3" aria-hidden="true" />{t({ en: 'Search properties', ar: 'ابحث عن عقار' })}</p>, cls: 'bg-surface rounded-xl py-4' },
    { id: '3', title: t({ en: 'Level 3', ar: 'المستوى 3' }), body: <><span className="mx-auto mb-3 block h-1 w-9 rounded-full bg-line" /><p className="t-label">{t(COPY.visual.sheetTitle)}</p><p className="t-caption mt-1 text-ink-2">{t(COPY.visual.sheetBody)}</p></>, cls: 'bg-elevated rounded-t-[24px] pb-10' },
  ];
  return (
    <div className="rounded-xl bg-bg-2 p-6 md:p-10">
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" role="list">
        {demos.map((d) => {
          const tok = ELEVATION_TOKENS.find((x) => x.id === d.id)!;
          return (
            <li key={d.id} className="flex flex-col">
              <div className="flex min-h-[200px] items-center">
                <div className={`w-full p-5 transition-shadow duration-[220ms] ease-aq ${d.cls}`} style={{ boxShadow: shadow(d.id) }}>{d.body}</div>
              </div>
              <p className="t-label mt-5">{d.title}</p>
              <p className="t-caption mt-1 text-ink-3" dir="ltr">elevation.{d.id === 'none' ? 'none' : d.id} · Y {tok.y} · blur {tok.blur} · {tok.opacity}%</p>
              <p className="t-caption mt-1 text-ink-2">{t(tok.use)}</p>
            </li>
          );
        })}
      </ul>
      <p className="t-caption mt-8 text-ink-3">{t(COPY.ui.proposed)}</p>
    </div>
  );
}
