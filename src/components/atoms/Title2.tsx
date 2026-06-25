import { Title } from "../types";

export function Title2({ txt, className }: Title) {
    return (
        <h2 className={`text-main font-sans font-semibold tracking-tight leading-tight text-balance ${className} `}>
            {txt}
        </h2>
    )
}
