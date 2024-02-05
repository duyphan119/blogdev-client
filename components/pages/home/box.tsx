"use client";

import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    title: string;
};

const Box = (props: Props) => {
    return (
        <div className="space-y-4 border-t border-t-black">
            <div className="bg-black text-white inline-block px-2 py-1 uppercase font-thin">
                {props.title}
            </div>
            <div className="">{props.children}</div>
        </div>
    );
};

export default Box;
