import { PROJECTS, STAGES } from "@/lib/projects";
import { CONTACT } from "@/lib/contact";

export const CHAT_MODEL = "claude-sonnet-5";

export const SYSTEM_PROMPT = `You are an AI assistant embedded in Shubham Bhosale's product management portfolio. Answer questions about his work, projects, skills, and experience using only the context provided below. Be concise, specific, and reference actual projects by name. If something isn't covered in the context, say you don't have that detail rather than guessing. Never use em-dashes or en-dashes in your responses, use commas or parentheses instead.`;

export function buildPortfolioContext(): string {
  const sections = STAGES.map((stage) => {
    const projects = PROJECTS.filter((p) => p.stage === stage.id);
    const lines = projects.map((p) => {
      const detail = p.content
        ? ` Context: ${p.content.context} Problem: ${p.content.problem} Process: ${p.content.process} Outcome: ${p.content.outcome}`
        : "";
      return `- ${p.title} [${p.categories.join(", ")}]: ${p.oneLiner}${detail}`;
    });
    return `## ${stage.label} (${stage.title})\n${lines.join("\n")}`;
  });

  const resume = `## Summary\nProduct Manager with 3+ years driving product-led growth across B2B SaaS (CCaaS, CLM, productivity tools) for global mid-market and enterprise customers. Builds for outcomes, where enterprise-safe, compliance-first design is the default.\n\n## Career\n- SpotDraft, Technical Product Manager (Feb 2026 to present): owns the full integrations portfolio, 80+ connectors across CRM, P2P, HRIS, and cloud storage, ~$290K integration ARR, public developer portal cutting tickets 60%.\n- Ozonetel Communications, Associate Product Manager (Jul 2024 to Feb 2026): sole PM for OneCXi CCaaS (~100K DAU) serving HDFC, BigBasket, Star Health, DishTV. Cut agent wrap time to 10-20s with Automated After-Call Work, grew digital channel licenses 25% (Omnichannel Interactions, Template Management, WhatsApp Calling), integrated Truecaller, drove technical enablement for integration and reseller partners.\n- Mudrantar, Associate Product Manager (Mar 2023 to Jun 2024): rebuilt EZTaxPractice from V1 to V2 for 1,000+ CA firms in the regulated tax domain, shipped an HRMS module, drove 40% adoption growth, built a public CA directory of 1,000+ firms as an inbound acquisition channel.\n- Official Network Enterprise, Co-founder (May 2020 to Jul 2022): digital agency, team of six, 15+ clients across hospitality, healthcare, retail, and education, grew it to ₹15L in revenue, delivered 10+ responsive websites and API integrations (booking engines, healthcare, Google My Business, payment gateway).\n\n## Education\n- B.Tech Information Technology, Government College of Engineering Karad (2022)\n\n## Certification\n- GrowthX: month-long CCaaS lifecycle deep-dive via 50+ stakeholder interviews across product, sales, and support\n\n## Skills\nProduct: Product Strategy, GTM, 0 to 1, Roadmapping, Adoption and Activation\nTechnical: API Integrations, Developer Portals, API Debugging, No code Automation\nResearch: User Research, Market Research, Customer Journey Mapping\nTools: Figma, Postman, Clay, MS Clarity, Mautic, n8n, Tray.io\n\n## Contact\nEmail: ${CONTACT.email}, Phone: ${CONTACT.phone}, Location: ${CONTACT.location}, LinkedIn: ${CONTACT.linkedin}`;

  return [resume, ...sections].join("\n\n");
}
