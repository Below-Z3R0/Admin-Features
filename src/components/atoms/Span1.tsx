import { Title } from "../types";

export function Span1({ txt, className }: Title) {
    return (
        <span className={`text-dim font-sans text-3xl md:text-4xl text-balance tracking-tighter leading-[1.1] text-left font-semibold ${className}`}>
            {txt}
        </span>
    )
}