"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MARQUEE_ITEMS = [
  "SpotDraft",
  "Ozonetel",
  "Mudrantar",
  "Sentinel",
  "Intlus",
  "GrowthX",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(40);
  const springX = useSpring(glowX, { stiffness: 60, damping: 20 });
  const springY = useSpring(glowY, { stiffness: 60, damping: 20 });
  const glowLeft = useTransform(springX, (v) => `${v}%`);
  const glowTop = useTransform(springY, (v) => `${v}%`);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-bg px-6"
    >
      <div className="bg-noise pointer-events-none absolute inset-0" />
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[280px] w-[280px] rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          left: glowLeft,
          top: glowTop,
          x: "-50%",
          y: "-50%",
        }}
      />

      <div className="relative flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-accent"
        >
          Product Manager
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-balance text-5xl font-extrabold tracking-tight text-text sm:text-6xl md:text-7xl"
        >
          Shubham Bhosale
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-md text-balance text-lg text-text-muted sm:text-xl"
        >
          Builder. Integration-obsessed. I ship products that plug into the systems people already use.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-mono text-xs uppercase tracking-widest text-text-faint"
        >
          3+ years / CCaaS, CLM, B2B SaaS
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-44 w-full max-w-[640px] overflow-hidden sm:bottom-40 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      >
        <div className="flex w-max animate-marquee gap-10">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="font-mono text-xs uppercase tracking-widest text-text-faint"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.a
        href="#loop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-28 flex flex-col items-center gap-1.5 text-text-faint transition-colors hover:text-text-muted sm:bottom-24"
        aria-label="Scroll to explore"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
