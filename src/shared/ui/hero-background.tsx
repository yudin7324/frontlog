'use client';

import { useEffect, useRef } from 'react';

export function HeroBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handler = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <div
          ref={glowRef}
          className="hero-glow"
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, oklch(0.65 0.25 250 / 0.4) 0%, transparent 70%)',
            animation: 'hue-cycle 20s linear infinite',
            transition: 'left 0.15s ease-out, top 0.15s ease-out',
            willChange: 'left, top',
            top: '50%',
            left: '50%',
          }}
        />
      </div>
  );
}
