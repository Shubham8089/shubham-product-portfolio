import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS, getProjectBySlug, getStageMeta } from "@/lib/projects";
import { CategoryTag, PlainTag } from "@/components/ui/Tag";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PdfViewer } from "@/components/work/PdfViewer";
import { WebEmbed } from "@/components/work/WebEmbed";
import { ScreenshotGrid } from "@/components/work/ScreenshotGrid";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const stage = getStageMeta(project.stage);

  const sections = project.content
    ? [
        { label: "Context", body: project.content.context },
        { label: "Problem", body: project.content.problem },
        { label: "Process", body: project.content.process },
        { label: "Outcome", body: project.content.outcome },
      ]
    : [];

  return (
    <article className="mx-auto max-w-[820px] px-6 py-28">
      <Link
        href={`/#${stage.id}`}
        className="mb-10 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
      >
        <ArrowLeft size={14} />
        Back to {stage.label}
      </Link>

      <ScrollReveal>
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {stage.number} / {stage.label}
          </p>
          {project.liveUrl && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                Live
              </span>
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {project.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <CategoryTag key={c} category={c} />
          ))}
          {project.tags.map((t) => (
            <PlainTag key={t} label={t} />
          ))}
        </div>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">
          {project.oneLiner}
        </p>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            {project.clients ? "Visit Agency Site" : "Visit Live Product"}
            <ArrowUpRight size={14} />
          </a>
        )}
        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            View Full Analysis
            <ArrowUpRight size={14} />
          </a>
        )}
      </ScrollReveal>

      {project.image ? (
        <div className="relative mt-16 aspect-video w-full overflow-hidden rounded-2xl border border-border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 820px) 820px, 100vw"
            priority
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mt-16 aspect-video w-full rounded-2xl border border-border bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-transparent" />
      )}

      {sections.length > 0 && (
        <div className="mt-16 space-y-12">
          {sections.map((section, i) => (
            <ScrollReveal key={section.label} delay={i * 0.05}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
                {section.label}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text">{section.body}</p>
            </ScrollReveal>
          ))}
        </div>
      )}

      {project.pdfUrl && (
        <ScrollReveal>
          <div className="mt-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
              Full Document
            </h2>
            <div className="mt-4">
              <PdfViewer src={project.pdfUrl} title={project.title} />
            </div>
          </div>
        </ScrollReveal>
      )}

      {project.externalUrl && !project.pdfUrl && (
        <ScrollReveal>
          <div className="mt-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
              Full Analysis
            </h2>
            <div className="mt-4">
              <WebEmbed src={project.externalUrl} title={project.title} />
            </div>
          </div>
        </ScrollReveal>
      )}

      {sections.length === 0 && !project.pdfUrl && !project.externalUrl && (
        <ScrollReveal>
          <div className="mt-16 rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="text-sm text-text-muted">
              Full case study coming soon. In the meantime, here is a short summary of the
              work.
            </p>
          </div>
        </ScrollReveal>
      )}

      {project.screens && project.screens.length > 0 && (
        <ScrollReveal>
          <ScreenshotGrid
            title="Live Screens"
            subtitle="The real product, not mockups. Click through to see it live."
            items={project.screens}
          />
        </ScrollReveal>
      )}

      {project.clients && project.clients.length > 0 && (
        <ScrollReveal>
          <ScreenshotGrid
            title="Selected Clients"
            subtitle="Live client sites, not mockups. Click through to see the real thing."
            items={project.clients}
          />
        </ScrollReveal>
      )}
    </article>
  );
}
