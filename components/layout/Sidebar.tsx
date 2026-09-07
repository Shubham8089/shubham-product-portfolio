"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  Search,
  Compass,
  Hammer,
  TrendingUp,
  Link2,
  Rocket,
  User,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "top", label: "Home", icon: Home },
  { id: "research", label: "Research", icon: Search },
  { id: "strategy", label: "Strategy", icon: Compass },
  { id: "build", label: "Build", icon: Hammer },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "integrate", label: "Integrate", icon: Link2 },
  { id: "startups", label: "Startups", icon: Rocket },
  { id: "about", label: "About", icon: User },
];

function useActiveSection() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sectionIds = NAV_ITEMS.filter((n) => n.id !== "top").map((n) => n.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    function onScroll() {
      if (window.scrollY < 400) {
        setActive("top");
        return;
      }
      let current = "top";
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= 160) {
          current = el.id;
        }
      }
      setActive(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: (typeof NAV_ITEMS)[number];
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const href = item.id === "top" ? "/" : `/#${item.id}`;

  function handleClick(e: React.MouseEvent) {
    if (item.id === "top" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onNavigate?.();
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`group flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5 transition-colors duration-200 ${
        active
          ? "bg-accent/10 text-accent"
          : "text-text-muted hover:bg-surface-hover hover:text-text"
      }`}
    >
      <Icon size={18} strokeWidth={active ? 2.3 : 1.8} />
      <span className="font-mono text-[9px] uppercase tracking-wider">{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  const active = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[88px] flex-col items-center overflow-y-auto border-r border-border bg-bg py-4 lg:flex">
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.id} item={item} active={active === item.id} />
          ))}
        </nav>
        <div className="mt-auto flex flex-col items-center gap-2 pt-4">
          <Link
            href="/resume"
            className="group flex flex-col items-center gap-1.5 rounded-xl px-3 py-2 text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text"
          >
            <FileText size={18} strokeWidth={1.8} />
            <span className="font-mono text-[9px] uppercase tracking-wider">Resume</span>
          </Link>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-bg/90 px-5 py-3 backdrop-blur-md lg:hidden">
        <Link href="/" className="font-mono text-sm tracking-tight text-text">
          Shubham Bhosale
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-border-strong"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[57px] z-30 flex flex-col gap-1 overflow-y-auto bg-bg px-4 py-6 lg:hidden">
          {[...NAV_ITEMS, { id: "resume", label: "Resume", icon: FileText }].map((item) => {
            const Icon = item.icon;
            const href =
              item.id === "top" ? "/" : item.id === "resume" ? "/resume" : `/#${item.id}`;
            return (
              <Link
                key={item.id}
                href={href}
                onClick={(e) => {
                  if (item.id === "top" && window.location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  setMobileOpen(false);
                }}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base transition-colors ${
                  active === item.id
                    ? "bg-accent/10 text-accent"
                    : "text-text-muted hover:bg-surface-hover"
                }`}
              >
                <Icon size={20} strokeWidth={1.8} />
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
