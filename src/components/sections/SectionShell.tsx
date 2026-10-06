'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { L } from '@/lib/i18n';
import { useLang } from '@/lib/i18n';
import { CHAPTERS } from '@/content/data';
import { Photo } from '../gallery/Photo';
import { ColourArt, IdentityArt, TypographyArt } from './ChapterArt';
import { ClipReveal, MaskLine, Reveal } from '../motion/Reveal';

export type Band = 'light' | 'ivory' | 'dark';

/** A chapter of the experience. `band` sets the room: paper, ivory plaster or deep warm neutral. */
export function SectionShell({
  id,
  band = 'light',
  children,
  className = '',
  label,
}: {
  id: string;
  band?: Band;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const data = band === 'light' ? undefined : band;
  return (
    <section
      id={id}
      data-band={data}
      data-section
      aria-label={label}
      className={`relative bg-bg text-ink transition-colors duration-[360ms] ease-aq ${className}`}
    >
      {children}
    </section>
  );
}

/** Page header: chapter number, title, lead and a wide photographic banner. One h1 per page. */
export function ChapterHeader({ num, title, lead, eyebrow, chapter }: { num: string; title: L; lead?: L; eyebrow?: L; chapter?: string }) {
  const { t } = useLang();
  const card = CHAPTERS.find((c) => c.key === chapter);
  const art = chapter === 'identity' ? <IdentityArt /> : chapter === 'typography' ? <TypographyArt /> : chapter === 'colour' ? <ColourArt /> : null;
  return (
    <header className="pb-14 pt-24 md:pb-20 md:pt-32">
      <div className="flex items-center gap-4">
        <span className="font-display text-[14px] tabular-nums text-ink-3" aria-hidden="true">{num}</span>
        <span className="h-px w-10 bg-line" aria-hidden="true" />
        <span className="t-eyebrow text-ink-3">{t(eyebrow ?? title)}</span>
      </div>
      <div className="mt-7 grid grid-cols-12 items-end gap-x-8 gap-y-6">
        <h1 className="t-display col-span-12 text-balance lg:col-span-7">
          <MaskLine>{t(title)}</MaskLine>
        </h1>
        {lead && (
          <Reveal delay={0.1} className="col-span-12 lg:col-span-5 lg:pb-1">
            <p className="t-body-lg max-w-[56ch] text-ink-2">{t(lead)}</p>
          </Reveal>
        )}
      </div>
      {art && <ClipReveal className="mt-10 md:mt-14">{art}</ClipReveal>}
      {card && !art && (
        <ClipReveal className="mt-10 md:mt-14">
          <Photo
            src={`/photo/${card.image.file}`}
            w={card.image.w}
            h={card.image.h}
            alt={t(card.image.alt)}
            focus={card.image.focus}
            interactive={false}
            fill
            priority
            sizes="(min-width: 1560px) 1400px, 92vw"
            className="aspect-[16/10] w-full rounded-2xl sm:aspect-[2/1] md:aspect-[21/9] md:rounded-[20px]"
          />
        </ClipReveal>
      )}
      <ChapterToc />
    </header>
  );
}

/** In-page index: chips that jump to each numbered sub-chapter on the page. Built from the DOM so it follows the language. */
export function ChapterToc() {
  const { lang } = useLang();
  const [items, setItems] = useState<{ id: string; num: string; title: string }[]>([]);
  useEffect(() => {
    const read = () =>
      setItems(
        Array.from(document.querySelectorAll<HTMLElement>('[data-sub][id]')).map((el) => ({
          id: el.id,
          num: el.querySelector('.tabular-nums')?.textContent?.trim() ?? '',
          title: el.querySelector('h2')?.textContent?.trim() ?? '',
        })),
      );
    read();
    const tm = window.setTimeout(read, 60);
    return () => window.clearTimeout(tm);
  }, [lang]);
  if (items.length < 2) return null;
  return (
    <nav aria-label={lang === 'ar' ? 'في هذا الفصل' : 'In this chapter'} className="no-scrollbar -mx-1 mt-10 flex gap-2 overflow-x-auto px-1 pb-1 md:mt-12">
      {items.map((it) => (
        <a key={it.id} href={`#${it.id}`} className="chip shrink-0 gap-2.5 whitespace-nowrap">
          <span className="tabular-nums opacity-60">{it.num}</span>
          {it.title}
        </a>
      ))}
    </nav>
  );
}

/** Sub-chapter header used inside a chapter. */
export function SubHeader({ num, title, lead, className = '' }: { num?: string; title: L; lead?: L; className?: string }) {
  const { t } = useLang();
  return (
    <div id={num ? `s-${num.replace(/\./g, '-')}` : undefined} data-sub className={`grid scroll-mt-24 grid-cols-12 gap-x-6 gap-y-4 ${className}`}>
      <div className="col-span-12 md:col-span-3">
        {num && (
          <span className="t-eyebrow text-ink-3">
            <span className="tabular-nums">{num}</span>
            <span className="mx-3 inline-block h-px w-6 translate-y-[-3px] bg-line align-middle" aria-hidden="true" />
          </span>
        )}
      </div>
      <div className="col-span-12 md:col-span-9">
        <h2 className="t-h1 text-balance">{t(title)}</h2>
        {lead && <p className="t-body-lg mt-4 max-w-[60ch] text-ink-2">{t(lead)}</p>}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: 'measured' | 'proposed' }) {
  const { t } = useLang();
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-line-soft px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-ink-2">
      <span className={`h-1.5 w-1.5 rounded-full ${status === 'measured' ? 'bg-success' : 'bg-warning'}`} aria-hidden="true" />
      {status === 'measured'
        ? t({ en: 'Measured from artwork', ar: 'مقاس من العمل الفني' })
        : t({ en: 'Proposed · requires brand approval', ar: 'مقترح · يتطلب اعتماد العلامة' })}
    </span>
  );
}
