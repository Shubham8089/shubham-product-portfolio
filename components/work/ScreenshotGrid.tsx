import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function ScreenshotGrid({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: { name: string; url: string; image: string }[];
}) {
  return (
    <div className="mt-16">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">{title}</h2>
      <p className="mt-3 text-sm text-text-muted">{subtitle}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group block overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] transition-colors duration-300 hover:border-accent/40"
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-surface-hover px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-text-faint/40" />
              <span className="h-2 w-2 rounded-full bg-text-faint/40" />
              <span className="h-2 w-2 rounded-full bg-text-faint/40" />
            </div>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 640px) 380px, 90vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm font-medium text-text">{item.name}</p>
              <ArrowUpRight
                size={14}
                className="text-text-faint transition-colors group-hover:text-accent"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
