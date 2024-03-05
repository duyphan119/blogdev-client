"use client";

import { Button } from "@/components/ui/button";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

type Props = {
    value?: boolean;
    onClick?: () => void;
};

const CellCheck = ({ value, onClick }: Props) => {
    return value ? (
        <Button
            variant="ghost"
            onClick={onClick}
            className="text-green-700 text-2xl"
        >
            <RiCheckLine />
        </Button>
    ) : (
        <Button
            variant="ghost"
            onClick={onClick}
            className="text-red-700 text-2xl"
        >
            <RiCloseLine />
        </Button>
    );
};

export default CellCheck;
