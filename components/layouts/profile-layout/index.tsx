"use client";

import { ReactNode } from "react";
import MainLayout from "../main-layout";
import Sidebar from "./sidebar";
import useUserStore from "@/zustand/use-user-store";
import { notFound } from "next/navigation";

type Props = {
    children: ReactNode;
};

type ContentProps = {
    children: ReactNode;
};

const Content = (props: ContentProps) => {
    const { isFetchedProfile, profile } = useUserStore();

    if (!isFetchedProfile) return null;

    if (isFetchedProfile && !profile) notFound();

    return (
        <div className="mx-auto md:max-w-7xl md:px-8 px-4">
            <div className="grid grid-cols-12 md:gap-8 gap-y-8">
                <div className="col-span-12 md:col-span-3 shadow-md">
                    <Sidebar />
                </div>
                <div className="col-span-12 md:col-span-9 shadow-2xl">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const ProfileLayout = (props: Props) => {
    return (
        <MainLayout>
            <Content>{props.children}</Content>
        </MainLayout>
    );
};

export default ProfileLayout;
