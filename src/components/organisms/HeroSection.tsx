import { FadeUp } from '../animations/Animations';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { HeroLabel, Paragraph, Span, Title1, Title2 } from '../server-components';
import { HeroProps } from '../types';

export function HeroSection({ content }: HeroProps) {
  return (
    <section
      className="relative bg-page min-h-screen pt-28 md:pt-40 pb-20 px-6 md:px-12 overflow-hidden"
      aria-labelledby="hero-title"
      id="top"
    >
      {/* Background gradient decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-mid/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Top badge */}
        <FadeUp delay={0.05}>
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-mid bg-card/50 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-body">{content.firm}</span>
            </div>
          </div>
        </FadeUp>

        {/* Contenedor principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start w-full">
          
          {/* Lado Izquierdo: Títulos */}
          <header className="flex flex-col gap-6 w-full text-center lg:text-left">
            <FadeUp delay={0.1}>
              <Title1 
                className="text-[clamp(2.5rem,6vw,5rem)] font-sans font-bold leading-[1.05] tracking-tight" 
                txt={content.title} 
              />
            </FadeUp>

            <FadeUp delay={0.16}>
              <Title2 
                className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-sans font-normal text-body leading-relaxed" 
                txt={content.subtitle} 
              />
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.22}>
              <div className="flex flex-wrap items-center gap-3 mt-4 justify-center lg:justify-start">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-accent hover:bg-accent-alt text-page text-sm font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Agendar consulta
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#metodo"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-border-mid hover:border-accent text-main text-sm font-medium rounded-md transition-all duration-200 hover:bg-hover"
                >
                  Conocer método
                </a>
              </div>
            </FadeUp>
          </header>

          {/* Lado Derecho: Descripción y características */}
          <div className="flex flex-col gap-6 w-full max-w-lg mx-auto lg:mx-0">
            <FadeUp delay={0.28}>
              <Paragraph 
                className="text-body text-base leading-relaxed" 
                txt={content.card.paragraph} 
              />
            </FadeUp>

            <FadeUp delay={0.32}>
              <div className="p-4 rounded-lg border border-border-mid bg-card/50 backdrop-blur-sm">
                <Paragraph 
                  className="text-main font-medium text-sm leading-relaxed" 
                  txt={content.card.promise} 
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.36}>
              <ul className="flex flex-col gap-2.5" role="list">
                {content.card.smallcard.map((label, index) => {
                  const Icon = index === 0 ? Zap : index === 1 ? Shield : Sparkles;
                  return (
                    <li 
                      key={index} 
                      className="flex items-center gap-3 p-3 rounded-md border border-border-subtle bg-card/30 hover:border-accent/30 hover:bg-card/60 transition-all duration-200"
                    >
                      <div className="flexShrink-0 w-8 h-8 rounded-md bg-accent-soft flex items-center justify-center">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <HeroLabel content={label} />
                    </li>
                  );
                })}
              </ul>
            </FadeUp>
          </div>
        </div>

        {/* Footer del Hero: Brand bar */}
        <FadeUp delay={0.42}>
          <div className="hidden md:block mt-24 pt-8 border-t border-border-subtle">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3">
              {content.brand.map((item, index) => (
                <Span 
                  key={index} 
                  className="text-[11px] tracking-wider uppercase text-muted font-medium" 
                  txt={item} 
                />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
