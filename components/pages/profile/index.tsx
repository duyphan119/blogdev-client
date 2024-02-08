"use client";

import Box from "@/components/layouts/profile-layout/box";
import useUserStore from "@/zustand/use-user-store";

type Props = {};

const Profile = (props: Props) => {
    const { profile } = useUserStore();

    return <Box title="Account Information">Profile</Box>;
};

export default Profile;
