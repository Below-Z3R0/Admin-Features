import type { BrandBarProps } from "../types";

export function BrandBarSection({ brands }: BrandBarProps) {
    return (
        <div className="border-y border-black/10 py-5 bg-white overflow-hidden">
            <style>
                {`
                .band-track {animation: marquee 30s linear infinite; }
                @media (max-width: 768px) {
                .prc - steps::after {display: none; }
                }
            `}
            </style>
            <div className="band-track flex w-max">
                {[...Array(2)].map((_, index) => (
                    <div className="flex" key={index}>
                        {brands.map((name) => (
                            <span
                                key={name}
                                className="px-10 text-[11px] font-medium tracking-[0.15em] uppercase text-[#9E9892] whitespace-nowrap border-r border-black/10 h-6 flex items-center transition-colors hover:text-[#1E40AF]"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    )
}
