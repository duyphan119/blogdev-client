"use client";

import { FC, memo } from "react";
import { FaSearch } from "react-icons/fa";
import { GrMenu } from "react-icons/gr";
import useUserStore from "@/zustand/use-user-store";
import { Input } from "@/components/ui/input";
import ButtonDarkMode from "@/components/common/button/button-dark-mode";
import Logo from "../../main-layout/header/logo";
import { cn } from "@/lib/utils";

type Props = {
    onToggleSidebar: () => void;
    open?: boolean;
};

const Header: FC<Props> = ({ onToggleSidebar, open }) => {
    const { profile } = useUserStore();
    return (
        <header
            className={`px-6 bg-primary dark:bg-primary shadow z-[1147] flex items-center justify-between gap-4 transition-all duration-500 h-20`}
        >
            <Logo
                mode="light"
                className={cn("h-20", open ? "w-60 mr-6" : "w-0 hidden")}
            />
            <div className="left flex items-center gap-4 flex-1">
                <span
                    className="cursor-pointer text-2xl text-primary-foreground dark:text-primary-foreground"
                    onClick={onToggleSidebar}
                >
                    <GrMenu />
                </span>
                <div className="relative flex-1">
                    <Input
                        type="search"
                        className="pl-9"
                        placeholder="Nhập từ khoá để tìm kiếm"
                    />
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
                        <FaSearch />
                    </span>
                </div>
            </div>
            <div className="right flex items-center gap-4 justify-end">
                {/* <NotificationIcon /> */}
                <ButtonDarkMode />
                <p className="text-primary-foreground dark:text-primary-foreground hidden md:block">
                    <span className="font-extralight">Welcome,&nbsp;</span>
                    <span className="font-medium text-primary-foreground dark:text-primary-foreground">
                        {profile?.full_name}
                    </span>
                </p>
            </div>
        </header>
    );
};

export default memo(Header);
