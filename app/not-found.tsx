import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-text sm:text-4xl">
        This node isn&apos;t in the loop.
      </h1>
      <p className="mt-4 max-w-sm text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist, or moved somewhere the loop hasn&apos;t
        reached yet.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-border px-5 py-2.5 text-sm text-text transition-colors hover:border-accent hover:text-accent"
      >
        Back to the loop
      </Link>
    </div>
  );
}
