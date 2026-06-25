import { FadeUp } from "../animations/Animations";
import { Check } from "lucide-react";
import { Paragraph, Span, Title4 } from "../server-components";
import { DifferentiatorCardProps } from "../types";

export function DiferentiatorsCard({ content, delay }: DifferentiatorCardProps) {
  return (
    <FadeUp delay={delay}>
      <article className="group relative flex flex-col p-5 rounded-lg border border-border-subtle bg-card hover:border-accent/40 hover:shadow-md transition-all duration-300 cursor-default h-full">
        <header className="flex items-start gap-3 mb-2">
          <div className="flexShrink-0 w-6 h-6 rounded-md bg-accent-soft flex items-center justify-center mt-0.5">
            <Check className="w-3.5 h-3.5 text-accent" />
          </div>
          <div className="flex-1">
            <Span 
              className="text-xs text-muted font-medium uppercase tracking-wider" 
              txt={`vs. ${content.vs}`} 
            />
            <Title4 
              className="font-sans font-semibold text-main text-base mt-1" 
              txt={content.title} 
            />
          </div>
        </header>
        <Paragraph 
          className="text-sm text-body leading-relaxed pl-9" 
          txt={content.description} 
        />
      </article>
    </FadeUp>
  )
}
