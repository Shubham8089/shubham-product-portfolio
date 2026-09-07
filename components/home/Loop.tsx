"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { STAGES, getProjectsByStage } from "@/lib/projects";

const RADIUS_PCT = 40;
const TOTAL = STAGES.length;
const AUTO_CYCLE_MS = 1100;

function angleFor(index: number) {
  return (index / TOTAL) * 2 * Math.PI - Math.PI / 2;
}

function pointAt(angle: number) {
  return {
    left: `${50 + RADIUS_PCT * Math.cos(angle)}%`,
    top: `${50 + RADIUS_PCT * Math.sin(angle)}%`,
  };
}

export function Loop() {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const userInteractedRef = useRef(false);

  const activeStage = active !== null ? STAGES[active] : null;
  const activeProjects = activeStage ? getProjectsByStage(activeStage.id) : [];

  // Auto-cycle through every stage once, so the story lands without requiring interaction.
  useEffect(() => {
    if (!isInView) return;
    let i = -1;
    const tick = () => {
      if (userInteractedRef.current) {
        clearInterval(interval);
        return;
      }
      i += 1;
      if (i >= TOTAL) {
        setActive(null);
        clearInterval(interval);
        return;
      }
      setActive(i);
    };
    const interval = setInterval(tick, AUTO_CYCLE_MS);
    const kickoff = setTimeout(tick, 0);
    return () => {
      clearInterval(interval);
      clearTimeout(kickoff);
    };
  }, [isInView]);

  function select(i: number | null) {
    userInteractedRef.current = true;
    setActive(i);
  }

  return (
    <div ref={containerRef} className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-20 sm:py-28">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">The Loop</p>
      <h2 className="mt-3 max-w-lg text-center text-2xl font-bold tracking-tight text-text sm:text-3xl">
        A product doesn&apos;t stop at launch. It cycles.
      </h2>

      <div className="relative mt-16 aspect-square w-full max-w-[460px] sm:max-w-[560px]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="cometGradient">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r={RADIUS_PCT}
            fill="none"
            stroke="var(--border)"
            strokeWidth="0.5"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={RADIUS_PCT}
            fill="none"
            stroke="url(#loopGradient)"
            strokeWidth="0.6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* Orbiting comet, reinforces the "living cycle" idea */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent-glow)]"
            style={{ left: "50%", top: `${50 - RADIUS_PCT}%` }}
          />
        </motion.div>

        {/* Directional arrows between stages */}
        {STAGES.map((stage, i) => {
          const midAngle = angleFor(i + 0.5);
          const pos = pointAt(midAngle);
          const rotation = (midAngle * 180) / Math.PI + 90;
          return (
            <div
              key={`arrow-${stage.id}`}
              aria-hidden
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-text-faint"
              style={{ ...pos, transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
            >
              <ChevronRight size={11} strokeWidth={2.5} />
            </div>
          );
        })}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            key={activeStage?.id ?? "idle"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-[210px] px-2"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
              {activeStage ? `${activeProjects.length} projects` : "5 stages"}
            </p>
            <p className="mt-1.5 text-sm leading-snug text-text-muted">
              {activeStage ? activeStage.blurb : "Tap a stage to see how it fits."}
            </p>
            {activeProjects.length > 0 && (
              <ul className="mt-3 space-y-1 border-t border-border pt-3">
                {activeProjects.slice(0, 3).map((p) => (
                  <li
                    key={p.slug}
                    className="truncate font-mono text-[10px] text-text-faint"
                  >
                    {p.title}
                  </li>
                ))}
              </ul>
            )}
            {activeStage && (
              <Link
                href={`#${activeStage.id}`}
                onClick={() => (userInteractedRef.current = true)}
                className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
              >
                View {activeStage.label}
                <ArrowRight size={11} />
              </Link>
            )}
          </motion.div>
        </div>

        {STAGES.map((stage, i) => {
          const pos = pointAt(angleFor(i));
          const count = getProjectsByStage(stage.id).length;
          const isActive = active === i;
          return (
            <motion.div
              key={stage.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={pos}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onMouseEnter={() => select(i)}
                onMouseLeave={() => select(null)}
                onFocus={() => select(i)}
                onBlur={() => select(null)}
                onClick={() => select(isActive ? null : i)}
                aria-label={`Preview ${stage.label}`}
                className="group relative flex flex-col items-center gap-2"
              >
                <span
                  aria-hidden
                  className="absolute h-3.5 w-3.5 rounded-full bg-accent/40"
                  style={{
                    animation: `loop-pulse 2.6s ease-in-out ${i * 0.4}s infinite`,
                  }}
                />
                <span
                  className={`relative flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-all duration-300 ${
                    isActive
                      ? "scale-150 border-accent bg-accent shadow-[0_0_16px_var(--accent-glow)]"
                      : "border-border-strong bg-surface group-hover:border-accent"
                  }`}
                />
                <span
                  className={`font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${
                    isActive ? "text-accent" : "text-text-muted group-hover:text-text"
                  }`}
                >
                  {stage.label}
                </span>
                <span className="font-mono text-[9px] text-text-faint">{count}</span>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
