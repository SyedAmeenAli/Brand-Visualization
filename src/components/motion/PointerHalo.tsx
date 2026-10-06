'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * A very quiet pointer ring for fine pointers only. It grows over elements marked data-cursor
 * (logo specimen, colour swatch, image, motion demo). Disabled on touch and for reduced motion.
 */
export function PointerHalo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(fine && !reduce);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      const kind = target?.dataset.cursor ?? null;
      el.dataset.kind = kind ?? '';
      setLabel(target?.dataset.cursorLabel ?? null);
      el.style.opacity = '1';
    };
    const leave = () => { el.style.opacity = '0'; };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-kind=""
      className="pointer-events-none fixed left-0 top-0 z-[90] grid h-7 w-7 place-items-center rounded-full border border-brand/60 opacity-0 transition-[width,height,background-color,opacity] duration-[220ms] ease-aq data-[kind=colour]:h-14 data-[kind=colour]:w-14 data-[kind=image]:h-16 data-[kind=image]:w-16 data-[kind=image]:bg-brand/90 data-[kind=logo]:h-12 data-[kind=logo]:w-12 data-[kind=motion]:h-12 data-[kind=motion]:w-12"
      style={{ mixBlendMode: 'normal' }}
    >
      {label && <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white">{label}</span>}
    </div>
  );
}
