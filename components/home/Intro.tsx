"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const SENTENCE =
  "BTech graduate from GCEK Karad. Built two startups from scratch. Three years shipping product ever since.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="text-text-faint">{children}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 text-accent">
        {children}
      </motion.span>
    </span>
  );
}

export function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = SENTENCE.split(" ");

  return (
    <section ref={ref} className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
          {words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
        </div>
      </div>
    </section>
  );
}
