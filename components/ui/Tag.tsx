import type { Category } from "@/lib/projects";

const CATEGORY_CLASSES: Record<Category, string> = {
  B2B: "bg-[var(--tag-b2b-bg)] text-[var(--tag-b2b-text)]",
  B2C: "bg-[var(--tag-b2c-bg)] text-[var(--tag-b2c-text)]",
  AI: "bg-[var(--tag-ai-bg)] text-[var(--tag-ai-text)]",
};

export function CategoryTag({ category }: { category: Category }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${CATEGORY_CLASSES[category]}`}
    >
      {category}
    </span>
  );
}

export function PlainTag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
      {label}
    </span>
  );
}
