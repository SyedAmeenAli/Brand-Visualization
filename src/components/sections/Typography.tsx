'use client';

import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { Reveal } from '../motion/Reveal';
import { ArabicSpecimen, TypeScale, TypeSpecimen } from '../typography/TypeComponents';
import { ChapterHeader, SectionShell, SubHeader } from './SectionShell';

export function Typography() {
  const { t } = useLang();
  const c = COPY.typography;
  return (
    <SectionShell id="typography" band="light" label={t(c.title)}>
      <div className="container-x pb-20 md:pb-28">
        <ChapterHeader num={c.num} title={c.title} lead={c.lead} chapter="typography" />

        <Reveal><TypeSpecimen /></Reveal>

        <div className="mt-6 grid gap-6 text-ink-2 md:grid-cols-3">
          <p className="t-body-sm border-t border-line-soft pt-4"><span className="t-label block text-ink">Fraunces</span>{t(c.displayNote)}</p>
          <p className="t-body-sm border-t border-line-soft pt-4"><span className="t-label block text-ink">Plus Jakarta Sans</span>{t(c.bodyNote)}</p>
          <p className="t-body-sm border-t border-line-soft pt-4"><span className="t-label block text-ink">IBM Plex Sans Arabic</span>{t(c.arabicNote)}</p>
        </div>

        <div className="mt-20 md:mt-28">
          <SubHeader num="03.1" title={c.scaleTitle} lead={c.scaleLead} />
          <div className="mt-10"><TypeScale /></div>
        </div>

        <div className="mt-20 md:mt-28">
          <SubHeader num="03.2" title={c.arabicTitle} lead={c.arabicLead} />
          <div className="mt-10"><Reveal><ArabicSpecimen /></Reveal></div>
        </div>
      </div>
    </SectionShell>
  );
}
