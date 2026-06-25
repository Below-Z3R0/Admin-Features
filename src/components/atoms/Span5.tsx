import { Title } from "../types";

export function Span5({ txt, className }: Title) {
    return (
        <span className={`text-dim text-[10px] md:text-[11px] text-balance tracking-wider leading-normal text-left uppercase font-bold ${className} `}>
            {txt}
        </span>
    )
}