import { FadeUp } from "../animations/Animations";
import { Paragraph, Span, Title5 } from "../server-components";
import { IpmMethodCardProps } from "../types";

export function IpmMethodCard({ content, delay, index }: IpmMethodCardProps) {
  return (
    <FadeUp delay={delay}>
      <article className="group border-t border-border-subtle py-5.5 flex gap-4.5 items-start cursor-default">

        <Span 
          className="text-surface min-w-11.5 transition-colors duration-400 group-hover:text-accent" 
          txt={(index + 1).toString().padStart(2, '0')} 
        />

        <div>
          <header>
            <Title5 className="mb-1.5 text-accent-light!" txt={content.title} />
          </header>

          <Paragraph className="mb-1.5" txt={content.description} />
          
          <footer>
            <Span className="uppercase font-bold" txt={content.prods} />
          </footer>

        </div>
      </article>
    </FadeUp>
  )
}