'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { COPY } from '@/content/copy';
import { TYPE_ROLES } from '@/content/data';
import { useLang, type Lang } from '@/lib/i18n';
import { Segmented } from '../ui/Segmented';

type Voice = 'display' | 'body';
type Mode = 'light' | 'dark';

const faceClass = (voice: Voice, lang: Lang) =>
  lang === 'ar' ? 'font-[family-name:var(--font-arabic)]' : voice === 'display' ? 'font-display' : 'font-sans';

/** Editorial type specimen. Language, voice and surface can be switched; it stays a specimen, not a playground. */
export function TypeSpecimen() {
  const { t } = useLang();
  const [sl, setSl] = useState<Lang>('en');
  const [voice, setVoice] = useState<Voice>('display');
  const [mode, setMode] = useState<Mode>('light');
  const face = faceClass(voice, sl);
  const rtl = sl === 'ar';
  const familyName = rtl ? 'IBM Plex Sans Arabic' : voice === 'display' ? 'Fraunces' : 'Plus Jakarta Sans';
  const specimen = rtl ? { aa: 'عق', head: 'مكان تنتمي إليه.', alpha: 'ابجد ٠١٢٣٤٥٦٧٨٩ / ١٨٥٬٠٠٠ ر.ع.', body: COPY.typography.arabicBody.ar } : { aa: 'Aa', head: 'A place to belong.', alpha: 'Aa Bb Cc 0123456789 / OMR 185,000', body: 'Search, compare and connect with confidence.' };
  const weights = rtl ? [400, 500, 600] : voice === 'display' ? [400, 600] : [400, 500, 600];
  const weightName = (w: number) => (w === 400 ? 'Regular' : w === 500 ? 'Medium' : 'SemiBold');

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Segmented label={t(COPY.typography.controls.language)} value={sl} onChange={setSl} options={[{ id: 'en', label: COPY.ui.english }, { id: 'ar', label: COPY.ui.arabic }]} />
        <Segmented label={t(COPY.typography.controls.role)} value={voice} onChange={setVoice} options={[{ id: 'display', label: COPY.ui.display }, { id: 'body', label: COPY.ui.body }]} />
        <Segmented label={t(COPY.ui.theme)} value={mode} onChange={setMode} options={[{ id: 'light', label: COPY.ui.light }, { id: 'dark', label: COPY.ui.dark }]} />
      </div>

      <div data-band={mode === 'dark' ? 'dark' : undefined} className="overflow-hidden rounded-xl border border-line-soft bg-bg p-6 text-ink transition-colors duration-[360ms] ease-aq md:p-12" data-cursor="motion">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${sl}-${voice}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            dir={rtl ? 'rtl' : 'ltr'}
            lang={sl}
            className="grid items-center gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14"
          >
            <p className={`${face} select-none leading-[0.82] text-accent`} style={{ fontSize: 'clamp(110px, 17vw, 240px)', fontWeight: voice === 'display' && !rtl ? 400 : 500 }} aria-hidden="true">{specimen.aa}</p>
            <div>
              <p className="t-eyebrow text-ink-3" dir="ltr">{familyName}</p>
              <p className={`${face} mt-4 text-balance`} style={{ fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.15, fontWeight: voice === 'display' && !rtl ? 400 : 500 }}>{specimen.head}</p>
              <p className={`${face} t-body-lg mt-6 max-w-[46ch] text-ink-2`}>{specimen.body}</p>
              <p className={`${face} t-body mt-8 border-t border-line-soft pt-5 tabular-nums text-ink-2`}>{specimen.alpha}</p>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2" dir="ltr">
                {weights.map((w) => (
                  <li key={w} className="text-[13px] text-ink-3"><span className={`${face} text-[22px] text-ink`} style={{ fontWeight: w }}>{rtl ? 'ع' : 'Aa'}</span>&nbsp;&nbsp;{weightName(w)}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** The twelve native roles at their real size, line height, weight and family. */
export function TypeScale() {
  const { t, lang } = useLang();
  const [hover, setHover] = useState<string | null>(null);
  return (
    <ul className="border-t border-ink">
      {TYPE_ROLES.map((r) => {
        const ff = lang === 'ar' ? 'font-[family-name:var(--font-arabic)]' : r.family === 'display' ? 'font-display' : 'font-sans';
        return (
          <li
            key={r.role}
            onPointerEnter={() => setHover(r.role)}
            onPointerLeave={() => setHover(null)}
            className="group relative grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-line-soft py-6 transition-colors duration-[220ms] hover:bg-surface/40 md:py-8"
          >
            <div className="col-span-12 md:col-span-3">
              <p className="t-label">{r.role}</p>
              <p className="t-caption tabular-nums text-ink-3" dir="ltr">{r.size} / {r.line} px · {r.weight === 400 ? 'Regular' : r.weight === 500 ? 'Medium' : 'SemiBold'}</p>
              <p className="t-caption text-ink-3" dir="ltr">{r.family === 'display' ? 'Fraunces' : 'Plus Jakarta Sans'}</p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className={`${ff} text-pretty`} style={{ fontSize: `min(${r.size}px, ${Math.max(7.4, r.size / 5.6)}vw)`, lineHeight: `${r.line}px`, fontWeight: r.weight, minHeight: r.line }}>
                {t(r.sample)}
              </p>
            </div>
            <div className="col-span-12 md:col-span-3 md:text-end">
              <p className="t-body-sm text-ink-2">{t(r.usage)}</p>
            </div>
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-0 w-0.5 bg-brand transition-opacity duration-[220ms]" style={{ opacity: hover === r.role ? 1 : 0 }} />
          </li>
        );
      })}
    </ul>
  );
}

/** True RTL Arabic specimen: headline, body, caption and numerals. */
export function ArabicSpecimen() {
  const { t } = useLang();
  const c = COPY.typography;
  return (
    <div dir="rtl" lang="ar" className="grid gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft font-[family-name:var(--font-arabic)] md:grid-cols-5">
      <div className="bg-bg p-8 md:col-span-3 md:p-12">
        <p className="t-eyebrow text-ink-3">العنوان</p>
        <p className="mt-4 text-accent" style={{ fontSize: 'clamp(34px, 4.6vw, 60px)', lineHeight: 1.2, fontWeight: 500 }}>{c.arabicHeadline.ar}</p>
        <p className="t-body-lg mt-8 max-w-[34ch] text-ink-2" style={{ lineHeight: 1.9 }}>{c.arabicBody.ar}</p>
        <p className="t-caption mt-8 text-ink-3">{c.arabicCaption.ar}</p>
      </div>
      <div className="bg-bg p-8 md:col-span-2 md:p-12">
        <p className="t-eyebrow text-ink-3">{t(c.numerals)}</p>
        <dl className="mt-6 space-y-6">
          <div><dt className="t-caption text-ink-3">السعر</dt><dd className="mt-1 text-[clamp(26px,3vw,40px)] tabular-nums" style={{ fontWeight: 500, lineHeight: 1.5 }}>١٨٥٬٠٠٠ ر.ع.</dd></div>
          <div className="border-t border-line-soft pt-6"><dt className="t-caption text-ink-3">الغرف</dt><dd className="mt-1 text-[clamp(26px,3vw,40px)]" style={{ fontWeight: 500, lineHeight: 1.5 }}>٤ غرف</dd></div>
          <div className="border-t border-line-soft pt-6"><dt className="t-caption text-ink-3">الموقع</dt><dd className="mt-1 text-[clamp(26px,3vw,40px)]" style={{ fontWeight: 500, lineHeight: 1.5 }}>الموج، <span dir="ltr" className="font-[family-name:var(--font-sans)] text-[0.8em]">Muscat</span> / مسقط</dd></div>
        </dl>
      </div>
      <p className="t-caption bg-bg px-8 py-4 text-ink-3 md:col-span-5 md:px-12" dir={t({ en: 'ltr', ar: 'rtl' })}>{t(c.arabicStatus)}</p>
    </div>
  );
}
