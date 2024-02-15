"use client";

import Box from "@/components/layouts/profile-layout/box";
import useUserStore from "@/zustand/use-user-store";
import ProfileForm from "./profile-form";

type Props = {};

const Profile = (props: Props) => {
    const { isFetchedProfile, profile } = useUserStore();

    return (
        <Box title="Account Information">
            {isFetchedProfile && profile && <ProfileForm />}
        </Box>
    );
};

export default Profile;
