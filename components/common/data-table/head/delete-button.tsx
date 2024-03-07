"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DeleteButtonProps = {
  text?: string;
  className?: string;
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
};

const DeleteButton = (props: DeleteButtonProps) => {
  if (!props) return null;
  const { title, text, className, disabled, onClick } = props;
  return (
    <Button
      title={title || text}
      variant="destructive"
      disabled={disabled}
      onClick={onClick}
      className={cn("sm:flex hidden", className || "")}
    >
      {text || "Delete"}
    </Button>
  );
};

export default DeleteButton;
