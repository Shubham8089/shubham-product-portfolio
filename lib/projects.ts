export type Category = "B2B" | "B2C" | "AI";

export type LoopStage = "research" | "strategy" | "build" | "growth" | "integrate";

export interface StageMeta {
  id: LoopStage;
  number: string;
  label: string;
  title: string;
  blurb: string;
}

export const STAGES: StageMeta[] = [
  {
    id: "research",
    number: "01",
    label: "Research",
    title: "Understanding the problem",
    blurb: "Market teardowns, user research, and competitive analysis before a line of spec is written.",
  },
  {
    id: "strategy",
    number: "02",
    label: "Strategy",
    title: "Deciding what to build",
    blurb: "GTM plans, acquisition strategy, and monetisation calls for early-stage products.",
  },
  {
    id: "build",
    number: "03",
    label: "Build",
    title: "Shipping the thing",
    blurb: "Products taken from spec to production, some by teams, some solo with an IDE and an API key.",
  },
  {
    id: "growth",
    number: "04",
    label: "Growth",
    title: "Making it stick",
    blurb: "Onboarding, activation, and retention work once the product is live and needs to earn usage.",
  },
  {
    id: "integrate",
    number: "05",
    label: "Integrate",
    title: "Connecting the ecosystem",
    blurb: "Integration portfolios, developer portals, and the plumbing that makes a product sit inside a stack.",
  },
];

export interface CaseStudyContent {
  context: string;
  problem: string;
  process: string;
  outcome: string;
}

export interface Project {
  slug: string;
  title: string;
  stage: LoopStage;
  categories: Category[];
  tags: string[];
  oneLiner: string;
  externalUrl?: string;
  liveUrl?: string;
  /** Card thumbnail and case study hero image. 1200x675 (16:9), jpg/png/webp. Falls back to a generated gradient when absent. */
  image?: string;
  content?: CaseStudyContent;
  /** Founder-track ventures only: the single proof metric shown in the Startups section. */
  metric?: string;
  role?: string;
  clients?: { name: string; url: string; image: string }[];
}

