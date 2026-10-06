'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BRAND_COLOURS, NEUTRAL_COLOURS, SEMANTIC_COLOURS, type Swatch } from '@/content/data';
import { COPY } from '@/content/copy';
import { contrast, hexToRgb, readableOn, rgbToHsl } from '@/lib/color';
import { track } from '@/lib/analytics';
import { useLang } from '@/lib/i18n';
import { StatusBadge } from '../sections/SectionShell';

function Field({ s, active, onSelect, className = '', tall = false }: { s: Swatch; active: boolean; onSelect: (s: Swatch) => void; className?: string; tall?: boolean }) {
  const { t } = useLang();
  const ink = readableOn(s.hex);
  const split = Boolean(s.dark);
  return (
    <button
      type="button"
      onClick={() => onSelect(s)}
      aria-pressed={active}
      aria-label={`${t(s.name)} ${s.hex}`}
      data-cursor="colour"
      className={`group relative flex min-w-0 flex-col overflow-hidden text-start transition-[flex-grow,transform] duration-[360ms] ease-aq focus-visible:z-10 ${active ? 'ring-2 ring-inset ring-[rgb(var(--text))]' : ''} ${tall ? 'h-44 md:h-[min(62vh,560px)]' : 'h-72 md:h-72'} ${className}`}
      style={{ backgroundColor: s.hex, color: ink }}
    >
      {split && <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: s.dark }} />}
      <span className={`relative z-10 flex flex-col justify-between p-4 md:p-5 ${split ? 'h-1/2' : 'flex-1'}`}>
        <span className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1.5">
          <span className="t-eyebrow min-w-0 break-words opacity-80" style={{ color: ink }}>{s.token}</span>
          {s.status === 'measured' && <span className="shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em]" style={{ borderColor: 'currentColor', opacity: 0.7 }}>{t({ en: 'Measured', ar: 'مقاس' })}</span>}
        </span>
        <span className="block">
          <span className={`block font-display ${tall ? 'text-[clamp(30px,3.4vw,52px)]' : 'text-[18px] md:text-[20px] lg:text-[22px]'} break-words leading-[1.15]`}>{t(s.name)}</span>
          <span className="mt-1.5 block text-[13px] tabular-nums opacity-90" dir="ltr">{s.hex}</span>
          {!split && <span className={`mt-3 block max-w-[28ch] overflow-hidden text-[13px] leading-[18px] opacity-0 transition-[opacity,max-height] duration-[220ms] ease-aq group-hover:opacity-90 group-focus-visible:opacity-90 ${active ? 'opacity-90' : ''}`} style={{ maxHeight: 54 }}>{t(s.role)}</span>}
        </span>
      </span>
      {split && (
        <span className="relative z-10 flex h-1/2 flex-col justify-end p-4 md:p-5" style={{ color: readableOn(s.dark!) }}>
          <span className="t-eyebrow opacity-80">{t(COPY.ui.dark)}</span>
          <span className="mt-1 block text-[13px] tabular-nums" dir="ltr">{s.dark}</span>
        </span>
      )}
    </button>
  );
}

