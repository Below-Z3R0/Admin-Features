import { FadeUp } from '../animations/Animations';
import { MiniTitle, PersonasCard, Title2 } from '../server-components';
import { PersonasProps } from '../types';

export function PersonasSection({ content, card }: PersonasProps) {
  return (
    <section id="para-quien" className="py-20 md:py-28 bg-page transition-colors duration-300">
      <div className="max-w-7xl content-container">
        <header className="mb-12">
          <FadeUp>
            <MiniTitle content={content.minititle} />
          </FadeUp>

          <FadeUp delay={0.06}>
            <Title2 
              className="mb-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-sans font-semibold leading-tight text-main" 
              txt={content.title} 
            />
          </FadeUp>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {card.map((personas, index) => (
            <PersonasCard key={index} content={personas} delay={index * 0.06} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
