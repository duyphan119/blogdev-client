"use client";

import { Button } from "@/components/ui/button";

export type DeleteButtonProps = {
    text?: string;
    className?: string;
    onClick?: () => void;
    title?: string;
    disabled?: boolean;
};

const DeleteButton = (props: DeleteButtonProps) => {
    if (!props) return null;
    return (
        <Button
            title={props.title || props.text}
            variant="destructive"
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.text || "Delete"}
        </Button>
    );
};

export default DeleteButton;
