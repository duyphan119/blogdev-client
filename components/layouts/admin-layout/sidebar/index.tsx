"use client";

import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";
import { IconType } from "react-icons";
import { MdOutlineGroupWork } from "react-icons/md";
import { RiLogoutBoxLine, RiNewspaperLine, RiUser2Line } from "react-icons/ri";
import { TbCategory2 } from "react-icons/tb";
import { useMediaQuery } from "react-responsive";
import SidebarItem from "./sidebar-item";

type Props = {
    open: boolean;
    onClose: () => void;
};

export type Item = {
    label: string;
    title: string;
    href?: string;
    icon: IconType;
    children?: Item[];
};

const Sidebar = (props: Props) => {
    const isMdScreen = useMediaQuery({ query: "(min-width: 768px)" });

    const items: Item[] = useMemo(
        () => [
            {
                label: "Category",
                title: "Category",
                icon: TbCategory2,
                children: [
                    {
                        label: "Category Parent",
                        title: "Category Parent",
                        icon: MdOutlineGroupWork,
                        href: "/admin/category-parent",
                    },
                    {
                        label: "Category",
                        title: "Category",
                        icon: TbCategory2,
                        href: "/admin/category",
                    },
                ],
            },
            {
                label: "Article",
                title: "Article",
                icon: RiNewspaperLine,
                href: "/admin/article",
            },
            {
                label: "Profile",
                title: "Profile",
                icon: RiUser2Line,
                children: [
                    {
                        icon: RiUser2Line,
                        label: "Account Infomation",
                        title: "Account Infomation",
                        href: "/admin/profile",
                        children: [],
                    },
                    {
                        icon: RiLogoutBoxLine,
                        label: "Log Out",
                        title: "Log Out",
                        children: [],
                    },
                ],
            },
        ],
        []
    );

    useEffect(() => {
        if (!isMdScreen) {
            props.onClose();
        }
    }, [location.pathname]);

    return (
        <>
            <aside
                className={cn(
                    "bg-primary-foreground dark:bg-primary-foreground z-[1149] transition-all duration-500",
                    props.open ? "w-72" : "w-16"
                )}
            >
                <nav className="nav">
                    <ul
                        className={cn(
                            "flex flex-col gap-2",
                            props.open ? "px-4" : "px-2"
                        )}
                    >
                        {items.map((item, index) => {
                            return (
                                <li key={index}>
                                    <SidebarItem
                                        sidebarOpen={props.open}
                                        item={item}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
            {props.open && !isMdScreen ? (
                <div
                    className="overlay z-[1148] fixed top-0 right-0 left-0 bottom-0 bg-grey opacity-20"
                    onClick={props.onClose}
                ></div>
            ) : null}
        </>
    );
};

export default Sidebar;
