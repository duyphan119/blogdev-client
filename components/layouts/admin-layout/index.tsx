"use client";

import roleApi from "@/api/role-api";
import AuthenticationWrapper from "@/components/auth/authentication-wrapper";
import useUserStore from "@/zustand/use-user-store";
import { redirect } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import Sidebar from "./sidebar";

type Props = {
    children: ReactNode;
};

type ContentProps = {
    children: ReactNode;
};

const Content = (props: ContentProps) => {
    const {} = useUserStore();

    const isLgScreen = useMediaQuery({ query: "(min-width: 1000px)" });

    const [isFetched, setIsFetched] = useState(false);
    const [isNotfound, setIsNotfound] = useState(true);

    const [sidebarOpen, setSidebarOpen] = useState(isLgScreen);

    const handleToggleSidebar = () => {
        setSidebarOpen((state) => !state);
    };

    const handleClose = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    useEffect(() => {
        setSidebarOpen(isLgScreen);
    }, [isLgScreen]);

    useEffect(() => {
        const fetchRoleList = async () => {
            try {
                const response = await roleApi.getAll();
                console.log(response);
                if (
                    response.message === "Success" &&
                    response.data.findIndex((item) => item.name === "ADMIN") !==
                        -1
                ) {
                    setIsNotfound(false);
                }
            } catch (error) {
            } finally {
                setIsFetched(true);
            }
        };

        fetchRoleList();
    }, []);

    if (!isFetched) return null;

    if (isFetched && isNotfound) redirect("/login");
    else {
        return (
            <div className="flex">
                <Sidebar open={sidebarOpen} onClose={handleClose} />
                <div className="relative overflow-y-auto flex flex-col min-h-screen flex-1">
                    <Header
                        onToggleSidebar={handleToggleSidebar}
                        open={sidebarOpen}
                    />
                    <main
                        className={`sm:p-6 p-2 bg-lightgrey transition-all duration-500 flex-1 ${
                            sidebarOpen ? "md:ml-[286px]" : "ml-0"
                        }`}
                    >
                        <div className="h-full">{props.children}</div>
                    </main>
                </div>
            </div>
        );
    }
};

const AdminLayout = (props: Props) => {
    return (
        <AuthenticationWrapper>
            <Content>{props.children}</Content>
        </AuthenticationWrapper>
    );
};

export default AdminLayout;
