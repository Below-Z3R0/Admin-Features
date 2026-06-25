import { FadeUp } from '../animations/Animations';
import { MiniTitle, Paragraph, ServiceCard, Title2 } from '../server-components';
import { ServicesProps } from '../types';

export function ServicesDesksSection({ content, card }: ServicesProps) {
  return (
    <section id="servicios" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12 max-w-3xl"> 
          <FadeUp>
            <MiniTitle content={content.minititle} />
            <Title2 
              className="mt-4 mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" 
              txt={content.title} 
            />
          </FadeUp>

          <FadeUp delay={0.06}>
            <Paragraph 
              className="text-base md:text-lg text-body leading-relaxed max-w-2xl" 
              txt={content.description} 
            />
          </FadeUp>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
          {card.map((desk, index) => {
            return (
              <div key={index} role="listitem" className="size-full">
                <ServiceCard
                  content={desk}
                  delay={0.15 + (index * 0.08)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
