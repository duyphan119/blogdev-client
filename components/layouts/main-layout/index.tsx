"use client";

import categoryParentApi from "@/api/category-parent-api";
import AuthenticationWrapper from "@/components/auth/authentication-wrapper";
import DialogContainer from "@/components/common/dialog-container";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import useMainLayoutStore from "@/zustand/use-main-layout-store";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = {
    children: ReactNode;
};

const Content = (props: Props) => {
    const { setCategoryParentList } = useMainLayoutStore();

    const query = useQuery({
        queryKey: ["category-parent-list"],
        queryFn: () => categoryParentApi.getAll(),
        refetchOnMount: false,
    });

    useEffect(() => {
        if (query.isSuccess) {
            setCategoryParentList(query.data.data);
        }
    }, [query.isSuccess]);

    return (
        <>
            <Header />
            <main className="py-12">{props.children}</main>
            <Footer />
            <ScrollToTop />
            <Toaster />
            <DialogContainer />
        </>
    );
};

const MainLayout = (props: Props) => {
    return (
        <AuthenticationWrapper>
            <Content {...props} />
        </AuthenticationWrapper>
    );
};

export default MainLayout;
