import { FadeUp } from "../animations/Animations";
import { Paragraph, Span } from "../server-components";
import { EthicCardProps } from "../types";

export function EthicCard({ content, delay, index }: EthicCardProps) {
    return (
        <FadeUp delay={delay}>
            <article className="rounded-lg bg-card p-6.5  h-full duration-300 transition-transform hover:bg-hover hover:-translate-y-1">
                <span className="text-[30px] font-light text-accent-light! block mb-2.5">
                    {`0${index + 1}`}
                </span>

                <header>
                    <Span className="text-[13px] font-medium mb-2 " txt={content.title} />
                </header>

                <Paragraph className="text-[12px] text-dim/70" txt={content.paragraph} />

            </article>
        </FadeUp >
    )
}