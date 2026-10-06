'use client';

import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { ColorGallery } from '../color/ColorGallery';
import { ThemePreview } from '../color/ThemePreview';
import { Reveal } from '../motion/Reveal';
import { ChapterHeader, SectionShell, SubHeader } from './SectionShell';

export function Colour() {
  const { t } = useLang();
  const c = COPY.colour;
  return (
    <SectionShell id="colour" band="dark" label={t(c.title)}>
      <div className="container-x pb-20 md:pb-28">
        <ChapterHeader num={c.num} title={c.title} lead={c.lead} chapter="colour" />
        <ColorGallery />
        <div className="mt-20 md:mt-28">
          <SubHeader num="04.1" title={c.tokensTitle} lead={c.tokensLead} />
          <Reveal className="mt-10"><ThemePreview /></Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
