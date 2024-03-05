"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";

export type CreateButtonLinkProps = {
    href: string;
    text?: string;
    className?: string;
    title?: string;
};

const CreateButtonLink = (props: CreateButtonLinkProps) => {
    if (!props) return null;
    return (
        <Link
            href={props.href}
            title={props.title || props.text}
            className={buttonVariants({
                className: props.className || "",
            })}
        >
            <RiAddLine className="text-lg mr-1" />
            {props.text || "Create"}
        </Link>
    );
};

export default CreateButtonLink;
