'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import platesData from '@/content/plates.json';
import { useLang, type L } from '@/lib/i18n';
import { COPY } from '@/content/copy';
import { track } from '@/lib/analytics';
import { Lightbox, type LightboxItem } from './Lightbox';
import { StatusBadge } from '../sections/SectionShell';

export type PlateRef = { id: string; title: L };
const PLATES = platesData as Record<string, { w: number; h: number; src: string }>;

/** A plate is a crop of the Figma artboard, shown at source fidelity. Thumbnails below, keyboard arrows to move. */
export function PlateExplorer({ plates, status, lead, folder = 'plates' }: { plates: PlateRef[]; status?: 'measured' | 'proposed'; lead?: L; folder?: string }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => setI(0), [plates]);

  const items: LightboxItem[] = useMemo(
    () => plates.map((p) => ({ src: `/${folder}/${p.id}.webp`, w: PLATES[p.id]?.w ?? 2448, h: PLATES[p.id]?.h ?? 1418, alt: t(p.title), caption: p.title })),
    [plates, folder, t],
  );

  const select = useCallback((n: number) => {
    setI(n);
    track('plate_select', { plate: plates[n]?.id });
  }, [plates]);

  const cur = plates[i] ?? plates[0];
  const meta = PLATES[cur.id];
  const onKey = (e: React.KeyboardEvent) => {
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'ArrowRight') select((i + (rtl ? -1 : 1) + plates.length) % plates.length);
    if (e.key === 'ArrowLeft') select((i + (rtl ? 1 : -1) + plates.length) % plates.length);
  };

  return (
    <div onKeyDown={onKey}>
      {(status || lead) && (
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {lead && <p className="t-body-lg max-w-[62ch] text-ink-2">{t(lead)}</p>}
          {status && <div className="shrink-0"><StatusBadge status={status} /></div>}
        </div>
      )}

      <div className="relative overflow-hidden rounded-xl border border-line-soft bg-bg-2" data-cursor="image" data-cursor-label={t(COPY.ui.zoom)}>
        <button type="button" onClick={() => setOpen(i)} className="block w-full" aria-label={`${t(COPY.ui.zoom)}: ${t(cur.title)}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.992 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
              style={{ aspectRatio: `${meta?.w ?? 2448} / ${meta?.h ?? 1418}` }}
              className="relative w-full"
            >
              <Image src={`/${folder}/${cur.id}.webp`} alt={t(cur.title)} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-contain" />
            </motion.div>
          </AnimatePresence>
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[rgb(var(--bg-2)/0.9)] to-transparent px-5 pb-4 pt-12">
          <p className="t-label text-ink"><span className="tabular-nums text-ink-3">{String(i + 1).padStart(2, '0')} / {String(plates.length).padStart(2, '0')}</span>&nbsp;&nbsp;{t(cur.title)}</p>
          <p className="t-caption hidden text-ink-3 sm:block">{t(COPY.ui.source)}: Figma · {PLATES[cur.id]?.src?.replace(/\.pdf$/, '')}</p>
        </div>
      </div>

      <div role="tablist" aria-label={t(COPY.ui.zoom)} className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {plates.map((p, n) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={n === i}
            onClick={() => select(n)}
            className="chip shrink-0 gap-2.5 whitespace-nowrap active:scale-[0.97]"
          >
            <span className="tabular-nums opacity-70">{String(n + 1).padStart(2, '0')}</span>
            {t(p.title)}
          </button>
        ))}
      </div>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={(n) => { setOpen(n); setI(n); }} />
    </div>
  );
}
