"use client";

import authApi from "@/api/auth-api";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, Fragment, useEffect, useMemo } from "react";
import { IconType } from "react-icons";
import { BiSolidCategory, BiSolidContact } from "react-icons/bi";
import { BsNewspaper } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { RiLogoutBoxLine, RiUser2Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import Logo from "../../main-layout/header/logo";
import { cn } from "@/lib/utils";

type Props = {
    open: boolean;
    onClose: () => void;
};

type Item = {
    label: string;
    title?: string;
    href?: string;
    icon?: IconType;
    children?: Item[];
};

const Sidebar = (props: Props) => {
    const pathname = usePathname();
    const router = useRouter();

    const isMdScreen = useMediaQuery({ query: "(min-width: 768px)" });

    const items: Item[] = useMemo(
        () => [
            //   {
            //     label: "Quản lý",
            //     children: [
            //       {
            //         label: "Danh mục bài viết",
            //         href: ROUTES.CATEGORIES,
            //         icon: BiSolidCategory,
            //         children: [],
            //       },
            //       {
            //         label: "Bài viết",
            //         href: ROUTES.BLOGS,
            //         icon: BsNewspaper,
            //         children: [],
            //       },
            //       {
            //         label: "Liên hệ",
            //         href: ROUTES.CONTACTS,
            //         icon: BiSolidContact,
            //         children: [],
            //       },
            //     ],
            //   },
            //   {
            //     label: "Phục hồi",
            //     children: [
            //       {
            //         label: "Danh mục bài viết",
            //         href: ROUTES.TRASH_CATEGORIES,
            //         icon: BiSolidCategory,
            //         children: [],
            //       },
            //       {
            //         label: "Bài viết",
            //         href: ROUTES.TRASH_BLOGS,
            //         icon: BsNewspaper,
            //         children: [],
            //       },
            //     ],
            //   },
            {
                label: "Profile",
                title: "Profile",
                children: [
                    {
                        icon: RiUser2Line,
                        label: "Account Infomation",
                        href: "/profile",
                        children: [],
                    },
                    {
                        icon: RiLogoutBoxLine,
                        label: "Log Out",
                        children: [],
                    },
                ],
            },
        ],
        []
    );
    const handleLogout = async () => {
        try {
            const isLogged = await authApi.logout();
            if (isLogged) {
                deleteCookie("accessToken");
                router.push("/");
            }
        } catch (error) {}
    };

    useEffect(() => {
        if (!isMdScreen) {
            props.onClose();
        }
    }, [location.pathname]);

    return (
        <>
            <aside
                className={`bg-navy text-white fixed top-0 left-0 bottom-0 z-[1149] transition-all duration-500 ${
                    props.open ? "translate-x-0" : "-translate-x-[286px]"
                } w-[286px]`}
            >
                <Logo mode="dark" className="h-20" />
                <nav>
                    <ul className="px-4 flex flex-col gap-6">
                        {items.map((item, index) => {
                            return (
                                <li key={index}>
                                    <span className="text-neutral-500 mx-2">
                                        {item.label}
                                    </span>
                                    {item.children &&
                                    item.children.length > 0 ? (
                                        <ul className="flex flex-col mt-2 gap-0.5 text-neutral-500">
                                            {item.children.map(
                                                (child, indexChild) => {
                                                    const Icon =
                                                        child.icon || Fragment;
                                                    const isActive =
                                                        pathname === child.href;
                                                    const linkClassName =
                                                        "flex items-center gap-2 p-2 hover:rounded-sm w-full";
                                                    return (
                                                        <li key={indexChild}>
                                                            {child.href ? (
                                                                <Link
                                                                    href={
                                                                        child.href
                                                                    }
                                                                    className={cn(
                                                                        isActive
                                                                            ? "text-navy bg-lightgrey"
                                                                            : ""
                                                                    )}
                                                                >
                                                                    <Icon />
                                                                    {
                                                                        child.label
                                                                    }
                                                                </Link>
                                                            ) : (
                                                                <button
                                                                    className={
                                                                        linkClassName
                                                                    }
                                                                    onClick={
                                                                        handleLogout
                                                                    }
                                                                >
                                                                    <Icon />
                                                                    {
                                                                        child.label
                                                                    }
                                                                </button>
                                                            )}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    ) : null}
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
