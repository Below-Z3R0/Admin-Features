import { FadeUp } from '../animations/Animations';
import { Mail, ArrowRight } from 'lucide-react';
import { CtaForm } from '../client-components';
import { LinkButton, Paragraph, Span, Title2 } from '../server-components';
import { CtaSectionProps } from '../types';

export function CtaSection({ content, form }: CtaSectionProps) {
  return (
    <section id="contacto" className="py-24 md:py-32 text-center bg-page relative overflow-hidden transition-colors duration-300">
      {/* Decorative gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className='max-w-7xl content-container relative z-10'>
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center justify-center">
          <FadeUp>
            <header className="flex flex-col items-center justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-mid bg-card/50 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <Span 
                  className="text-[11px] tracking-widest uppercase text-accent font-semibold" 
                  txt={content.minititle} 
                />
              </div>
              <Title2 
                className="text-[clamp(1.75rem,4vw,3rem)] font-sans font-semibold leading-tight text-main" 
                txt={content.title} 
              />
            </header>
            <Paragraph 
              className="text-base md:text-lg text-body text-center leading-relaxed max-w-2xl mx-auto mb-8" 
              txt={content.paragraph} 
            />
          </FadeUp>

          {/* Formulario de suscripción/contacto */}
          <FadeUp delay={0.12}>
            <div className="w-full max-w-md mb-4">
              <CtaForm content={form} />
            </div>

            <Paragraph 
              className="text-xs text-muted mt-3 italic" 
              txt={content.eslogan} 
            />
            
            <LinkButton
              link={`mailto:${content.email || "miguel@centenoadvisory.com"}`}
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-alt transition-all mt-4 font-medium"
              txt={content.email}
              svg={Mail}
            />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
