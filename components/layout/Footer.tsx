import { ExternalLink, GitBranch, Mail } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 py-10 text-sm text-text-muted sm:flex-row sm:justify-between">
        <p>Shubham Bhosale</p>
        <div className="flex items-center gap-5">
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-text"
          >
            <Mail size={14} />
            Email
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-text"
          >
            <ExternalLink size={14} />
            LinkedIn
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-text"
          >
            <GitBranch size={14} />
            GitHub
          </a>
        </div>
        <p className="font-mono text-xs text-text-faint">
          Built with Next.js, deployed on Vercel
        </p>
      </div>
    </footer>
  );
}
