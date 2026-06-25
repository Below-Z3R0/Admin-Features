import { Title } from "../types";

export function Span3({ txt, className }: Title) {
    return (
        <span className={`text-dim text-[13px] text-balance tracking-tight leading-tight text-left font-medium ${className} `}>
            {txt}
        </span>
    )
}