import { FadeUp } from "../animations/Animations";
import { Paragraph, Span, Title5 } from "../server-components";
import { PersonaCardProps } from "../types";

export function PersonasCard({ content, delay, index }: PersonaCardProps) {
    return (
        <FadeUp delay={delay}>
            <article className="group relative p-6 rounded-lg border border-border-subtle bg-card hover:border-accent/40 hover:shadow-md transition-all duration-300 cursor-default h-full min-h-55 flex flex-col">
                <header className="mb-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-accent-soft mb-3">
                        <Span 
                            className="text-base font-sans font-bold text-accent leading-none" 
                            txt={(index + 1).toString().padStart(2, '0')} 
                        />
                    </div>
                    <Title5 
                        className="uppercase text-main font-sans font-semibold text-sm tracking-wide" 
                        txt={content.title} 
                    />
                </header>
                <Paragraph 
                    className="text-sm text-body leading-relaxed" 
                    txt={content.paragraph} 
                />
            </article>
        </FadeUp>
    )
}
