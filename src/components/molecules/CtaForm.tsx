'use client'
import { useState } from "react";
import type { CtaFormProps } from "../types";

export function CtaForm({ content }: CtaFormProps) {
    const [formVal, setFormVal] = useState("");

    return (
        <form className="flex flex-col sm:flex-row gap-0 w-full max-w-107.5 mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                placeholder={content.placeholder}
                value={formVal}
                onChange={(e) => setFormVal(e.target.value)}
                className=" rounded-lg lg:rounded-bl-lg lg:rounded-tl-lg lg:rounded-br-none lg:rounded-tr-none flex-1 px-4 py-3.5 border border-border-subtle sm:border-r-0 text-[13px] outline-none bg-surface transition-all placeholder:text-muted focus:border-accent"
            />
            <button
                type="submit"
                className="rounded-lg lg:rounded-br-lg lg:rounded-tr-lg lg:rounded-bl-none lg:rounded-tl-none px-8 py-3.5 bg-main text-page text-[11px] tracking-widest uppercase font-medium transition-all hover:bg-hover hover:text-main active:scale-[0.98] cursor-pointer"
            >
                {content.button}
            </button>
        </form>
    )
}
