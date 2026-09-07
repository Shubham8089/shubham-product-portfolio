"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Brand =
  | { type: "image"; src: string; alt: string }
  | { type: "text"; label: string };

const BRANDS: Brand[] = [
  { type: "image", src: "/images/logos/spotdraft.png", alt: "SpotDraft" },
  { type: "image", src: "/images/logos/ozonetel.png", alt: "Ozonetel" },
  { type: "image", src: "/images/logos/mudrantar.jpg", alt: "Mudrantar" },
  { type: "image", src: "/images/logos/gcek-karad.png", alt: "GCEK Karad" },
  { type: "image", src: "/images/logos/growthx.png", alt: "GrowthX" },
  {
    type: "image",
    src: "/images/logos/official-network-enterprise.png",
    alt: "Official Network Enterprise",
  },
  { type: "image", src: "/images/logos/syncing-gcek.png", alt: "Syncing GCEK" },
  { type: "text", label: "Sentinel" },
  { type: "text", label: "Intlus" },
];

const PROOF_CARDS = [
  {
    value: "$290K",
    label: "Integration ARR",
    className: "right-4 top-2 rotate-[-6deg]",
  },
  {
    value: "₹15L",
    label: "Revenue, self-founded",
    className: "left-0 top-36 rotate-[4deg]",
  },
  {
    value: "1,500+",
    label: "Active users",
    className: "right-8 bottom-0 rotate-[-3deg]",
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(40);
  const springX = useSpring(glowX, { stiffness: 60, damping: 20 });
  const springY = useSpring(glowY, { stiffness: 60, damping: 20 });
  const glowLeft = useTransform(springX, (v) => `${v}%`);
  const glowTop = useTransform(springY, (v) => `${v}%`);

  const cardX1 = useTransform(springX, [0, 100], [-14, 14]);
  const cardY1 = useTransform(springY, [0, 100], [-14, 14]);
  const cardX2 = useTransform(springX, [0, 100], [-22, 22]);
  const cardY2 = useTransform(springY, [0, 100], [-22, 22]);
  const cardX3 = useTransform(springX, [0, 100], [-17, 17]);
  const cardY3 = useTransform(springY, [0, 100], [-17, 17]);
  const cardOffsets = [
    { x: cardX1, y: cardY1 },
    { x: cardX2, y: cardY2 },
    { x: cardX3, y: cardY3 },
  ];

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

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
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

        <div className="relative hidden h-[280px] w-[300px] shrink-0 lg:block">
          {PROOF_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={cardOffsets[i]}
              className={`absolute w-[168px] rounded-2xl border border-border bg-surface/90 px-5 py-4 shadow-[var(--shadow-card)] backdrop-blur-sm ${card.className}`}
            >
              <p className="font-mono text-2xl font-bold text-accent">{card.value}</p>
              <p className="mt-1 text-xs text-text-muted">{card.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-44 w-full max-w-[640px] overflow-hidden sm:bottom-40 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      >
        <div className="flex w-max animate-marquee items-center gap-12">
          {[...BRANDS, ...BRANDS].map((brand, i) =>
            brand.type === "image" ? (
              <span key={i} className="group flex h-8 w-24 shrink-0 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="max-h-full max-w-full object-contain opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </span>
            ) : (
              <span
                key={i}
                className="shrink-0 font-mono text-sm font-semibold uppercase tracking-widest text-text-faint transition-colors duration-300 hover:text-accent"
              >
                {brand.label}
              </span>
            )
          )}
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
