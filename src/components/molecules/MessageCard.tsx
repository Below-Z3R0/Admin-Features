import { Paragraph, Span, Title5 } from "../server-components";
import { MessageCardProps } from "../types"

export function MessageCard({ content }: MessageCardProps) {

    return (
        <article className="rounded-lg flex flex-col justify-between group relative bg-card p-7 transition-all duration-400 ease-out hover:-translate-y-1 cursor-default h-full shadow-xs">
            <div className="absolute bottom-0 left-0 h-0.5 bg-accent w-0 transition-all duration-500 group-hover:w-full" />
            <div>
                <header className="flex flex-col gap-5">
                    <Span className="uppercase text-accent-light!" txt={content.who} />
                    <Title5 className="text-accent-alt!" txt={content.title} />
                </header>

                <blockquote>
                    <Paragraph className="mb-10" txt={content.message} />
                </blockquote>
            </div>

            <footer className="flex gap-1.5 flex-wrap">
                {content.ch.map((tag) => (
                    <Span
                        key={tag}
                        className="uppercase px-2 py-1 bg-surface  transition-colors duration-300"
                        txt={tag}
                    />
                ))}
            </footer>
        </article>
    )
}