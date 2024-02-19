"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    title: string;
    className?: string;
    contentClassName?: string;
    headClassName?: string;
};

const Box = (props: Props) => {
    return (
        <div className={cn("shadow space-y-4 py-4 h-full", props.className)}>
            <div
                className={cn(
                    "px-4 uppercase font-bold text-lg",
                    props.headClassName
                )}
            >
                {props.title}
            </div>
            <Separator />
            <div className={cn("px-4", props.contentClassName)}>
                {props.children}
            </div>
        </div>
    );
};

export default Box;
