'use client';

import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { Photo } from '../gallery/Photo';
import { ClipReveal, MaskLine, Reveal } from '../motion/Reveal';
import { SectionShell } from './SectionShell';

export function Essence() {
  const { t } = useLang();
  const c = COPY.essence;
  return (
    <SectionShell id="brand" band="light" label={t(c.title)}>
      <div className="container-x py-20 md:py-28">
        <div className="flex items-center gap-4">
          <span className="font-display text-[15px] tabular-nums text-ink-3" aria-hidden="true">{c.num}</span>
          <span className="h-px w-10 bg-line" aria-hidden="true" />
          <h2 className="t-eyebrow text-ink-3">{t(c.title)}</h2>
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-8 gap-y-14 md:gap-y-20">
          {/* the three words */}
          <div className="col-span-12 md:col-span-7">
            <p className="sr-only">{c.words.map((w) => t(w)).join(', ')}</p>
            <ul aria-hidden="true" className="relative">
              {c.words.map((w, i) => (
                <li key={i} className="relative flex items-baseline gap-5 border-t border-line-soft py-3 md:gap-8" style={{ paddingInlineStart: `${i * 5}%` }}>
                  <span className="w-5 shrink-0 font-display text-[13px] tabular-nums text-ink-3">0{i + 1}</span>
                  <span className="font-display text-ink" style={{ fontSize: 'clamp(40px, 6.4vw, 92px)', lineHeight: 1.05, fontWeight: 400, letterSpacing: '-0.015em' }}>
                    <MaskLine delay={i * 0.12}>{t(w)}</MaskLine>
                  </span>
                </li>
              ))}
              <li className="border-t border-line-soft" />
            </ul>
            <Reveal delay={0.1} className="mt-10 max-w-[56ch]">
              <p className="t-body-lg text-ink-2">{t(c.lead)}</p>
            </Reveal>
          </div>

          {/* photograph */}
          <div className="col-span-12 md:col-span-5">
            <ClipReveal>
              <Photo src="/photo/p19-1920x1731.webp" w={1800} h={1623} fill focus="50% 55%" alt={t({ en: 'A modern two-storey house with a timber garage door and glazed upper floor.', ar: 'منزل عصري من طابقين ببوابة جراج خشبية وطابق علوي زجاجي.' })} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5] w-full rounded-2xl sm:aspect-[4/3] md:aspect-[4/5]" priority />
            </ClipReveal>
            <p className="t-caption mt-3 text-ink-3">{t(c.caption)}</p>
          </div>

          {/* the five questions */}
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <p className="t-eyebrow text-ink-3">{t({ en: 'Five questions', ar: 'خمسة أسئلة' })}</p>
              <ol className="mt-6">
                {c.questions.map((q, i) => (
                  <li key={i} className="flex items-baseline gap-5 border-t border-line-soft py-4 first:border-t-0">
                    <span className="font-display text-[13px] tabular-nums text-ink-3">0{i + 1}</span>
                    <span className="t-h2 font-normal">{t(q)}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* pillars: type and rules, no cards */}
          <div className="col-span-12 md:col-span-7">
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
              {c.pillars.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="border-t border-ink pt-5">
                    <h3 className="t-h2">{t(p.t)}</h3>
                    <p className="t-body-sm mt-4 text-ink-2">{t(p.d)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