export const PROJECTS: Project[] = [
  // Research
  {
    slug: "agent-assist-market-research",
    title: "Agent Assist Market Research",
    stage: "research",
    categories: ["AI", "B2B"],
    tags: ["CCaaS", "AI"],
    oneLiner: "Landscape study of AI agent-assist tooling across contact center platforms.",
    image: "/images/projects/agent-assist-market-research.jpg",
  },
  {
    slug: "route-optimisation-market-research",
    title: "Route Optimisation Market Research",
    stage: "research",
    categories: ["B2B"],
    tags: ["Logistics"],
    oneLiner: "Competitive scan of route optimisation players serving logistics fleets.",
    image: "/images/projects/route-optimisation-market-research.jpg",
  },
  {
    slug: "eka-care-teardown",
    title: "eka.care Teardown",
    stage: "research",
    categories: ["B2C"],
    tags: ["Healthcare"],
    oneLiner: "Product teardown of eka.care's consumer health record and booking flows.",
    image: "/images/projects/eka-care-teardown.jpg",
  },
  {
    slug: "canva-teardown",
    title: "Canva Teardown",
    stage: "research",
    categories: ["B2C"],
    tags: ["Design"],
    oneLiner: "Breaking down Canva's onboarding and template-led activation loop.",
    image: "/images/projects/canva-teardown.jpg",
  },
  {
    slug: "spotify-revenue-streams",
    title: "Spotify Revenue Streams",
    stage: "research",
    categories: ["B2C"],
    tags: ["Monetisation"],
    oneLiner: "Mapping how Spotify monetises across free, premium, and label economics.",
    image: "/images/projects/spotify-revenue-streams.jpg",
  },
  {
    slug: "youtube-music-teardown",
    title: "YouTube Music Teardown",
    stage: "research",
    categories: ["B2C"],
    tags: ["Media"],
    oneLiner: "Feature and positioning teardown of YouTube Music against category leaders.",
    image: "/images/projects/youtube-music-teardown.jpg",
  },
  {
    slug: "ambitionbox-teardown",
    title: "AmbitionBox Teardown",
    stage: "research",
    categories: ["B2C"],
    tags: ["Jobs"],
    oneLiner: "Content and trust-loop teardown of AmbitionBox's review-led acquisition.",
    image: "/images/projects/ambitionbox-teardown.jpg",
  },
  {
    slug: "fluvid-teardown",
    title: "Fluvid Teardown",
    stage: "research",
    categories: ["B2C"],
    tags: ["Video"],
    oneLiner: "Early-stage product teardown of Fluvid's core video workflow.",
    image: "/images/projects/fluvid-teardown.jpg",
  },
  {
    slug: "nxtwave-teardown",
    title: "NxtWave Teardown",
    stage: "research",
    categories: ["B2C"],
    tags: ["EdTech"],
    oneLiner: "Funnel and cohort-based teardown of NxtWave's edtech acquisition engine.",
    image: "/images/projects/nxtwave-teardown.jpg",
  },
  {
    slug: "odoo-teardown",
    title: "Odoo Teardown",
    stage: "research",
    categories: ["B2B"],
    tags: ["ERP"],
    oneLiner: "Modular architecture and pricing teardown of Odoo's ERP suite.",
    image: "/images/projects/odoo-teardown.jpg",
  },

  // Strategy
  {
    slug: "growthx-acquisition",
    title: "GrowthX Acquisition",
    stage: "strategy",
    categories: ["B2C"],
    tags: ["Hyperlocal"],
    oneLiner: "Acquisition strategy for a hyperlocal consumer product, built during GrowthX.",
    image: "/images/projects/growthx-acquisition.jpg",
  },
  {
    slug: "growthx-monetisation",
    title: "GrowthX Monetisation",
    stage: "strategy",
    categories: ["B2C"],
    tags: ["Pricing"],
    oneLiner: "Monetisation model design for a consumer product with mixed willingness to pay.",
    image: "/images/projects/growthx-monetisation.jpg",
  },
  {
    slug: "grocero-gtm",
    title: "Grocero GTM",
    stage: "strategy",
    categories: ["B2C"],
    tags: ["GTM"],
    oneLiner: "Go-to-market plan for a grocery delivery launch, sequencing channels and city rollout.",
    image: "/images/projects/grocero-gtm.jpg",
  },
  {
    slug: "getgrocery",
    title: "GetGrocery",
    stage: "strategy",
    categories: ["B2C"],
    tags: ["Hyperlocal"],
    oneLiner: "Strategy work on hyperlocal grocery positioning and supply-side incentives.",
    image: "/images/projects/getgrocery.jpg",
  },

  // Build
  {
    slug: "sentinel",
    title: "Sentinel",
    stage: "build",
    categories: ["B2B", "AI"],
    tags: ["DPDP", "Compliance"],
    oneLiner: "A production DPDP compliance platform: consent, trust center, DSAR, and vendor risk.",
    liveUrl: "https://dpdp-prod.vercel.app",
    image: "/images/projects/sentinel.jpg",
    content: {
      context:
        "India's DPDP Act introduced new obligations for consent management, data subject requests, and vendor risk that most SaaS companies have no tooling for.",
      problem:
        "Compliance teams were tracking consent, DSAR requests, and third-party vendor risk across spreadsheets, with no audit trail and no way to demonstrate compliance to auditors.",
      process:
        "Built solo end to end: consent management with a public trust center, a DSAR intake and fulfilment workflow, and a vendor risk (TPRM) module, using Claude and Cursor for implementation, Supabase for data, and Vercel for deployment.",
      outcome:
        "Live and in active use today, covering the core DPDP compliance surface area: consent capture, trust center, DSAR workflow, and vendor risk tracking.",
    },
  },
  {
    slug: "intlus",
    title: "Intlus",
    stage: "build",
    categories: ["B2B"],
    tags: ["PRM"],
    oneLiner: "A partner relationship management platform built for B2B SaaS companies.",
    liveUrl: "https://intlus.vercel.app",
    image: "/images/projects/intlus.jpg",
    content: {
      context:
        "B2B SaaS companies running partner programs typically stitch together a CRM, a ticketing tool, and a spreadsheet for commissions, with no single view of partner health.",
      problem:
        "Partner teams needed one place to track partner CRM data, commissions, support tickets, resources, and discovery, without buying multiple point tools.",
      process:
        "Designed and built a PRM covering CRM, commission tracking, ticketing, a resource library, partner discovery, a knowledge-base backed AI chatbot, and Slack integration.",
      outcome:
        "Live today, consolidating a partner workflow that would otherwise span three or four disconnected tools into one product.",
    },
  },
  {
    slug: "syncing-gcek",
    title: "Syncing GCEK",
    stage: "build",
    categories: ["B2C"],
    tags: ["Community"],
    oneLiner: "An alumni-student community platform scaled to 1,500+ users.",
    liveUrl: "https://networkventure.wixsite.com/gcekforum",
    role: "Founder",
    metric: "1,500+ active users",
    image: "/images/projects/syncing-gcek.jpg",
    content: {
      context:
        "Government College of Engineering Karad had no structured way for alumni and current students to connect for mentorship, referrals, or events.",
      problem:
        "Alumni engagement was informal and inconsistent, with no shared platform, no visibility into who was available to help, and no recurring reason to return.",
      process:
        "Led a team of ten to build and run the platform, including a recurring Alumni Connect webinar series to drive engagement beyond a one-time signup.",
      outcome:
        "Officially recognized and endorsed by the college as its community platform, not just a student side project. Sustained active usage rather than a one-time signup spike: the Alumni Connect Series gave people a recurring reason to return, scaling to 1,500+ users and 5,000+ visits.",
    },
  },
  {
    slug: "official-network-enterprise",
    title: "Official Network Enterprise",
    stage: "build",
    categories: ["B2B"],
    tags: ["Agency"],
    oneLiner: "A digital agency co-founded during university, serving 15+ clients.",
    role: "Co-founder",
    metric: "₹15L revenue",
    liveUrl: "https://networkventure.wixsite.com/one-media",
    image: "/images/projects/official-network-enterprise.jpg",
    content: {
      context:
        "Started while at university as a way to apply product and design skills to real client problems across hospitality, healthcare, retail, and education.",
      problem:
        "Small and mid-sized businesses in these sectors needed digital presence and tooling but lacked access to a dedicated in-house team.",
      process:
        "Co-founded and ran the agency with a team of six as a certified Wix Partner, managing client scoping, delivery, and account relationships across 15+ engagements.",
      outcome:
        "Grew the agency to ₹15L in revenue across 15+ client engagements over two years, run alongside university coursework, real business, not a portfolio exercise. Recognized by Government College of Engineering, Karad.",
    },
    clients: [
      {
        name: "Sharda Vidya Niketan",
        url: "https://www.shardavidyaniketan.com/",
        image: "/images/clients/sharda-vidya-niketan.jpg",
      },
      {
        name: "Raghuvanshi Healthcare",
        url: "https://www.roboticurologistpune.com/",
        image: "/images/clients/raghuvanshi-healthcare.jpg",
      },
      {
        name: "TACKLERS",
        url: "https://www.tacklers.co.in/",
        image: "/images/clients/tacklers.jpg",
      },
      {
        name: "Berln Elevators",
        url: "https://www.berlnelevators.com/",
        image: "/images/clients/berln-elevators.jpg",
      },
      {
        name: "VIDE Science Institute",
        url: "https://www.videconsultation.org/",
        image: "/images/clients/vide-science-institute.jpg",
      },
    ],
  },
  {
    slug: "feedback-portal-logistics",
    title: "Feedback Portal for Logistics Tracking",
    stage: "build",
    categories: ["B2B"],
    tags: ["Logistics", "PRD"],
    oneLiner: "A PRD for a feedback portal surfacing shipment tracking issues to logistics ops.",
    image: "/images/projects/feedback-portal-logistics.jpg",
  },
  {
    slug: "mydoctor",
    title: "MyDoctor",
    stage: "build",
    categories: ["B2C"],
    tags: ["Healthcare"],
    oneLiner: "A consumer product concept for finding and booking doctors.",
    image: "/images/projects/mydoctor.jpg",
  },
  {
    slug: "healme",
    title: "HealMe",
    stage: "build",
    categories: ["B2C"],
    tags: ["Healthcare"],
    oneLiner: "A consumer healthcare product concept focused on guided self-care.",
    image: "/images/projects/healme.jpg",
  },

  // Growth
  {
    slug: "growthx-onboarding",
    title: "GrowthX Onboarding",
    stage: "growth",
    categories: ["B2B"],
    tags: ["Onboarding"],
    oneLiner: "Onboarding redesign work for a B2B product, focused on time to first value.",
    image: "/images/projects/growthx-onboarding.jpg",
  },
  {
    slug: "growthx-engagement-retention",
    title: "GrowthX Engagement & Retention",
    stage: "growth",
    categories: ["B2C"],
    tags: ["Retention"],
    oneLiner: "Engagement and retention loops designed for a consumer product cohort.",
    image: "/images/projects/growthx-engagement-retention.jpg",
  },
  {
    slug: "ozonetel-acw",
    title: "Automated After-Call Work",
    stage: "growth",
    categories: ["B2B", "AI"],
    tags: ["CCaaS"],
    oneLiner: "AI-generated call notes that cut agent wrap time from ~60s to 10-20s.",
    image: "/images/projects/ozonetel-acw.jpg",
    content: {
      context:
        "Ozonetel's OneCXi CCaaS platform serves large contact centers including HDFC, BigBasket, Star Health, and DishTV, where every second of agent wrap time compounds across thousands of calls a day.",
      problem:
        "Agents were manually writing after-call notes, taking roughly 60 seconds per call, which limited how many calls an agent could handle and introduced inconsistent note quality.",
      process:
        "Shipped Automated After-Call Work, generating call notes automatically from the conversation, and drove adoption through rollout to existing accounts.",
      outcome:
        "Cut agent wrap time to 10-20 seconds per call and lifted adoption and productivity by 20%.",
    },
  },
  {
    slug: "ozonetel-digital-channels",
    title: "Digital Channel Portfolio, 0 to 1",
    stage: "growth",
    categories: ["B2B"],
    tags: ["CCaaS"],
    oneLiner: "Launched Ozonetel's digital channel portfolio from scratch, growing licenses 25%.",
    image: "/images/projects/ozonetel-digital-channels.jpg",
    content: {
      context:
        "OneCXi had strong voice capabilities but no structured digital channel offering for omnichannel interactions.",
      problem:
        "Customers needed omnichannel interactions, template management, and WhatsApp calling in one coherent product, not ad hoc additions, with the roles, permissions, and audit trail enterprise buyers expect.",
      process:
        "Owned the 0-to-1 build of the digital channel portfolio: Omnichannel Interactions, Template Management, and WhatsApp Calling, with configurable roles and permissions, admin bulk actions, and audit logging.",
      outcome:
        "Grew digital channel licenses by 25% following launch.",
    },
  },

  // Integrate
  {
    slug: "spotdraft-integrations",
    title: "80+ Out-of-the-Box Connectors",
    stage: "integrate",
    categories: ["B2B"],
    tags: ["CLM", "Integrations"],
    oneLiner: "Owning SpotDraft's integrations portfolio as sole PM, contributing ~$290K in ARR.",
    image: "/images/projects/spotdraft-integrations.jpg",
    content: {
      context:
        "SpotDraft is a contract lifecycle management platform where legal, procurement, and security stakeholders expect contracts to sync cleanly with the systems they already run: CRM, P2P, HRIS, and cloud storage.",
      problem:
        "Without a broad, reliable integration surface, SpotDraft risked losing enterprise deals to competitors who could plug into an existing stack.",
      process:
        "Owned the full integrations portfolio as Integrations PM: 80+ out-of-the-box connectors across CRM, P2P, HRIS, and cloud storage (Google Drive, SharePoint, Dropbox, Box, Egnyte, OneDrive), syncing 50K+ documents. Ran 100+ customer scoping calls with sales, procurement, security, and legal GC/CLO stakeholders across NAM, EU, and APAC.",
      outcome:
        "100% attach rate across roughly 800 customers, contributing ~$290K in integration ARR: $170K through API access at $2K/year across 85 accounts, and $120K through 15 custom builds.",
    },
  },
  {
    slug: "spotdraft-developer-portal",
    title: "Public Developer Portal",
    stage: "integrate",
    categories: ["B2B"],
    tags: ["Developer Experience"],
    oneLiner: "Built and maintain a self-serve developer portal, cutting support tickets 60%.",
    image: "/images/projects/spotdraft-developer-portal.jpg",
    content: {
      context:
        "Customers building custom integrations against SpotDraft's API had no self-serve documentation, so every integration question routed through support.",
      problem:
        "Support was fielding a steady stream of integration-related tickets and clarification requests that a good developer portal should resolve on its own.",
      process:
        "Built and maintain a public developer portal with self-serve onboarding and documentation for the API.",
      outcome:
        "Cut integration-related support tickets and clarifications by 60%.",
    },
  },
  {
    slug: "ozonetel-truecaller-compliance",
    title: "Truecaller Integration & Compliance",
    stage: "integrate",
    categories: ["B2B"],
    tags: ["Compliance"],
    oneLiner: "Integrated Truecaller for call-pickup probability and owned the compliance workstream.",
    image: "/images/projects/ozonetel-truecaller-compliance.jpg",
    content: {
      context:
        "OneCXi operates across geographies with strict calling regulations, including TRAI/DND rules in India and calling restrictions in the US.",
      problem:
        "Low call-pickup rates hurt agent productivity, and enabling integration and reseller partners required navigating regulatory regimes the platform hadn't been built around.",
      process:
        "Integrated Truecaller to surface call-pickup probability to agents, owned the compliance workstream covering TRAI/DND rules, max-dialing rules, and audit logging, and drove technical enablement for integration and reseller partners.",
      outcome:
        "Improved call-pickup decisioning for agents and unlocked compliant US reseller enablement.",
    },
  },
];

export function getProjectsByStage(stage: LoopStage): Project[] {
  return PROJECTS.filter((p) => p.stage === stage);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getStageMeta(stage: LoopStage): StageMeta {
  const meta = STAGES.find((s) => s.id === stage);
  if (!meta) throw new Error(`Unknown stage: ${stage}`);
  return meta;
}
