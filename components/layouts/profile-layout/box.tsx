"use client";

import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    title: string;
};

const Box = (props: Props) => {
    return (
        <div className="shadow space-y-4 py-4 h-full">
            <div className="px-4 uppercase font-bold text-lg">
                {props.title}
            </div>
            <Separator />
            <div className="px-4">{props.children}</div>
        </div>
    );
};

export default Box;
