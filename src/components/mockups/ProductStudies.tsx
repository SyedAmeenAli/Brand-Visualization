'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { COPY } from '@/content/copy';
import { JOURNEY, MAINTENANCE_FLOW, VERIFICATION_STATES, VIEWING_FLOW } from '@/content/data';
import { useLang, type L } from '@/lib/i18n';
import { Photo } from '../gallery/Photo';
import { Reveal } from '../motion/Reveal';
import { DeviceFrame } from './Devices';

/** Product navigation, shown in context. The glass material is shared with the site dock. */
export function ProductNavDemo() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [on, setOn] = useState(1);
  const tabs = COPY.product.productNav;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h3 className="t-h1">{t(COPY.product.navTitle)}</h3>
        <p className="t-body-lg mt-4 max-w-[44ch] text-ink-2">{t(COPY.product.navLead)}</p>
        <div className="mt-8 flex flex-wrap gap-6 border-t border-line-soft pt-5 text-[13px] text-ink-2">
          <span>{t({ en: 'Material: translucent warm surface, 22 px blur, thin edge.', ar: 'الخامة: سطح دافئ شفاف وضبابية 22 px وحافة رفيعة.' })}</span>
        </div>
      </div>
      <div className="flex justify-center lg:col-span-7">
        <div className="relative h-[520px] w-[300px] overflow-hidden rounded-[34px] ring-1 ring-line shadow-[var(--elev-3)]">
          <Image src="/photo/p20-1895x1272.webp" alt="" fill sizes="300px" className="object-cover" style={{ objectPosition: '38% 50%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
          <nav aria-label={t({ en: 'Product navigation', ar: 'تنقل المنتج' })} className="absolute inset-x-3 bottom-3">
            <ul className="glass relative flex items-center justify-between rounded-[22px] p-1.5 text-[11px] font-medium" role="list">
              {tabs.map((tab, i) => (
                <li key={i} className="flex-1">
                  <button type="button" aria-current={on === i ? 'page' : undefined} onClick={() => setOn(i)} className={`relative flex min-h-11 w-full items-center justify-center rounded-2xl transition-[color,transform] duration-[120ms] active:scale-95 ${on === i ? 'text-ink' : 'text-ink-2'}`}>
                    {on === i && <motion.span layoutId="product-nav" transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 38 }} className="absolute inset-0 rounded-2xl bg-ink/10" />}
                    <span className="relative">{t(tab)}</span>
                    {on === i && <span className="absolute bottom-1 h-[3px] w-[3px] rounded-full bg-brand" aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

/** A property, expressed: title, location, price, state. A study of the brand, not a marketplace. */
export function PropertyExpression() {
  const { t } = useLang();
  const c = COPY.product;
  return (
    <div className="grid gap-y-10 lg:grid-cols-12">
      <div className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
        <Photo src="/photo/p19-1920x1731.webp" w={1800} h={1623} alt={t({ en: 'A modern two-storey house with a timber garage door and glazed upper floor.', ar: 'منزل عصري من طابقين ببوابة جراج خشبية وطابق علوي زجاجي.' })} sizes="(min-width: 1024px) 66vw, 100vw" className="aspect-[4/3] w-full md:aspect-[16/11]" fill interactive={false} />
        <p className="t-caption mt-3 text-ink-3">{t({ en: 'Architecture / honest arrival · Sardaka · CC BY-SA 4.0. An architectural reference, not listing evidence.', ar: 'عمارة / مدخل صادق · Sardaka · CC BY-SA 4.0. مرجع معماري وليس دليلاً على عرض.' })}</p>
      </div>
      <Reveal className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end lg:pb-24">
        <div className="relative rounded-2xl border border-line-soft bg-surface p-7 shadow-[var(--elev-2)] md:p-9">
          <span className="inline-flex items-center gap-2 rounded-md border border-line-soft bg-bg-2 px-2.5 py-1 text-[12px] font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />{t(c.propertyTag)}
          </span>
          <h3 className="t-h1 mt-5">{t(c.propertyName)}</h3>
          <p className="t-body mt-2 text-ink-2">{t(c.propertyLoc)}</p>
          <p className="font-display mt-7 text-[40px] font-semibold leading-none">{t(c.propertyPrice)}</p>
          <p className="t-body-sm mt-2 tabular-nums text-ink-2">{t(c.propertyFacts)}</p>
          <button type="button" className="btn btn-brand mt-8 w-full">{t(c.propertyCta)}</button>
          <p className="t-caption mt-4 text-ink-3">{t(c.propertyNote)}</p>
        </div>
      </Reveal>
    </div>
  );
}

const TONE: Record<string, string> = { success: 'text-success', warning: 'text-warning', error: 'text-error', disabled: 'text-disabled' };
const DOT: Record<string, string> = { success: 'bg-success', warning: 'bg-warning', error: 'bg-error', disabled: 'bg-disabled' };

/** Verification states from the FigJam information architecture. Text and form carry meaning, never colour alone. */
export function VerificationStates() {
  const { t } = useLang();
  const [sel, setSel] = useState<string>('pending');
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="flex justify-center lg:col-span-4">
        <DeviceFrame file="s18-f06-0" ratio={2004 / 864} alt={t({ en: 'AQARATI verification screen', ar: 'شاشة التوثيق في عقاراتي' })} className="w-[min(70vw,300px)]" />
      </div>
      <div className="lg:col-span-8">
        <h3 className="t-h1">{t(COPY.product.verifTitle)}</h3>
        <p className="t-body-lg mt-4 max-w-[60ch] text-ink-2">{t(COPY.product.verifLead)}</p>
        <ul className="mt-8 border-t border-line-soft" role="list">
          {VERIFICATION_STATES.map((s) => (
            <li key={s.id}>
              <button type="button" aria-pressed={sel === s.id} onClick={() => setSel(s.id)} className="group grid min-h-14 w-full grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line-soft py-3 text-start">
                <span className={`inline-flex items-center gap-2 rounded-md border border-current px-2.5 py-1 text-[12px] font-semibold ${TONE[s.tone]}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${DOT[s.tone]}`} aria-hidden="true" />{t(s.label)}
                </span>
                <span className="t-body-sm text-ink-2">{t(s.note)}</span>
                <span className={`t-caption text-ink-3 transition-opacity duration-[120ms] ${sel === s.id ? 'opacity-100' : 'opacity-0'}`}>{t({ en: 'Selected', ar: 'محدد' })}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="t-caption mt-4 text-ink-3">{t({ en: 'Authentication and verification are never visually merged. Human review, never an automated certificate.', ar: 'المصادقة والتوثيق لا يُدمجان بصرياً. مراجعة بشرية لا شهادة آلية.' })}</p>
      </div>
    </div>
  );
}

function Steps({ steps, title, wide }: { steps: L[]; title: string; wide?: boolean }) {
  const { t } = useLang();
  return (
    <div>
      <p className="t-eyebrow text-ink-3">{title}</p>
      <ol className={`mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 ${wide ? 'lg:grid-cols-6' : ''}`}>
        {steps.map((s, i) => (
          <li key={i} className="relative border-t border-ink pt-3">
            <span className="font-display text-[13px] tabular-nums text-ink-3">{String(i + 1).padStart(2, '0')}</span>
            <span className="t-label-lg mt-1 block font-semibold">{t(s)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Journeys() {
  const { t } = useLang();
  const c = COPY.product;
  return (
    <div className="space-y-16">
      <Steps steps={JOURNEY} title={t(c.journeyTitle)} wide />
      <div className="grid gap-12 lg:grid-cols-2">
        <Steps steps={VIEWING_FLOW} title={t(c.viewingTitle)} />
        <Steps steps={MAINTENANCE_FLOW} title={t(c.maintenanceTitle)} />
      </div>
      <p className="t-body-sm max-w-[70ch] text-ink-2">{t(c.flowNote)}</p>
      <div>
        <p className="t-eyebrow text-ink-3">{t(c.roles)}</p>
        <ul className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {c.rolesList.map((r, i) => (
            <li key={i} className="flex items-baseline gap-4 border-b border-line-soft py-3"><span className="font-display text-[13px] tabular-nums text-ink-3">{String(i + 1).padStart(2, '0')}</span><span className="t-body">{t(r)}</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Professional profile: the real Figma screens beside the trust copy. */
export function ProfessionalExpression() {
  const { t } = useLang();
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h3 className="t-h1">{t({ en: 'Expertise, with clear trust signals.', ar: 'خبرة، بإشارات ثقة واضحة.' })}</h3>
        <p className="t-body-lg mt-4 max-w-[44ch] text-ink-2">{t({ en: 'Business-led presentation. Verification context and contact enquiry stay clear. Project photography is a reference; affiliation requires review.', ar: 'عرض يقوده النشاط التجاري. يبقى سياق التوثيق وطلب التواصل واضحين. صور المشاريع مرجعية والانتساب يتطلب مراجعة.' })}</p>
      </div>
      <div className="flex items-start justify-center gap-5 lg:col-span-7">
        <DeviceFrame file="s18-f05-0" ratio={2004 / 864} alt={t({ en: 'Professional profile', ar: 'ملف المهني' })} className="w-[min(40vw,270px)]" />
        <DeviceFrame file="s18-f05-1" ratio={2004 / 864} alt={t({ en: 'Start a conversation', ar: 'ابدأ محادثة' })} className="mt-12 w-[min(40vw,270px)]" />
      </div>
    </div>
  );
}
