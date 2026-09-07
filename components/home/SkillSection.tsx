"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { LoopStage } from "@/lib/projects";
import { getProjectsByStage, getStageMeta } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/home/ProjectCard";

const EDGE_PAD = "max(1.5rem, calc((100vw - 1200px) / 2 + 1.5rem))";
const NAV_HEIGHT = "4rem";

export function SkillSection({ stage }: { stage: LoopStage }) {
  const meta = getStageMeta(stage);
  const projects = getProjectsByStage(stage);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      const overflow = trackRef.current.scrollWidth - window.innerWidth;
      setDistance(Math.max(overflow, 0));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const pinned = distance > 0;

  return (
    <section
      id={stage}
      ref={sectionRef}
      className="relative border-t border-border"
      style={pinned ? { height: `calc(100svh - ${NAV_HEIGHT} + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky flex h-[calc(100svh-4rem)] flex-col overflow-hidden py-12"
            : "flex flex-col py-24 sm:py-32"
        }
        style={pinned ? { top: NAV_HEIGHT } : undefined}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <SectionLabel
            number={meta.number}
            label={meta.label}
            title={meta.title}
            description={meta.blurb}
          />
          {pinned && (
            <div className="-mt-8 mb-10 h-px w-full max-w-[200px] bg-border">
              <motion.div className="h-px bg-accent" style={{ width: progressWidth }} />
            </div>
          )}
        </div>

        <div className={pinned ? "flex flex-1 items-center overflow-hidden" : "overflow-x-auto overflow-y-hidden pb-2"}>
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
