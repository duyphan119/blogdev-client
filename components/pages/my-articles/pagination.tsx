"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RiSkipBackLine, RiSkipForwardLine } from "react-icons/ri";

type Props = {
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (newPage: number) => void;
    className?: string;
};

const Pagination = ({
    totalPages = 0,
    currentPage = 0,
    onPageChange,
    className,
}: Props) => {
    if (!totalPages || !currentPage) return null;
    return (
        <div
            className={cn(
                "flex items-center md:gap-4 gap-2 justify-center md:flex-nowrap flex-wrap",
                className
            )}
        >
            <Button size="icon" onClick={() => onPageChange?.(1)}>
                <RiSkipBackLine />
            </Button>
            {[
                currentPage - 2,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                currentPage + 2,
            ].map((page) => {
                if (page < 1 || page > totalPages) return null;
                const isActive = page === currentPage;
                return (
                    <Button
                        key={page}
                        onClick={() => onPageChange?.(page)}
                        className={buttonVariants({
                            size: "icon",
                            variant: isActive ? "default" : "outline",
                            className: cn(
                                "text-foreground",
                                isActive && "text-white"
                            ),
                        })}
                    >
                        {page}
                    </Button>
                );
            })}
            <Button size="icon" onClick={() => onPageChange?.(totalPages)}>
                <RiSkipForwardLine />
            </Button>
        </div>
    );
};

export default Pagination;
