"use client";

import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    title: string;
};

const Box = (props: Props) => {
    return (
        <div className="space-y-4 border-t border-t-black dark:border-t-white">
            <div className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground inline-block px-2 py-1 uppercase font-light">
                {props.title}
            </div>
            <div className="">{props.children}</div>
        </div>
    );
};

export default Box;
