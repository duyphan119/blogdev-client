"use client";

import { useEffect, useMemo } from "react";
import { IconType } from "react-icons";
import { RiLogoutBoxLine, RiUser2Line } from "react-icons/ri";
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
                href: "/admin/category",
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
                className={`bg-primary dark:bg-primary z-[1149] transition-all duration-500 w-72`}
            >
                <nav className="nav">
                    <ul className="px-4 flex flex-col">
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
