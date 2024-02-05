"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RiArrowUpSLine } from "react-icons/ri";

type Props = {};

const ScrollToTop = (props: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (document.documentElement.scrollTop > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <Button
            onClick={scrollToTop}
            title="Scroll to top"
            className="fixed z-50 bottom-3 right-3 text-xl"
        >
            <RiArrowUpSLine />
        </Button>
    );
};

export default ScrollToTop;
