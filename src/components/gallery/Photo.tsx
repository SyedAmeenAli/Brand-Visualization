'use client';

import Image from 'next/image';
import { useRef, useState, type ReactNode } from 'react';
import { BrandSymbol } from '../brand/BrandLogo';
import { useReducedMotion } from 'framer-motion';

type Props = {
  src: string;
  alt: string;
  w: number;
  h: number;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** subtle crop shift + scale (1–3%) following the pointer */
  interactive?: boolean;
  focus?: string;
  onClick?: () => void;
  children?: ReactNode;
  cursorLabel?: string;
  fill?: boolean;
};

/**
 * Editorial image frame. On hover the crop drifts a few percent and the image scales ~2%.
 * Never zooms aggressively; effects are removed for reduced motion and touch.
 */
export function Photo({ src, alt, w, h, sizes = '(min-width: 1024px) 50vw, 100vw', className = '', imgClassName = '', priority, interactive = true, focus, onClick, children, cursorLabel = 'View', fill }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || reduce || e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--sx', `${(-px * 3).toFixed(2)}%`);
    el.style.setProperty('--sy', `${(-py * 3).toFixed(2)}%`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--sx', '0%');
    ref.current?.style.setProperty('--sy', '0%');
  };

  const inner = (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor={onClick ? 'image' : undefined}
      data-cursor-label={onClick ? cursorLabel : undefined}
      className={`group relative overflow-hidden ${className}`}
      style={{ aspectRatio: fill ? undefined : `${w} / ${h}` }}
    >
      {failed ? (
        <div role="img" aria-label={alt} className="grid h-full w-full place-items-center bg-bg-2">
          <BrandSymbol className="h-1/4 w-auto opacity-40" decorative tone="mocha" />
        </div>
      ) : (
      <Image
        onError={() => setFailed(true)}
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes={sizes}
        priority={priority}
        className={`h-full w-full object-cover transition-transform duration-[360ms] ease-aq ${interactive ? 'group-hover:scale-[1.025]' : ''} ${imgClassName}`}
        style={{ objectPosition: focus, transform: interactive ? 'translate3d(var(--sx, 0%), var(--sy, 0%), 0)' : undefined }}
      />
      )}
      {children}
    </div>
  );

  if (!onClick) return inner;
  return (
    <button type="button" onClick={onClick} className="block w-full text-start focus-visible:outline-offset-4" aria-label={`${alt}`}>
      {inner}
    </button>
  );
}
