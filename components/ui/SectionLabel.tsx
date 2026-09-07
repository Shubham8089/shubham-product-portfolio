interface SectionLabelProps {
  number: string;
  label: string;
  title: string;
  description?: string;
}

export function SectionLabel({ number, label, title, description }: SectionLabelProps) {
  return (
    <div className="relative mb-4 sm:mb-8 lg:mb-14">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 select-none font-mono text-[4.5rem] font-bold leading-none text-text opacity-[0.04] sm:-top-8 sm:text-[6.5rem] lg:-top-10 lg:text-[10rem]"
      >
        {number}
      </span>
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {number} / {label}
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-text sm:mt-3 sm:text-2xl lg:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 max-w-xl text-sm text-text-muted sm:mt-3 sm:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
