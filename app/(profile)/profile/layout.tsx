"use client";

import ProfileLayout from "@/components/layouts/profile-layout";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Layout = (props: Props) => {
    return <ProfileLayout>{props.children}</ProfileLayout>;
};

export default Layout;
