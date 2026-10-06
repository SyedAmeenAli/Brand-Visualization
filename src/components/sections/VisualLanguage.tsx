'use client';

import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { PhotographyGallery } from '../gallery/PhotographyGallery';
import { PlateExplorer, type PlateRef } from '../gallery/PlateExplorer';
import { MotionDemo } from '../motion/MotionDemo';
import { Reveal } from '../motion/Reveal';
import { ChapterHeader, SectionShell, StatusBadge, SubHeader } from './SectionShell';
import { ElevationDemo, RadiusVisualizer, SpacingVisualizer } from './SystemVisuals';

const ICON_PLATES: PlateRef[] = [
  { id: 'icons-nav', title: { en: 'Core navigation icons', ar: 'أيقونات التنقل الأساسية' } },
  { id: 'icons-property', title: { en: 'Property icons', ar: 'أيقونات العقار' } },
  { id: 'icons-verify', title: { en: 'Verification icons', ar: 'أيقونات التوثيق' } },
  { id: 'icons-sizes', title: { en: 'Sizes and stroke', ar: 'الأحجام والسماكة' } },
];
const ILLUS_PLATES: PlateRef[] = [
  { id: 'illus-property', title: { en: 'Property illustration', ar: 'رسوم العقارات' } },
  { id: 'illus-empty', title: { en: 'Empty states', ar: 'الحالات الفارغة' } },
  { id: 'illus-verify', title: { en: 'Verification', ar: 'التوثيق' } },
  { id: 'illus-service', title: { en: 'Service categories', ar: 'فئات الخدمة' } },
];

export function VisualLanguage() {
  const { t } = useLang();
  const v = COPY.visual;
  return (
    <SectionShell id="visual-language" band="light" label={t(v.title)}>
      <div className="container-x pb-20 md:pb-28">
        <ChapterHeader num="05" title={v.title} lead={v.lead} chapter="visual-language" />

        <SubHeader num="05.1" title={v.photoTitle} lead={v.photoLead} />
        <div className="mt-10"><PhotographyGallery /></div>

        <div className="mt-20 md:mt-28">
          <SubHeader num="05.2" title={v.iconTitle} lead={v.iconLead} />
          <dl className="mt-8 grid max-w-3xl grid-cols-3 gap-6 border-y border-line-soft py-5">
            {v.iconSpec.map((s, i) => (
              <div key={i}><dt className="t-eyebrow text-ink-3">{t(s.k)}</dt><dd className="font-display mt-1 text-[22px] tabular-nums" dir="ltr">{s.v}</dd></div>
            ))}
          </dl>
          <div className="mt-8"><PlateExplorer plates={ICON_PLATES} status="proposed" lead={v.iconStatus} /></div>
        </div>

        <div className="mt-20 md:mt-28">
          <SubHeader num="05.3" title={v.illusTitle} lead={v.illusLead} />
          <div className="mt-10"><PlateExplorer plates={ILLUS_PLATES} status="proposed" /></div>
        </div>

        <div className="mt-20 md:mt-28">
          <SubHeader num={v.spacingNum} title={v.spacingTitle} lead={v.spacingLead} />
          <div className="mt-10"><Reveal><SpacingVisualizer /></Reveal></div>
        </div>

        <div className="mt-20 md:mt-28">
          <SubHeader num={v.radiusNum} title={v.radiusTitle} lead={v.radiusLead} />
          <div className="mt-10"><Reveal><RadiusVisualizer /></Reveal></div>
        </div>

        <div className="mt-20 md:mt-28">
          <SubHeader num="07.1" title={v.elevTitle} lead={v.elevLead} />
          <div className="mt-10"><Reveal><ElevationDemo /></Reveal></div>
        </div>

        <div className="mt-20 md:mt-28">
          <SubHeader num={v.motionNum} title={v.motionTitle} lead={v.motionLead} />
          <div className="mb-8 mt-6 ps-0 md:ps-[25%]"><StatusBadge status="proposed" /></div>
          <Reveal><MotionDemo /></Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
