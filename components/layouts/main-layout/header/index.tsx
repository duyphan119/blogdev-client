"use client";

import {
    RiMenuFill,
    RiSearchLine,
    RiArrowDropDownFill,
    RiUser6Line,
} from "react-icons/ri";
import { Button, buttonVariants } from "@/components/ui/button";
import Logo from "./logo";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { navItems } from "./data";
import { Fragment } from "react";
import { setCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import useUserStore from "@/zustand/use-user-store";
import { cn } from "@/lib/utils";

type Props = {};

const Header = (props: Props) => {
    const pathname = usePathname();
    const { profile, isFetchedProfile } = useUserStore();
    return (
        <header className="h-28 sticky top-0 bg-white z-10 shadow">
            <div className="grid grid-cols-12 gap-1 h-16">
                <div className="md:col-span-3 h-full flex items-center">
                    <Button variant="ghost">
                        <RiMenuFill className="text-xl" />
                    </Button>
                </div>
                <div className="md:col-span-6 h-full text-center">
                    <Link href="/" className="block h-full">
                        <Logo className="h-full" mode="dark" />
                    </Link>
                </div>
                <div className="md:col-span-3 flex justify-end h-full items-center">
                    {isFetchedProfile &&
                        (profile ? (
                            <Link
                                href="/profile"
                                className={buttonVariants({
                                    variant: "ghost",
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
                                })}
                            >
                                Sign In
                            </Link>
                        ))}

                    <Button variant="ghost">
                        <RiSearchLine className="text-xl" />
                    </Button>
                </div>
            </div>
            <Separator />
            <div className="h-11 py-1">
                <ul className="flex justify-center">
                    {navItems([
                        { name: "Java", slug: "java" },
                        { name: "Python", slug: "python" },
                    ]).map((navItem, index) => {
                        const isActive = navItem.href === pathname;
                        return (
                            <Fragment key={index}>
                                {index > 0 && (
                                    <li>
                                        <Separator orientation="vertical" />
                                    </li>
                                )}
                                <li>
                                    {navItem.href ? (
                                        <Link
                                            href={navItem.href}
                                            className={buttonVariants({
                                                variant: "link",
                                                className: cn(
                                                    isActive && "underline"
                                                ),
                                            })}
                                            title={
                                                navItem.title ||
                                                navItem.displayText
                                            }
                                        >
                                            {navItem.displayText}
                                        </Link>
                                    ) : (
                                        <Button variant="ghost">
                                            {navItem.displayText}
                                            {!!navItem.children?.length && (
                                                <RiArrowDropDownFill className="text-xl" />
                                            )}
                                        </Button>
                                    )}
                                </li>
                            </Fragment>
                        );
                    })}
                </ul>
            </div>
        </header>
    );
};

export default Header;
