'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useId, useRef, type KeyboardEvent } from 'react';
import { useLang, type L } from '@/lib/i18n';

type Opt<T extends string> = { id: T; label: L };

/** Accessible tab-style selector with a sliding indicator. Arrow keys move selection. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className = '',
  scroll = false,
}: {
  options: Opt<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  className?: string;
  scroll?: boolean;
}) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const uid = useId();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = options.findIndex((o) => o.id === value);
    const rtl = document.documentElement.dir === 'rtl';
    let n = i;
    if (e.key === 'ArrowRight') n = i + (rtl ? -1 : 1);
    else if (e.key === 'ArrowLeft') n = i + (rtl ? 1 : -1);
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = options.length - 1;
    else return;
    e.preventDefault();
    n = (n + options.length) % options.length;
    onChange(options[n].id);
    refs.current[options[n].id]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKey}
      className={`relative inline-flex max-w-full gap-1 rounded-xl border border-line-soft bg-surface/60 p-1 ${scroll ? 'no-scrollbar overflow-x-auto' : 'flex-wrap'} ${className}`}
    >
      {options.map((o) => {
        const sel = o.id === value;
        return (
          <button
            key={o.id}
            ref={(el) => { refs.current[o.id] = el; }}
            role="tab"
            type="button"
            aria-selected={sel}
            tabIndex={sel ? 0 : -1}
            onClick={() => onChange(o.id)}
            className={`relative min-h-10 shrink-0 whitespace-nowrap rounded-lg px-4 text-[13px] font-medium transition-colors duration-[120ms] ease-aq active:scale-[0.97] ${sel ? 'text-white' : 'text-ink-2 hover:text-ink'}`}
          >
            {sel && (
              <motion.span
                layoutId={`seg-${uid}`}
                transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 440, damping: 38 }}
                className="absolute inset-0 rounded-lg bg-brand"
                aria-hidden="true"
              />
            )}
            <span className="relative">{t(o.label)}</span>
          </button>
        );
      })}
    </div>
  );
}
