"use client";

import authApi from "@/api/auth-api";
import useProfile from "@/hooks/query/auth/use-profile";
import useUserStore from "@/zustand/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

const AuthenticationWrapper = (props: Props) => {
    const { setProfile } = useUserStore();

    const {
        status,
        data: response,
        isFetching,
        isFetched,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: () => authApi.getProfile(),
        gcTime: 1000 * 60 * 60 * 24,
        refetchOnMount: false,
        enabled: true,
    });

    useEffect(() => {
        if (isFetched) {
            if (status === "success" && response.data) {
                setProfile(response.data);
            } else {
                setProfile(null);
            }
        }
    }, [isFetched]);

    if (isFetching) return <></>;

    return props.children;
};

export default AuthenticationWrapper;
