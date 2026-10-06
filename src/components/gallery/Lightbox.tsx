'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang, type L } from '@/lib/i18n';
import { COPY } from '@/content/copy';

export type LightboxItem = { src: string; w: number; h: number; alt: string; caption?: L; credit?: string };

/** Keyboard-accessible immersive view: Esc closes, arrows navigate, focus is trapped and restored. */
export function Lightbox({ items, index, onClose, onIndex }: { items: LightboxItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;

  const go = useCallback((d: number) => {
    if (index === null) return;
    onIndex((index + d + items.length) % items.length);
  }, [index, items.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(document.documentElement.dir === 'rtl' ? -1 : 1);
      else if (e.key === 'ArrowLeft') go(document.documentElement.dir === 'rtl' ? 1 : -1);
      else if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('button');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [open, onClose, go]);

  const item = index !== null ? items[index] : null;
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.caption ? t(item.caption) : item.alt}
          className="fixed inset-0 z-[80] flex flex-col bg-[rgb(20_17_15/0.94)] text-[#F4EEE6]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="t-body-sm text-[#C8BCAD]">
              <span className="tabular-nums">{String((index ?? 0) + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
            </p>
            <button ref={closeRef} onClick={onClose} className="min-h-11 min-w-11 rounded-lg border border-white/20 px-4 text-sm font-medium transition-colors hover:bg-white/10" aria-label={t(COPY.ui.close)}>
              {t(COPY.ui.close)} · Esc
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-16" onClick={(e) => e.stopPropagation()}>
            {items.length > 1 && (
              <button onClick={() => go(-1)} aria-label={t(COPY.ui.prev)} className="absolute start-2 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/30 transition-colors hover:bg-white/15 md:start-6">
                <span aria-hidden="true" className="rtl:rotate-180">←</span>
              </button>
            )}
            <motion.div key={item.src} initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }} className="relative max-h-full max-w-full">
              <Image src={item.src} alt={item.alt} width={item.w} height={item.h} sizes="100vw" className="max-h-[78vh] w-auto max-w-full object-contain" priority />
            </motion.div>
            {items.length > 1 && (
              <button onClick={() => go(1)} aria-label={t(COPY.ui.next)} className="absolute end-2 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/30 transition-colors hover:bg-white/15 md:end-6">
                <span aria-hidden="true" className="rtl:rotate-180">→</span>
              </button>
            )}
          </div>
          <div className="px-5 py-5 text-center md:px-8" onClick={(e) => e.stopPropagation()}>
            {item.caption && <p className="t-label-lg">{t(item.caption)}</p>}
            {item.credit && <p className="t-caption mt-1 text-[#A99C8C]">{item.credit}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
