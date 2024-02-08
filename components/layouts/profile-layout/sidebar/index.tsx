"use client";

import Link from "next/link";
import { sidebarItems } from "./data";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/zustand/use-user-store";
import authApi from "@/api/auth-api";
import { deleteCookie } from "cookies-next";

type Props = {};

const Sidebar = (props: Props) => {
    const { profile } = useUserStore();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="space-y-4">
            <div className="profile flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24 border border-border">
                    <AvatarImage src={profile?.image_url} />
                </Avatar>
                <div className="">{profile?.full_name}</div>
            </div>
            <Separator />
            <ul className="space-y-2">
                {sidebarItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const className = cn(
                        "flex items-center gap-2 capitalize rounded w-full justify-start text-left h-10 px-4 py-2",
                        isActive
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-accent hover:text-accent-foreground"
                    );
                    return (
                        <Fragment key={item.title}>
                            {index > 0 && <Separator />}
                            <li>
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className={className}
                                    >
                                        <Icon className="text-xl" />
                                        {item.displayText}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            try {
                                                const isLogged =
                                                    await authApi.logout();
                                                if (isLogged) {
                                                    deleteCookie("accessToken");
                                                    router.push("/");
                                                }
                                            } catch (error) {}
                                        }}
                                        className={className}
                                    >
                                        <Icon className="text-xl" />
                                        {item.displayText}
                                    </button>
                                )}
                            </li>
                        </Fragment>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
