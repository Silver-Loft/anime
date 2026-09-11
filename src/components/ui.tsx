import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- scroll reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- section chrome ---------- */
export function SectionHead({
  index,
  code,
  title,
  accent,
}: {
  index: string;
  code: string;
  title: ReactNode;
  accent?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-gold/60" />
          <span className="font-mono text-[11px] tracking-[0.35em] text-gold">
            {index} / {code}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-medium leading-[0.95] text-ice">
          {title}
          {accent && (
            <span className="ml-3 align-top font-mono text-xs tracking-[0.3em] text-smoke">
              {accent}
            </span>
          )}
        </h2>
      </Reveal>
    </div>
  );
}

/* ---------- animated counter ---------- */
export function useCountUp(target: number, started: boolean, duration = 1.8) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [started, target, duration]);
  return value;
}

export function InView({
  children,
  amount = 0.4,
}: {
  children: (inView: boolean) => ReactNode;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return <div ref={ref}>{children(inView)}</div>;
}

/* ---------- decorative diamond ---------- */
export function Diamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden>
      <rect x="2.6" y="2.6" width="4.8" height="4.8" transform="rotate(45 5 5)" fill="currentColor" />
    </svg>
  );
}
