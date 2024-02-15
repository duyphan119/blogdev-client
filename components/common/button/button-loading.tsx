"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { ImSpinner2 } from "react-icons/im";

type Props = {
    isLoading?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    className?: string;
    type?: "submit" | "button" | "reset";
} & VariantProps<typeof buttonVariants>;

const ButtonLoading = (props: Props) => {
    return (
        <Button
            type={props.type || "button"}
            disabled={props.disabled}
            className={cn(
                props.isLoading && "flex gap-1 items-center",
                props.className
            )}
        >
            {props.isLoading && <ImSpinner2 className="animate-spin" />}
            {props.children}
        </Button>
    );
};

export default ButtonLoading;
