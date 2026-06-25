import { Title } from "../types";

export function Title4({ txt, className }: Title) {
    return (
        <h4 className={`text-dim font-sans text-lg md:text-xl text-balance tracking-normal leading-snug text-left font-semibold ${className} `}>
            {txt}
        </h4>
    )
}