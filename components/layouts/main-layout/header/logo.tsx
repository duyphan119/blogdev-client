"use client";

import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    mode?: "dark" | "light";
    letterClassName?: string;
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
                        index % 2 === 0
                            ? props.mode === "dark"
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "bg-white text-black dark:bg-black dark:text-white"
                            : props.mode === "dark"
                            ? "text-black dark:text-white"
                            : "text-white dark:text-black",
                        "text-3xl px-2",
                        props.letterClassName
                    )}
                >
                    {letter}
                </div>
            ))}
        </div>
    );
};

export default Logo;