function Detail({ s }: { s: Swatch }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const rgb = hexToRgb(s.hex);
  const hsl = rgbToHsl(rgb);
  const copy = async () => {
    try { await navigator.clipboard.writeText(s.hex); setCopied(true); window.setTimeout(() => setCopied(false), 1400); } catch { /* clipboard unavailable */ }
  };
  const onIvory = contrast(s.hex, '#ECE3D7').toFixed(2);
  const onInk = contrast(s.hex, '#2D2823').toFixed(2);
  return (
    <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }} className="grid gap-8 border-t border-line-soft pt-8 md:grid-cols-12">
      <div className="md:col-span-4">
        <span className="block h-28 w-full rounded-lg border border-line-soft" style={{ backgroundColor: s.hex }} aria-hidden="true" />
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-display text-[34px] leading-none">{t(s.name)}</p>
          <StatusBadge status={s.status} />
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-5 text-[14px] md:col-span-5">
        <div><dt className="t-eyebrow text-ink-3">HEX</dt><dd className="mt-1 tabular-nums" dir="ltr">{s.hex}{s.dark ? <span className="text-ink-3"> / {s.dark}</span> : null}</dd></div>
        <div><dt className="t-eyebrow text-ink-3">RGB</dt><dd className="mt-1 tabular-nums" dir="ltr">{rgb.join(', ')}</dd></div>
        <div><dt className="t-eyebrow text-ink-3">HSL</dt><dd className="mt-1 tabular-nums" dir="ltr">{hsl[0]}°, {hsl[1]}%, {hsl[2]}%</dd></div>
        <div><dt className="t-eyebrow text-ink-3">Token</dt><dd className="mt-1" dir="ltr">{s.token}</dd></div>
        <div className="col-span-2"><dt className="t-eyebrow text-ink-3">{t(COPY.colour.role)}</dt><dd className="mt-1">{t(s.role)}</dd></div>
      </dl>
      <div className="md:col-span-3">
        <p className="t-eyebrow text-ink-3">{t(COPY.colour.contrastLabel)}</p>
        <p className="mt-3 flex justify-between border-b border-line-soft pb-2 text-[14px]"><span>{t({ en: 'Ivory', ar: 'العاجي' })}</span><span className="tabular-nums">{onIvory} : 1</span></p>
        <p className="mt-2 flex justify-between border-b border-line-soft pb-2 text-[14px]"><span>{t({ en: 'Deep ink', ar: 'الحبر الداكن' })}</span><span className="tabular-nums">{onInk} : 1</span></p>
        <button type="button" onClick={copy} className="chip mt-5" aria-live="polite">{copied ? t(COPY.ui.copy) : t(COPY.colour.copyHex)}</button>
      </div>
    </motion.div>
  );
}

/** Large physical colour fields. Hover expands a field, click focuses it and reveals HEX, RGB and role. */
export function ColorGallery() {
  const { t } = useLang();
  const [sel, setSel] = useState<Swatch>(BRAND_COLOURS[0]);
  const onSelect = (s: Swatch) => { setSel(s); track('colour_select', { colour: s.id, hex: s.hex }); };
  const row = (list: Swatch[], tall = false) => (
    <div className={`flex flex-col md:flex-row ${tall ? 'md:items-stretch' : ''}`}>
      {list.map((s) => (
        <Field key={s.id} s={s} active={sel.id === s.id} onSelect={onSelect} tall={tall} className="md:flex-1 md:hover:flex-[1.35] md:focus-visible:flex-[1.35]" />
      ))}
    </div>
  );
  return (
    <div className="space-y-16 md:space-y-24">
      <div>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2"><h3 className="t-h2">{t(COPY.colour.brand)}</h3><p className="t-body-sm text-ink-2">{t(COPY.colour.brandNote)}</p></div>
        {row(BRAND_COLOURS, true)}
      </div>
      <div>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2"><h3 className="t-h2">{t(COPY.colour.ui)}</h3><p className="t-body-sm text-ink-2">{t(COPY.colour.uiNote)}</p></div>
        {row(NEUTRAL_COLOURS)}
        <p className="t-caption mt-3 text-ink-3">{t({ en: 'Each field shows the light value above and the dark-theme value below.', ar: 'يعرض كل حقل القيمة الفاتحة أعلاه والقيمة الداكنة أسفله.' })}</p>
      </div>
      <div>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2"><h3 className="t-h2">{t(COPY.colour.semantic)}</h3><p className="t-body-sm text-ink-2">{t(COPY.colour.semanticNote)}</p></div>
        {row(SEMANTIC_COLOURS)}
      </div>
      <div aria-live="polite">
        <p className="t-eyebrow mb-4 text-ink-3">{t(COPY.colour.hint)}</p>
        <AnimatePresence mode="wait" initial={false}><Detail key={sel.id} s={sel} /></AnimatePresence>
      </div>
    </div>
  );
}
