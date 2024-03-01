"use client";

import { FC, memo } from "react";
import { FaSearch } from "react-icons/fa";
import { GrMenu } from "react-icons/gr";
import useUserStore from "@/zustand/use-user-store";
import { Input } from "@/components/ui/input";
import ButtonDarkMode from "@/components/common/button/button-dark-mode";
import Logo from "../../main-layout/header/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
    onToggleSidebar: () => void;
    open?: boolean;
};

const Header: FC<Props> = ({ onToggleSidebar, open }) => {
    const { profile } = useUserStore();
    return (
        <header
            className={`pr-6 bg-primary-foreground dark:bg-primary-foreground shadow z-[1147] flex items-center justify-between transition-all duration-500 h-20`}
        >
            <Link href="/admin">
                <Logo
                    mode="dark"
                    className={cn(
                        "h-20 transition-all duration-500 z-[1]",
                        open ? "w-60 mx-6 opacity-100" : "w-0 opacity-0"
                    )}
                />
            </Link>
            <div className="left flex items-center flex-1 mr-4">
                <button
                    className="cursor-pointer text-2xl text-primary dark:text-primary w-12 mx-2 justify-center flex py-2 z-[2]"
                    onClick={onToggleSidebar}
                >
                    <GrMenu />
                </button>
                <div className="relative flex-1">
                    <Input
                        type="search"
                        className="pl-9 bg-primary-foreground dark:bg-primary-foreground"
                        placeholder="Nhập từ khoá để tìm kiếm"
                    />
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
                        <FaSearch />
                    </span>
                </div>
            </div>
            <div className="right flex items-center gap-4 justify-end">
                {/* <NotificationIcon /> */}
                <ButtonDarkMode variant="ghost" />
                <p className="text-primary dark:text-primary hidden md:block">
                    <span className="font-extralight">Welcome,&nbsp;</span>
                    <span className="font-medium text-primary dark:text-primary">
                        {profile?.full_name}
                    </span>
                </p>
            </div>
        </header>
    );
};

export default memo(Header);
