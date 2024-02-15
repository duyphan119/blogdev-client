"use client";

import AuthenticationWrapper from "@/components/auth/authentication-wrapper";
import DialogContainer from "@/components/common/dialog-container";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = {
    children: ReactNode;
};

const MainLayout = (props: Props) => {
    return (
        <AuthenticationWrapper>
            <Header />
            <main className="py-12">{props.children}</main>

            <Footer />
            <ScrollToTop />
            <Toaster />
            <DialogContainer />
        </AuthenticationWrapper>
    );
};

export default MainLayout;
