"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

type Props = {
    variant?:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost";
};

const ButtonDarkMode = ({ variant = "default" }: Props) => {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <Button
            variant={variant}
            onClick={() =>
                setTheme(resolvedTheme === "light" ? "dark" : "light")
            }
        >
            {resolvedTheme === "light" && <RiSunLine className="text-xl" />}
            {resolvedTheme === "dark" && <RiMoonLine className="text-xl" />}
        </Button>
    );
};

export default ButtonDarkMode;
