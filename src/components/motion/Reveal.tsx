'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.2, 0, 0, 1] as const;

type RevealProps = { children: ReactNode; delay?: number; y?: number; className?: string; once?: boolean };

/** Section-level reveal: opacity + a short rise. One per block, never per child. */
export function Reveal({ children, delay = 0, y = 24, className, once = true }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Editorial headline reveal: a mask that lets the line rise into view. */
export function MaskLine({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className ?? ''}`} style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
      <motion.span
        className="block"
        initial={{ y: reduce ? 0 : '105%', opacity: reduce ? 0 : 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: reduce ? 0.2 : 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Image reveal: clip-path opening with a very slight scale settle. */
export function ClipReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { clipPath: 'inset(8% 8% 8% 8%)', opacity: 0, scale: 0.985 }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: reduce ? 0.2 : 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
