"use client";

import authApi from "@/api/auth-api";
import useUserStore from "@/zustand/use-user-store";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

const AuthenticationWrapper = (props: Props) => {
    const { setProfile } = useUserStore();

    useEffect(() => {
        const fetchProfile = async () => {
            let profileIsSetted = false;
            try {
                const response = await authApi.getProfile();
                if (response.message === "Success") {
                    profileIsSetted = true;
                    setProfile(response.data);
                }
            } catch (error) {}

            if (!profileIsSetted) {
                setProfile(null);
            }
        };

        fetchProfile();
    }, []);

    return props.children;
};

export default AuthenticationWrapper;
