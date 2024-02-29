"use client";

import {
    RiMenuFill,
    RiSearchLine,
    RiArrowDropDownFill,
    RiUser6Line,
    RiCloseFill,
} from "react-icons/ri";
import { Button, buttonVariants } from "@/components/ui/button";
import Logo from "./logo";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { navItems } from "./data";
import { Fragment, useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import useUserStore from "@/zustand/use-user-store";
import { cn } from "@/lib/utils";
import HeaderMenu from "./header-menu";
import ButtonDarkMode from "@/components/common/button/button-dark-mode";

type Props = {};

const Header = (props: Props) => {
    const pathname = usePathname();
    const { profile, isFetchedProfile } = useUserStore();

    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        document.body.style.overflow = menuVisible ? "hidden" : "unset";
    }, [menuVisible]);

    return (
        <>
            <header className="sm:h-28 h-16 sticky top-0 dark:bg-primary-foreground bg-white z-10 shadow">
                <div className="md:grid md:grid-cols-12 gap-1 h-16 flex">
                    <div className="md:col-span-3 h-full flex items-center">
                        <Button
                            variant="ghost"
                            onClick={() => setMenuVisible((state) => !state)}
                        >
                            {menuVisible ? (
                                <RiCloseFill className="text-xl" />
                            ) : (
                                <RiMenuFill className="text-xl" />
                            )}
                        </Button>
                    </div>
                    <div className="md:col-span-6 h-full text-center">
                        <Link href="/" className="block h-full">
                            <Logo
                                className="h-full"
                                letterClassName="sm:text-3xl text-lg px-1 sm:px-2"
                                mode="dark"
                            />
                        </Link>
                    </div>
                    <div className="md:col-span-3 flex-1 flex justify-end h-full items-center">
                        {!menuVisible &&
                            isFetchedProfile &&
                            (profile ? (
                                <Link
                                    href="/profile"
                                    className={buttonVariants({
                                        variant: "ghost",
                                        className: "sm:block hidden",
                                    })}
                                >
                                    <RiUser6Line className="text-xl" />
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => {
                                        setCookie("prevPage", pathname);
                                    }}
                                    className={buttonVariants({
                                        variant: "link",
                                        className: "sm:block hidden",
                                    })}
                                >
                                    Sign In
                                </Link>
                            ))}

                        <Link
                            href="/search"
                            className={buttonVariants({
                                variant: "ghost",
                            })}
                        >
                            <RiSearchLine className="text-xl" />
                        </Link>
                        <ButtonDarkMode />
                    </div>
                </div>
                <Separator className="hidden sm:block" />
                <div className="h-11 py-1 hidden sm:block">
                    <ul className="flex justify-center">
                        {navItems.map((navItem, index) => {
                            const isActive = navItem.href === pathname;
                            return (
                                <Fragment key={index}>
                                    {index > 0 && (
                                        <li>
                                            <Separator orientation="vertical" />
                                        </li>
                                    )}
                                    <li>
                                        <Link
                                            href={navItem.href}
                                            className={buttonVariants({
                                                variant: "link",
                                                className: cn(
                                                    isActive && "underline",
                                                    "dark:text-primary"
                                                ),
                                            })}
                                            title={
                                                navItem.title ||
                                                navItem.displayText
                                            }
                                        >
                                            {navItem.displayText}
                                        </Link>
                                    </li>
                                </Fragment>
                            );
                        })}
                    </ul>
                </div>
            </header>
            {menuVisible && <HeaderMenu />}
        </>
    );
};

export default Header;
