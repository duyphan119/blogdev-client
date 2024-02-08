"use client";

import AuthenticationWrapper from "@/components/auth/authentication-wrapper";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const AuthLayout = (props: Props) => {
    return (
        <AuthenticationWrapper>
            <main>{props.children}</main>
        </AuthenticationWrapper>
    );
};

export default AuthLayout;
