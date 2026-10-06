'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PHOTOS, PHOTO_CATEGORIES, PHOTO_CREDITS, type PhotoCategory } from '@/content/data';
import { COPY } from '@/content/copy';
import { track } from '@/lib/analytics';
import { useLang } from '@/lib/i18n';
import { Segmented } from '../ui/Segmented';
import { Lightbox, type LightboxItem } from './Lightbox';
import { Photo } from './Photo';

const SPANS = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];

export function PhotographyGallery() {
  const { t } = useLang();
  const [cat, setCat] = useState<PhotoCategory>('architecture');
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => PHOTOS.filter((p) => p.category === cat), [cat]);
  const meta = PHOTO_CATEGORIES.find((c) => c.id === cat)!;
  const items: LightboxItem[] = list.map((p) => ({
    src: `/photo/${p.file}`,
    w: p.w,
    h: p.h,
    alt: t(p.alt),
    caption: p.caption,
    credit: t({ en: 'Wikimedia Commons · licensed, cropped for reference', ar: 'ويكيميديا كومنز · بترخيص مفتوح ومقتطعة للمرجعية' }),
  }));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Segmented scroll label={t({ en: 'Photography category', ar: 'فئة التصوير' })} value={cat} onChange={setCat} options={PHOTO_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))} />
        <p className="t-body-sm max-w-[40ch] text-ink-2" aria-live="polite">{t(meta.note)}</p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={cat}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
          className="mt-8 grid items-start gap-x-4 gap-y-8 md:grid-cols-12"
        >
          {list.map((p, i) => (
            <li key={p.file} className={i === list.length - 1 && i % 2 === 0 ? 'md:col-span-12' : SPANS[i % SPANS.length]}>
              <figure>
                <Photo
                  src={`/photo/${p.file}`}
                  w={p.w}
                  h={p.h}
                  alt={t(p.alt)}
                  focus={p.focus}
                  fill
                  className="h-[300px] w-full rounded-xl sm:h-[360px] md:h-[440px]"
                  sizes="(min-width: 768px) 55vw, 100vw"
                  onClick={() => { setOpen(i); track('photo_open', { photo: p.file }); }}
                >
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-14 text-[13px] font-medium text-white opacity-0 transition-[opacity,transform] duration-[220ms] ease-aq group-hover:translate-y-0 group-hover:opacity-100 md:block">
                    {t(p.caption)}
                  </span>
                </Photo>
                <figcaption className="t-caption mt-2 text-ink-3 md:hidden">{t(p.caption)}</figcaption>
              </figure>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <details className="group mt-12 border-t border-line-soft pt-5">
        <summary className="t-label flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-ink-2 hover:text-ink">
          <span>{t(COPY.ui.credits)}</span>
          <span aria-hidden="true" className="text-ink-3 transition-transform duration-[220ms] ease-aq group-open:rotate-45">+</span>
        </summary>
        <p className="t-body-sm mt-3 max-w-[70ch] text-ink-2">{t(COPY.ui.creditsNote)}</p>
        <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-[13px] sm:grid-cols-2 lg:grid-cols-3">
          {PHOTO_CREDITS.map((c) => (
            <li key={c.id} className="flex justify-between gap-3 border-b border-line-soft py-1.5"><span className="tabular-nums text-ink-3">{c.id}</span><span className="flex-1 truncate">{c.author}</span><span className="text-ink-3">{c.license}</span></li>
          ))}
        </ul>
      </details>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
