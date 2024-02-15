import Profile from "@/components/pages/profile";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
    title: formatTitle("Account Information"),
};

const ProfilePage = (props: Props) => {
    return <Profile />;
};

export default ProfilePage;
