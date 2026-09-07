import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const STARTUP_SLUGS = ["official-network-enterprise", "syncing-gcek"];

export function Startups() {
  const startups = STARTUP_SLUGS.map((slug) =>
    PROJECTS.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (startups.length === 0) return null;

  return (
    <section id="startups" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <ScrollReveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Startups</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Businesses, not side projects
          </h2>
          <p className="mt-3 max-w-xl text-base text-text-muted">
            Two ventures I founded and ran end to end: product, ops, and revenue, alongside a
            full-time PM career.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {startups.map((startup, i) => (
            <ScrollReveal key={startup.slug} delay={i * 0.1}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-card)] transition-colors duration-300 hover:border-accent/40">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {startup.role && (
                        <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">
                          {startup.role}
                        </p>
                      )}
                      <h3 className="mt-1 text-xl font-semibold text-text">{startup.title}</h3>
                    </div>
                    {startup.liveUrl && (
                      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-accent">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest">
                          Live
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {startup.oneLiner}
                  </p>
                </div>

                <div className="mt-8 flex items-end justify-between gap-4">
                  {startup.metric && (
                    <p className="font-mono text-2xl font-bold tracking-tight text-accent">
                      {startup.metric}
                    </p>
                  )}
                  <div className="flex items-center gap-4">
                    {startup.liveUrl && (
                      <a
                        href={startup.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text"
                      >
                        Visit
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                    <Link
                      href={`/work/${startup.slug}`}
                      className="flex items-center gap-1 text-sm font-medium text-text transition-colors hover:text-accent"
                    >
                      Full story
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
