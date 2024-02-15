"use client";

import { FC, memo } from "react";
import { FaSearch } from "react-icons/fa";
import { GrMenu } from "react-icons/gr";
import useUserStore from "@/zustand/use-user-store";
import { Input } from "@/components/ui/input";

type Props = {
    onToggleSidebar: () => void;
    open?: boolean;
};

const Header: FC<Props> = ({ onToggleSidebar, open }) => {
    const { profile } = useUserStore();
    return (
        <header
            className={`px-6 bg-white shadow z-[1147] flex items-center justify-between gap-4 transition-all duration-500 h-20 ${
                open ? "md:ml-[286px]" : "ml-0"
            }`}
        >
            <div className="left flex items-center gap-4 flex-1">
                <span
                    className="cursor-pointer text-2xl"
                    onClick={onToggleSidebar}
                >
                    <GrMenu />
                </span>
                <div className="relative flex-1">
                    <Input
                        type="search"
                        placeholder="Nhập từ khoá để tìm kiếm"
                    />
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500">
                        <FaSearch />
                    </span>
                </div>
            </div>
            <div className="right flex items-center gap-4 justify-end">
                {/* <NotificationIcon /> */}
                <p className="text-neutral-500 hidden md:block">
                    Xin chào,{" "}
                    <span className="font-medium text-black">
                        {profile?.full_name}
                    </span>
                </p>
            </div>
        </header>
    );
};

export default memo(Header);
