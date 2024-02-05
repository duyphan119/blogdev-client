"use client";

import AuthenticationWrapper from "@/components/auth/authentication-wrapper";
import { ReactNode } from "react";
import Header from "./header";
import ScrollToTop from "@/components/common/scroll-to-top";

type Props = {
    children: ReactNode;
};

const MainLayout = (props: Props) => {
    return (
        <AuthenticationWrapper>
            <Header />
            <main>{props.children}</main>
            <ScrollToTop />
        </AuthenticationWrapper>
    );
};

export default MainLayout;
