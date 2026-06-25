import { Title } from "../types";

export function Span2({ txt, className }: Title) {
    return (
        <span className={`text-dim font-sans text-[14px] md:text-[15px] text-balance tracking-wide leading-tight text-left font-medium ${className} `}>
            {txt}
        </span>
    )
}