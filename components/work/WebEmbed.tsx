import { ArrowUpRight } from "lucide-react";
import { FrameCard } from "./FrameCard";

export function WebEmbed({ src, title }: { src: string; title: string }) {
  return (
    <FrameCard
      src={src}
      title={title}
      actions={
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-accent"
        >
          Open in new tab
          <ArrowUpRight size={12} />
        </a>
      }
    />
  );
}
