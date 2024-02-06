"use client";

import AuthenticationWrapper from "@/components/auth/authentication-wrapper";
import { ReactNode } from "react";
import Header from "./header";
import ScrollToTop from "@/components/common/scroll-to-top";
import Footer from "./footer";
import { Toaster } from "@/components/ui/toaster";

type Props = {
    children: ReactNode;
};

const MainLayout = (props: Props) => {
    return (
        <AuthenticationWrapper>
            <Header />
            <main>{props.children}</main>
            <Footer />
            <ScrollToTop />
            <Toaster />
        </AuthenticationWrapper>
    );
};

export default MainLayout;
