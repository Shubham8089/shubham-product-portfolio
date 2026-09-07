interface SectionLabelProps {
  number: string;
  label: string;
  title: string;
  description?: string;
}

export function SectionLabel({ number, label, title, description }: SectionLabelProps) {
  return (
    <div className="relative mb-14">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 select-none font-mono text-[8rem] font-bold leading-none text-text opacity-[0.04] sm:text-[10rem]"
      >
        {number}
      </span>
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {number} / {label}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-3 max-w-xl text-base text-text-muted">{description}</p>
        )}
      </div>
    </div>
  );
}
