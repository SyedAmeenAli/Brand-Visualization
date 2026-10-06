'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { COPY } from '@/content/copy';
import { useLang } from '@/lib/i18n';
import { Reveal } from '../motion/Reveal';
import { SectionShell } from './SectionShell';

/** The logo-reveal motion piece. Plays in a loop while on screen, muted; paused for reduced motion until asked. */
export function LogoReveal() {
  const { t } = useLang();
  const c = COPY.reveal;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const manual = useRef(false); // user paused: stop auto-resuming

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !manual.current) v.play().catch(() => setPlaying(false));
        else v.pause();
      },
      { threshold: 0.45 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { manual.current = false; v.play().catch(() => undefined); }
    else { manual.current = true; v.pause(); }
  };

  return (
    <SectionShell id="reveal" band="ivory" label={t(c.title)}>
      <div className="container-x grid items-center gap-10 py-20 md:grid-cols-12 md:gap-12 md:py-28">
        <Reveal className="order-2 md:order-1 md:col-span-7">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-line" aria-hidden="true" />
            <h2 className="t-eyebrow text-ink-3">{t(c.title)}</h2>
          </div>
          <p className="t-display mt-7 max-w-[18ch] text-balance">{t(c.line)}</p>
          <p className="t-body-lg mt-6 max-w-[48ch] text-ink-2">{t(c.body)}</p>
          <button type="button" onClick={toggle} aria-pressed={playing} className="btn btn-ghost mt-8">
            {playing ? t(c.pause) : t(c.play)}
          </button>
          <p className="t-caption mt-6 max-w-[52ch] text-ink-3">{t(c.note)}</p>
        </Reveal>

        <Reveal delay={0.1} className="order-1 md:order-2 md:col-span-5">
          <div className="relative mx-auto w-full max-w-[min(100%,380px)] overflow-hidden rounded-2xl border border-line-soft bg-bg-2 shadow-[var(--elev-2)] md:max-w-[420px] md:rounded-[20px]" style={{ aspectRatio: '720 / 1054' }}>
            <video
              ref={ref}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[360ms] ${ready ? 'opacity-100' : 'opacity-0'}`}
              src="/video/aqarati-logo-reveal.mp4"
              poster="/video/aqarati-logo-reveal-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={t(c.alt)}
              onLoadedData={() => setReady(true)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            {/* poster underneath so nothing is ever empty while the video loads */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/video/aqarati-logo-reveal-poster.jpg" alt="" aria-hidden="true" className="absolute inset-0 -z-0 h-full w-full object-cover" style={{ opacity: ready ? 0 : 1 }} />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
