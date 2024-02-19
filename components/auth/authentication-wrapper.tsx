"use client";

import authApi from "@/api/auth-api";
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
        isSuccess,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: () => authApi.getProfile(),
        gcTime: 1000 * 60 * 60 * 24,
        refetchOnMount: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: true,
    });

    useEffect(() => {
        if (isSuccess) {
            setProfile(response.data);
        } else if (isFetched) {
            setProfile(null);
        }
    }, [isSuccess]);

    if (isFetching) return <></>;

    return props.children;
};

export default AuthenticationWrapper;
