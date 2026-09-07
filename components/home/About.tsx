import { Download, ExternalLink, GitBranch, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CONTACT } from "@/lib/contact";

const TIMELINE = [
  {
    company: "SpotDraft",
    role: "Technical Product Manager",
    period: "Feb 2026 - Present",
    detail: "Owns the full integrations portfolio for this contract lifecycle management platform.",
  },
  {
    company: "Ozonetel Communications",
    role: "Associate Product Manager",
    period: "Jul 2024 - Feb 2026",
    detail: "Sole PM for the OneCXi CCaaS platform, serving HDFC, BigBasket, Star Health, and DishTV.",
  },
  {
    company: "Mudrantar",
    role: "Associate Product Manager",
    period: "Mar 2023 - Jun 2024",
    detail: "Rebuilt a B2B tax compliance SaaS from V1 to V2 for 1,000+ chartered accountant firms.",
  },
  {
    company: "Official Network Enterprise",
    role: "Co-founder",
    period: "May 2020 - Jul 2022",
    detail: "Ran a digital agency alongside university, growing it to ₹15L in revenue across 15+ clients with a team of six.",
  },
];

export function About() {
  return (
    <section id="about" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-16 px-6 lg:grid-cols-[1fr_1.3fr]">
        <ScrollReveal>
          <div>
            <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-amber-500/30 via-orange-500/15 to-transparent" />
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-text">About</h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-text-muted">
              Product Manager with 3+ years driving product-led growth across B2B SaaS (CCaaS,
              CLM, productivity tools) for global mid-market and enterprise customers. I build
              for outcomes, with enterprise-safe, compliance-first design as the default, not an
              afterthought.
            </p>
            <div className="mt-6 space-y-1 text-sm text-text-muted">
              <p>B.Tech, Information Technology</p>
              <p>Government College of Engineering, Karad (2022)</p>
              <p className="text-text-faint">
                GrowthX: led a month-long CCaaS lifecycle deep-dive via 50+ stakeholder interviews
              </p>
              <p className="pt-2 text-text-faint">{CONTACT.location}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
              >
                <Mail size={15} />
                Email
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
              >
                <ExternalLink size={15} />
                LinkedIn
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
              >
                <GitBranch size={15} />
                GitHub
              </a>
              <a
                href="/resume"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
              >
                <Download size={14} />
                Resume
              </a>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {TIMELINE.map((item, i) => (
            <ScrollReveal key={item.company} delay={i * 0.08}>
              <div className="flex gap-6 border-b border-border pb-8 last:border-0">
                <p className="w-28 shrink-0 pt-0.5 font-mono text-xs text-text-faint">
                  {item.period}
                </p>
                <div>
                  <h3 className="text-base font-semibold text-text">{item.company}</h3>
                  <p className="mt-0.5 text-sm text-accent">{item.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.detail}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
