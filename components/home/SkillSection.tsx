"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { LoopStage } from "@/lib/projects";
import { getProjectsByStage, getStageMeta } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/home/ProjectCard";

const EDGE_PAD = "max(1.5rem, calc((100vw - 1200px) / 2 + 1.5rem))";
const SIDEBAR_WIDTH = 88;
const DESKTOP_QUERY = "(min-width: 1024px)";

export function SkillSection({ stage }: { stage: LoopStage }) {
  const meta = getStageMeta(stage);
  const projects = getProjectsByStage(stage);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);

    function measure() {
      if (!trackRef.current) return;
      const desktop = mql.matches;
      const viewportWidth = window.innerWidth - (desktop ? SIDEBAR_WIDTH : 0);
      const overflow = trackRef.current.scrollWidth - viewportWidth;
      setDistance(Math.max(overflow, 0));
    }

    measure();
    window.addEventListener("resize", measure);
    mql.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mql.removeEventListener("change", measure);
    };
  }, [projects.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });
  const x = useTransform(smoothProgress, [0, 1], [0, -distance]);
  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const pinned = distance > 0;

  return (
    <section
      id={stage}
      ref={sectionRef}
      className="relative border-t border-border"
      style={pinned ? { height: `calc(100svh - var(--header-h) + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky flex h-[calc(100svh-var(--header-h))] flex-col overflow-hidden py-5 sm:py-8 lg:py-12"
            : "flex flex-col py-16 sm:py-24 lg:py-32"
        }
        style={pinned ? { top: "var(--header-h)" } : undefined}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionLabel
            number={meta.number}
            label={meta.label}
            title={meta.title}
            description={meta.blurb}
          />
          {pinned && (
            <div className="-mt-4 mb-4 h-px w-full max-w-[200px] bg-border sm:-mt-6 sm:mb-6 lg:-mt-8 lg:mb-10">
              <motion.div className="h-px bg-accent" style={{ width: progressWidth }} />
            </div>
          )}
        </div>

        <div
          className={
            pinned
              ? "flex flex-1 items-center overflow-hidden"
              : "no-scrollbar overflow-x-auto overflow-y-hidden pb-2"
          }
        >
          <motion.div
            ref={trackRef}
            style={pinned ? { x, paddingLeft: EDGE_PAD } : { paddingLeft: EDGE_PAD }}
            className="flex gap-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
            <div aria-hidden style={{ width: EDGE_PAD }} className="shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
