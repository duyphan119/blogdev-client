"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "react-icons/ri";

type Props = {};

const ButtonDarkMode = (props: Props) => {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <Button
            variant="ghost"
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
