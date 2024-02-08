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
        <div className="mx-auto md:max-w-7xl md:px-8 sm:px-0 px-8">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-3">
                    <Sidebar />
                </div>
                <div className="col-span-12 md:col-span-9">
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
