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
import { RiUpload2Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import AvatarProfile from "./avatar-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {};

const Sidebar = (props: Props) => {
    const { profile } = useUserStore();
    const pathname = usePathname();
    const router = useRouter();

    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: () => authApi.logout(),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            deleteCookie("accessToken");
            router.push("/");
        },
    });

    return (
        <div className="space-y-4">
            <div className="profile flex flex-col items-center gap-2">
                <AvatarProfile />
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
                                        onClick={() => logoutMutation.mutate()}
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
