'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import usageData from '@/content/usage.json';
import { COPY } from '@/content/copy';
import { USAGE_TOPICS } from '@/content/data';
import { useLang } from '@/lib/i18n';
import { Lightbox, type LightboxItem } from '../gallery/Lightbox';
import { Reveal } from '../motion/Reveal';
import { Segmented } from '../ui/Segmented';
import { ChapterHeader, SectionShell, SubHeader } from './SectionShell';

type Slice = { file: string; topic: string; n: number; title: string; w: number; h: number };
const SLICES = usageData as Slice[];

/** Correct / incorrect, straight from Figma step 22. Each slice keeps its source wording and panels. */
function TopicSlices() {
  const { t } = useLang();
  const [topic, setTopic] = useState(USAGE_TOPICS[0].id);
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => SLICES.filter((s) => s.topic === topic), [topic]);
  const items: LightboxItem[] = list.map((s) => ({ src: `/usage/${s.file}`, w: s.w, h: s.h, alt: s.title, caption: { en: s.title, ar: s.title } }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-5">
        <Segmented scroll label={t(COPY.usage.topicLabel)} value={topic} onChange={setTopic} options={USAGE_TOPICS.map((x) => ({ id: x.id, label: x.label }))} />
        <p className="t-body-sm flex gap-5 text-ink-2"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />{t(COPY.ui.correct)}</span><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-error" aria-hidden="true" />{t(COPY.ui.incorrect)}</span></p>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul key={topic} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }} className="mt-8 space-y-6">
          {list.map((s, i) => (
            <li key={s.file}>
              <button type="button" onClick={() => setOpen(i)} data-cursor="image" data-cursor-label={t(COPY.usage.openSlice)} className="group relative block w-full overflow-hidden rounded-xl border border-line-soft bg-bg-2 text-start transition-[box-shadow,transform] duration-[220ms] ease-aq hover:-translate-y-0.5 hover:shadow-[var(--elev-2)]" aria-label={`${t(COPY.usage.openSlice)}: ${s.title}`}>
                <Image src={`/usage/${s.file}`} alt={s.title} width={s.w} height={s.h} sizes="(min-width: 1280px) 1200px, 100vw" loading="lazy" className="h-auto w-full" />
              </button>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}

function MasterRules() {
  const { t } = useLang();
  const rules = SLICES.filter((s) => s.topic === 'rules');
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ol className="border-t border-ink">
      {rules.map((r, i) => {
        const isOpen = open === i;
        return (
          <li key={r.file} className="border-b border-line-soft">
            <h4>
              <button type="button" aria-expanded={isOpen} aria-controls={`rule-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="group flex min-h-16 w-full items-baseline gap-5 py-4 text-start">
                <span className="font-display text-[13px] tabular-nums text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                <span className="t-h2 flex-1 font-normal text-balance transition-colors duration-[120ms] group-hover:text-accent">{r.title}</span>
                <span aria-hidden="true" className={`text-[22px] text-ink-3 transition-transform duration-[220ms] ease-aq ${isOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
            </h4>
            <div id={`rule-${i}`} role="region" aria-label={r.title} hidden={!isOpen}>
              {isOpen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }} className="pb-6">
                  <Image src={`/usage/${r.file}`} alt={r.title} width={r.w} height={r.h} sizes="(min-width: 1280px) 1200px, 100vw" loading="lazy" className="h-auto w-full rounded-lg border border-line-soft" />
                </motion.div>
              )}
            </div>
          </li>
        );
      })}
      <li className="sr-only">{t(COPY.usage.rulesLead)}</li>
    </ol>
  );
}

export function Usage() {
  const { t } = useLang();
  const c = COPY.usage;
  return (
    <SectionShell id="usage" band="ivory" label={t(c.title)}>
      <div className="container-x pb-20 md:pb-28">
        <ChapterHeader num={c.num} title={c.title} lead={c.lead} chapter="usage" />
        <TopicSlices />
        <div className="mt-20 md:mt-28">
          <SubHeader num="11.1" title={c.rulesTitle} lead={c.rulesLead} />
          <Reveal className="mt-10"><MasterRules /></Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
