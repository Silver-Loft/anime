import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  amp: number;
  speed: number;
  phase: number;
  layer: number; // 0 far, 1 mid, 2 near
  gold: boolean;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let stars: Star[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      const count = Math.min(260, Math.floor((w * h) / 8500));
      stars = Array.from({ length: count }, () => {
        const layer = Math.random() < 0.55 ? 0 : Math.random() < 0.72 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: layer === 0 ? 0.4 + Math.random() * 0.5 : layer === 1 ? 0.6 + Math.random() * 0.8 : 0.9 + Math.random() * 1.2,
          base: 0.25 + Math.random() * 0.45,
          amp: 0.1 + Math.random() * 0.35,
          speed: 0.4 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          layer,
          gold: Math.random() < 0.14,
        };
      });
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      for (const s of stars) {
        const tw = s.base + s.amp * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
        // slow upward drift per layer
        const drift = (time * (s.layer + 1) * 1.6) % (h + 20);
        const y = ((s.y - drift) % (h + 20) + (h + 20)) % (h + 20) - 10;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? `rgba(230, 205, 138, ${tw})`
          : `rgba(205, 216, 245, ${tw})`;
        ctx.fill();
        // cross glint on the brightest near stars
        if (s.layer === 2 && s.r > 1.5) {
          ctx.strokeStyle = s.gold
            ? `rgba(230, 205, 138, ${tw * 0.35})`
            : `rgba(180, 198, 240, ${tw * 0.3})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - s.r * 4, y);
          ctx.lineTo(s.x + s.r * 4, y);
          ctx.moveTo(s.x, y - s.r * 4);
          ctx.lineTo(s.x, y + s.r * 4);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) {
      // single static frame
      draw(0);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
