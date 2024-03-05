"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
    headClassName?: string;
    contentClassName?: string;
    title?: string;
};

const Box = ({
    children,
    className,
    headClassName,
    contentClassName,
    title = "Box Title",
}: Props) => {
    return (
        <div
            className={cn(
                "shadow-md bg-primary-foreground dark:bg-primary-foreground",
                className
            )}
        >
            <div
                className={cn(
                    "p-4 font-medium text-lg capitalize",
                    headClassName
                )}
            >
                {title}
            </div>
            <Separator />
            <div className={cn("p-4", contentClassName)}>{children}</div>
        </div>
    );
};

export default Box;
