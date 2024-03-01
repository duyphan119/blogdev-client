"use client";

import authApi from "@/api/auth-api";
import { cn } from "@/lib/utils";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Item } from ".";

type Props = {
    item: Item;
    sidebarOpen: boolean;
};

const SidebarItem = ({ item, sidebarOpen }: Props) => {
    const pathname = usePathname();

    const router = useRouter();

    const Icon = item.icon;

    const [menuVisible, setMenuVisible] = useState(false);

    const handleItemClick = () => {
        if (item.children && item.children.length > 0)
            setMenuVisible((state) => !state);
        if (item.href) {
            router.push(item.href);
        }
    };

    const handleSubItemClick = async () => {
        if (item.href) {
            router.push(item.href);
        } else {
            try {
                const isLogged = await authApi.logout();
                if (isLogged) {
                    deleteCookie("accessToken");
                    router.push("/");
                }
            } catch (error) {}
        }
    };

    return (
        <>
            <div
                onClick={handleItemClick}
                className={cn(
                    "flex items-center p-2 text-primary dark:text-primary cursor-pointer",
                    sidebarOpen ? "" : "justify-center"
                )}
            >
                <Icon className="text-2xl" />
                {sidebarOpen && <div className="flex-1 ml-2">{item.label}</div>}
                {item.children &&
                    item.children.length > 0 &&
                    sidebarOpen &&
                    (menuVisible ? (
                        <RiArrowDropUpLine className="text-2xl ml-2" />
                    ) : (
                        <RiArrowDropDownLine className="text-2xl ml-2" />
                    ))}
            </div>
            {item.children && item.children.length > 0 && menuVisible ? (
                <ul className="flex flex-col gap-0.5 text-primary dark:text-primary bg-muted">
                    {item.children.map((child, indexChild) => {
                        const Icon = child.icon || Fragment;
                        const isActive = pathname === child.href;
                        const className =
                            "flex items-center gap-2 p-2 ml-2 hover:rounded-sm w-full";
                        return (
                            <li key={indexChild}>
                                <button
                                    className={className}
                                    onClick={handleSubItemClick}
                                >
                                    <Icon className="text-2xl" />
                                    {child.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </>
    );
};

export default SidebarItem;
