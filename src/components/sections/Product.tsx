'use client';

import { COPY } from '@/content/copy';
import { DARK_SCREENS, LIGHT_SCREENS } from '@/content/data';
import { useLang } from '@/lib/i18n';
import { ScreenShowcase } from '../mockups/Devices';
import { Journeys, ProductNavDemo, ProfessionalExpression, PropertyExpression, VerificationStates } from '../mockups/ProductStudies';
import { ChapterHeader, SectionShell, SubHeader } from './SectionShell';

export function Product() {
  const { t } = useLang();
  const c = COPY.product;
  return (
    <>
      <SectionShell id="product" band="ivory" label={t(c.title)}>
        <div className="container-x pb-20 md:pb-28">
          <ChapterHeader num={c.num} title={c.title} lead={c.lead} chapter="product" />

          <SubHeader num="09.1" title={c.lightTitle} lead={c.lightLead} />
          <div className="mt-12"><ScreenShowcase screens={LIGHT_SCREENS} label={t(c.lightTitle)} /></div>

          <div className="mt-20 md:mt-28"><ProductNavDemo /></div>

          <div className="mt-20 md:mt-28">
            <SubHeader num="09.2" title={c.propertyTitle} lead={c.propertyLead} />
            <div className="mt-12"><PropertyExpression /></div>
          </div>

          <div className="mt-20 md:mt-28"><ProfessionalExpression /></div>
          <div className="mt-20 md:mt-28"><VerificationStates /></div>

          <div className="mt-20 md:mt-28">
            <SubHeader num="09.3" title={c.journeyTitle} lead={c.journeyLead} />
            <div className="mt-12"><Journeys /></div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="product-dark" band="dark" label={t(c.darkTitle)}>
        <div className="container-x py-20 md:py-28">
          <SubHeader num="09.4" title={c.darkTitle} lead={c.darkLead} />
          <div className="mt-14"><ScreenShowcase screens={DARK_SCREENS} label={t(c.darkTitle)} /></div>
        </div>
      </SectionShell>
    </>
  );
}
