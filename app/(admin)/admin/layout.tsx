"use client";

import AdminLayout from "@/components/layouts/admin-layout";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Layout = (props: Props) => {
    return <AdminLayout>{props.children}</AdminLayout>;
};

export default Layout;
