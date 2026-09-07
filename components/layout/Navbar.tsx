"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-text transition-colors hover:text-accent"
        >
          Shubham Bhosale
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/#work"
            className="hidden text-sm text-text-muted transition-colors hover:text-text sm:inline"
          >
            Work
          </Link>
          <Link
            href="/#startups"
            className="hidden text-sm text-text-muted transition-colors hover:text-text sm:inline"
          >
            Startups
          </Link>
          <Link
            href="/#about"
            className="hidden text-sm text-text-muted transition-colors hover:text-text sm:inline"
          >
            About
          </Link>
          <Link
            href="/resume"
            className="hidden text-sm text-text-muted transition-colors hover:text-text sm:inline"
          >
            Resume
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
