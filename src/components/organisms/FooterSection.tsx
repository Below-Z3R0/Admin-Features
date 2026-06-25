import { CA_HorizoltalIcon } from "@/assets/Icons";
import { LinkButton, Paragraph } from "../server-components";
import type { FooterProps } from "../types";

export async function Footer({ data }: FooterProps) {
  return (
    <footer className="w-full py-10 border-t border-border-subtle bg-card/50 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top: Branding & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-start">

          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <CA_HorizoltalIcon className="h-14 w-32 opacity-90 text-main" />
            <Paragraph
              className="text-xs text-muted mt-3 leading-relaxed max-w-xs text-center md:text-left"
              txt={data.description}
            />
          </div>

          {/* Center Tagline */}
          <div className="self-center flex justify-center">
            <Paragraph
              className="font-sans text-sm font-medium text-body leading-relaxed whitespace-pre-line text-center max-w-md"
              txt={data.eslogan}
            />
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-end gap-2">
            {data.links.map((link, index) => (
              <LinkButton
                key={index}
                link={link.id}
                txt={link.name}
                txtcolor="text-sm!"
                className="text-sm font-medium text-body hover:text-accent transition-colors"
              />
            ))}
          </div>
        </div>

        {/* Bottom: Legal & Domain */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-border-subtle gap-4">
          <div className="flex flex-wrap justify-center sm:flex-row sm:justify-start gap-4 text-muted">
            <span className="text-xs font-medium">
              {data.legal}
            </span>
            <span className="text-xs font-medium">
              {data.mici}
            </span>
          </div>

          <span className="text-xs text-accent font-semibold tracking-wide">
            {data.email}
          </span>
        </div>
      </div>
    </footer>
  );
}
