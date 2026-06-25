import { Title } from "../types";

export function Span4({ txt, className }: Title) {
    return (
        <span className={`text-dim text-[11px] md:text-[12px] text-balance tracking-normal leading-snug text-left font-normal ${className} `}>
            {txt}
        </span>
    )
}