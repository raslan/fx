'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  driftY: number;
}

const STAR_COUNT = 180;
const ACCENT_STAR_RATIO = 0.08;

function makeStars(width: number, height: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const isAccent = Math.random() < ACCENT_STAR_RATIO;
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.1 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.6 + 0.2,
      twinklePhase: Math.random() * Math.PI * 2,
      color: isAccent ? '170, 217, 74' : '255, 255, 255',
      driftY: Math.random() * 4 + 2,
    });
  }
  return stars;
}

/** Flat, dot-based star field — no gradients, just points of light drifting and twinkling behind the landing page's content. */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = makeStars(width, height);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const alpha = reduceMotion
          ? star.baseAlpha
          : star.baseAlpha + Math.sin(time * 0.001 * star.twinkleSpeed + star.twinklePhase) * 0.3;
        const y = reduceMotion ? star.y : (star.y + (time * 0.001 * star.driftY) % height);
        ctx.beginPath();
        ctx.arc(star.x, y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${Math.max(alpha, 0)})`;
        ctx.fill();
      }
    }

    if (reduceMotion) {
      draw(0);
      return () => window.removeEventListener('resize', resize);
    }

    let frame: number;
    function loop(time: number) {
      draw(time);
      frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
