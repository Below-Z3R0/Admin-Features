import { Title } from "../types";

export function Title3({ txt, className }: Title) {
    return (
        <h3 className={`text-dim font-serif text-3xl md:text-4xl text-balance tracking-tight leading-normal text-left font-semibold ${className} `}>
            {txt}
        </h3>
    )
}