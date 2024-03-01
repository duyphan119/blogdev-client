"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";

export type HeadOptions = {
    createButtonLink?: {
        href: string;
        text?: string;
        className?: string;
        title?: string;
    };
    deleteButton?: {
        text?: string;
        className?: string;
        onClick?: () => void;
        title?: string;
    };
};

const Head = ({ createButtonLink, deleteButton }: HeadOptions) => {
    const CreateButtonLink = () => {
        if (!createButtonLink) return null;
        return (
            <Link
                href={createButtonLink.href}
                title={createButtonLink.title || createButtonLink.text}
                className={buttonVariants({
                    className: createButtonLink.className || "",
                })}
            >
                <RiAddLine className="text-lg mr-1" />
                {createButtonLink.text || "Create"}
            </Link>
        );
    };

    const DeleteButton = () => {
        if (!deleteButton) return null;
        return (
            <Button
                title={deleteButton.title || deleteButton.text}
                variant="destructive"
            >
                {deleteButton.text || "Delete"}
            </Button>
        );
    };

    return (
        <div className="flex gap-4 flex-wrap">
            <CreateButtonLink />
            <DeleteButton />
        </div>
    );
};

export default Head;
