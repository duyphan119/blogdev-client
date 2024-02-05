"use client";

import { cn } from "@/lib/utils";

type Props = {
    className?: string;
};

const Logo = (props: Props) => {
    return (
        <div
            className={cn(
                "flex gap-2 items-center justify-center",
                props.className
            )}
        >
            {"BLDEV".split("").map((letter, index) => (
                <div
                    key={letter}
                    className={cn(
                        index % 2 === 0 ? "bg-black text-white px-2" : "",
                        "text-3xl"
                    )}
                >
                    {letter}
                </div>
            ))}
        </div>
    );
};

export default Logo;
