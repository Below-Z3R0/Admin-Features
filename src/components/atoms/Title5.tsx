import { Title } from "../types";

export function Title5({ txt, className }: Title) {
    return (
        <h5 className={`text-dim text-[13px] md:text-[14px] text-balance tracking-normal leading-normal text-left font-medium ${className} `}>
            {txt}
        </h5>
    )
}