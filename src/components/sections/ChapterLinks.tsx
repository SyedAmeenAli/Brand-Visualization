'use client';

import Link from 'next/link';
import type { ComponentType } from 'react';
import { CHAPTERS, NAV } from '@/content/data';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { Photo } from '../gallery/Photo';
import { Reveal } from '../motion/Reveal';
import { ColourArt, IdentityArt, TypographyArt } from './ChapterArt';
import { SectionShell } from './SectionShell';

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="rtl:-scale-x-100">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const ART: Record<string, ComponentType<{ aspect?: string }>> = { identity: IdentityArt, typography: TypographyArt, colour: ColourArt };

/** Home: the seven chapters as an index of image cards. Each card is a page. */
export function ChapterIndex() {
  const { t } = useLang();
  return (
    <SectionShell id="chapters" band="ivory" label={t(COPY.index.title)}>
      <div className="container-x py-20 md:py-28">
        <div className="flex items-center gap-4">
          <span className="font-display text-[14px] tabular-nums text-ink-3" aria-hidden="true">02–11</span>
          <span className="h-px w-10 bg-line" aria-hidden="true" />
          <h2 className="t-eyebrow text-ink-3">{t(COPY.index.title)}</h2>
        </div>
        <p className="t-display mt-7 max-w-[22ch] text-balance">{t(COPY.index.lead)}</p>

        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {CHAPTERS.map((c, i) => {
            const wide = i === 0 || i === CHAPTERS.length - 1;
            const Art = ART[c.key];
            const nav = NAV.find((n) => n.key === c.key)!;
            return (
              <li key={c.key} className={wide ? 'lg:col-span-2' : undefined}>
                <Reveal delay={(i % 3) * 0.06}>
                  <Link href={nav.href} className="group block focus-visible:outline-offset-8">
                    {Art ? <Art aspect={wide ? 'aspect-[16/10] lg:aspect-[2/1]' : 'aspect-[4/3]'} /> : <Photo
                      src={`/photo/${c.image.file}`}
                      w={c.image.w}
                      h={c.image.h}
                      alt={t(c.image.alt)}
                      focus={c.image.focus}
                      fill
                      sizes={wide ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
                      className={`w-full rounded-2xl ${wide ? 'aspect-[16/10] lg:aspect-[2/1]' : 'aspect-[4/3]'}`}
                    />}
                    <div className="mt-5 flex items-start justify-between gap-6 border-t border-line-soft pt-4">
                      <div>
                        <p className="t-eyebrow text-ink-3"><span className="tabular-nums">{nav.num}</span></p>
                        <h3 className="t-h2 mt-1.5">{t(nav.label)}</h3>
                        <p className="t-body-sm mt-2 max-w-[46ch] text-ink-2">{t(c.blurb)}</p>
                      </div>
                      <span className="mt-6 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-[background-color,color,transform,border-color] duration-[220ms] ease-aq group-hover:border-brand group-hover:bg-brand group-hover:text-white group-active:scale-95">
                        <Arrow />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}

/** End of a chapter page: the next chapter, as a large quiet link. */
export function NextChapter({ current }: { current: string }) {
  const { t } = useLang();
  const list = NAV.filter((n) => n.key !== 'home');
  const idx = list.findIndex((n) => n.key === current);
  const next = list[(idx + 1) % list.length];
  const card = CHAPTERS.find((c) => c.key === next.key)!;
  const last = idx === list.length - 1;
  return (
    <SectionShell id="next" band="ivory" label={t(COPY.index.next)}>
      <div className="container-x py-16 md:py-24">
        <Link href={last ? '/' : next.href} className="group grid items-center gap-8 md:grid-cols-12 md:gap-12 focus-visible:outline-offset-8">
          <div className="order-2 md:order-1 md:col-span-7">
            <p className="t-eyebrow text-ink-3">{t(last ? COPY.index.back : COPY.index.next)}</p>
            <p className="t-display mt-4 text-balance transition-colors duration-[220ms] ease-aq group-hover:text-accent">
              <span className="me-4 font-display text-[0.5em] tabular-nums text-ink-3">{last ? '00' : next.num}</span>
              {t(last ? { en: 'Home', ar: 'الرئيسية' } : next.label)}
            </p>
            <p className="t-body mt-4 max-w-[48ch] text-ink-2">{t(card.blurb)}</p>
            <span className="btn btn-ghost mt-8 group-hover:border-brand">
              {t(COPY.index.open)} <Arrow />
            </span>
          </div>
          <div className="order-1 md:order-2 md:col-span-5">
            <Photo
              src={`/photo/${card.image.file}`}
              w={card.image.w}
              h={card.image.h}
              alt={t(card.image.alt)}
              focus={card.image.focus}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[16/10] w-full rounded-2xl md:aspect-[4/3]"
            />
          </div>
        </Link>
      </div>
    </SectionShell>
  );
}
