"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { CategoryTag, PlainTag } from "@/components/ui/Tag";

const GRADIENTS = [
  "from-amber-500/20 via-orange-500/10 to-transparent",
  "from-blue-500/20 via-indigo-500/10 to-transparent",
  "from-emerald-500/20 via-teal-500/10 to-transparent",
  "from-purple-500/20 via-fuchsia-500/10 to-transparent",
  "from-rose-500/20 via-pink-500/10 to-transparent",
];

function gradientFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return GRADIENTS[hash % GRADIENTS.length];
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = `/work/${project.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="group w-[300px] shrink-0 snap-start sm:w-[340px]"
    >
      <Link
        href={href}
        className="block overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
      >
        <div
          className={`relative aspect-video w-full overflow-hidden ${
            project.image ? "" : `bg-gradient-to-br ${gradientFor(project.slug)}`
          }`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 640px) 340px, 300px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-dot-grid opacity-30" />
          )}
          {project.image && (
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent" />
          )}
          <div
            className={`absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-widest ${
              project.image ? "text-white/80" : "text-text-faint"
            }`}
          >
            {project.stage}
          </div>
          {project.liveUrl && (
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-white">
                Live
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <CategoryTag key={c} category={c} />
            ))}
            {project.tags.slice(0, 1).map((t) => (
              <PlainTag key={t} label={t} />
            ))}
          </div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-snug text-text">{project.title}</h3>
            <ArrowUpRight
              size={16}
              className="mt-0.5 shrink-0 text-text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{project.oneLiner}</p>
        </div>
      </Link>
    </motion.div>
  );
}
