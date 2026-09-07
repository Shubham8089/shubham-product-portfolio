import { Download, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CONTACT } from "@/lib/contact";

const EXPERIENCE = [
  {
    company: "SpotDraft",
    role: "Technical Product Manager",
    period: "Feb 2026 - Present",
    location: "Contract Lifecycle Management (B2B SaaS), Bengaluru",
    bullets: [
      "Owned SpotDraft's full integrations portfolio as Integrations PM: 80+ out-of-the-box connectors across CRM, P2P, HRIS, and cloud storage (Google Drive, SharePoint, Dropbox, Box, Egnyte, OneDrive) syncing 50K+ documents.",
      "Ran 100+ customer scoping calls with sales, procurement, security, and legal GC/CLO stakeholders across NAM, EU, and APAC, enabling $200K in integration ARR.",
      "Built and maintained a public developer portal with self-serve onboarding and documentation, cutting integration-related support tickets and clarifications by 60%.",
    ],
  },
  {
    company: "Ozonetel Communications",
    role: "Associate Product Manager",
    period: "Jul 2024 - Feb 2026",
    location: "OneCXi, Contact Center as a Service (B2B SaaS), Hyderabad",
    bullets: [
      "Sole PM for OneCXi CCaaS (~100K DAU), serving India's leading enterprises including HDFC, BigBasket, Star Health, and DishTV.",
      "Cut agent wrap time from ~60s to 10-20s per call by shipping Automated After-Call Work, where agents review and approve AI generated notes instead of typing manually.",
      "Grew digital channel licenses by 25% by elevating the digital channel portfolio (Omnichannel Interactions, Template Management, WhatsApp Calling) with configurable roles and permissions, admin bulk actions, and audit logging.",
      "Owned the compliance workstream (TRAI/DND, max-dialing rules, audit logging), integrated Truecaller for call-pickup probability, and drove technical enablement for integration and reseller partners.",
    ],
  },
  {
    company: "Mudrantar",
    role: "Associate Product Manager",
    period: "Mar 2023 - Jun 2024",
    location: "B2B SaaS for Chartered Accountants (early stage startup), Hyderabad",
    bullets: [
      "PM for EZTaxPractice (1K+ CA firms), running user interviews, onboarding calls, and market research to rebuild the product V1 to V2 in a complex regulated tax domain (GST, ITR, filing compliance).",
      "Shipped recurring compliance automation and an HRMS module (attendance, leave, and holiday management), driving 40% adoption growth across the CA customer base.",
      "Built a public CA directory of 1,000+ firms with an inline inquiry form feeding leads directly into the EZTaxPractice portal as an inbound acquisition channel.",
    ],
  },
  {
    company: "Official Network Enterprise",
    role: "Co-founder",
    period: "May 2020 - Jul 2022",
    location: "Brand and digital agency, while at college",
    bullets: [
      "Co-founded and ran a digital agency while studying, growing it to ₹15L in revenue across 15+ clients in hospitality, healthcare, retail, and education, owning marketing strategy, SEO, and 10+ responsive websites, with a team of 6.",
      "Delivered websites, custom builds, and API integrations (booking engines, healthcare, Google My Business, payment gateway).",
    ],
  },
];

const SIDE_PROJECTS = [
  {
    name: "Sentinel",
    tag: "live",
    detail: "DPDP compliance platform (Consent, Trust Center, DSAR and TPRM).",
  },
  {
    name: "Intlus",
    tag: "live",
    detail: "PRM for B2B SaaS (CRM, commissions, tickets, AI chatbot, Slack).",
  },
  {
    name: "Syncing GCEK",
    tag: "live",
    detail: "Alumni community platform, 1,500+ users, 5,000+ monthly visits.",
  },
];

const SKILLS = [
  { label: "Product", items: "Product Strategy, GTM, 0 to 1, Roadmapping, Adoption & Activation" },
  { label: "Technical", items: "API Integrations, Developer Portals, API Debugging, No code Automation" },
  { label: "Research", items: "User Research, Market Research, Customer Journey Mapping" },
  { label: "Tools", items: "Figma, Postman, Clay, MS Clarity, Mautic, n8n, Tray.io" },
];

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-[820px] px-6 py-28">
      <ScrollReveal>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Shubham Bhosale
            </h1>
            <p className="mt-2 text-lg text-text-muted">Product Manager</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
              <a href={`mailto:${CONTACT.email}`} className="hover:text-text">
                {CONTACT.email}
              </a>
              <span className="text-text-faint">{CONTACT.phone}</span>
              <span className="text-text-faint">{CONTACT.location}</span>
              <span className="text-text-faint">{CONTACT.shortLink}</span>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-text"
              >
                {CONTACT.linkedinLabel}
              </a>
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-text"
              >
                {CONTACT.githubLabel}
              </a>
            </div>
          </div>
          <a
            href={CONTACT.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            <Download size={14} />
            Download Resume
          </a>
        </div>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-muted">
          Product Manager with 3+ years driving product-led growth across B2B SaaS (CCaaS, CLM,
          productivity tools) for global mid-market and enterprise customers. Builds for
          outcomes, where enterprise-safe, compliance-first design is the default.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
            Work Experience
          </h2>
          <div className="mt-6 space-y-10">
            {EXPERIENCE.map((job) => (
              <div key={job.company} className="border-b border-border pb-10 last:border-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-text">{job.company}</h3>
                  <p className="font-mono text-xs text-text-faint">{job.period}</p>
                </div>
                <p className="text-sm text-accent">{job.role}</p>
                <p className="mt-1 text-xs text-text-faint">{job.location}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-text-muted">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mt-16 grid gap-16 sm:grid-cols-2">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
              Education
            </h2>
            <div className="mt-6 space-y-1 text-sm text-text-muted">
              <p className="text-text">B.Tech, Information Technology</p>
              <p>Govt. College of Engineering, Karad</p>
              <p className="text-text-faint">2022</p>
            </div>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
              Certification
            </h2>
            <div className="mt-6 space-y-1 text-sm text-text-muted">
              <p className="text-text">GrowthX (project)</p>
              <p>
                Month-long CCaaS lifecycle deep dive via 50+ stakeholder interviews across
                product, sales, and support.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
            Side Projects
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {SIDE_PROJECTS.map((p) => (
              <div key={p.name}>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-text">
                  {p.name}
                  <ExternalLink size={12} className="text-accent" />
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mt-16">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
            Skills
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {SKILLS.map((s) => (
              <div key={s.label}>
                <p className="text-sm font-semibold text-text">{s.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">{s.items}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
