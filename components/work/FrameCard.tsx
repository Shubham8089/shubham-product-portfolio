import type { ReactNode } from "react";

export function FrameCard({
  src,
  title,
  actions,
}: {
  src: string;
  title: string;
  actions: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-hover px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-text-faint/40" />
          <span className="h-2 w-2 rounded-full bg-text-faint/40" />
          <span className="h-2 w-2 rounded-full bg-text-faint/40" />
        </div>
        <div className="flex items-center gap-4">{actions}</div>
      </div>
      <iframe
        src={src}
        title={title}
        className="h-[70vh] min-h-[420px] w-full bg-surface-hover sm:h-[80vh]"
      />
    </div>
  );
}
