"use client";

import authApi from "@/api/auth-api";
import roleApi from "@/api/role-api";
import { Role } from "@/types/role";
import useUserStore from "@/zustand/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";

type Props = {
    children: ReactNode;
};

const AuthenticationWrapper = (props: Props) => {
    const { setProfile } = useUserStore();

    const {
        data: response,
        isFetching,
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
            const fetchRoleList = async () => {
                // let roles: Role[] = [];
                // try {
                //     const { message, data } = await roleApi.getAll();
                //     roles = message === "Success" ? data : [];
                // } catch (error) {}

                // setProfile({
                //     ...response.data,
                //     roles,
                // });
                console.log(response.data);
                setProfile(response.data);
            };

            fetchRoleList();
        } else {
            setProfile(null);
        }
    }, [isSuccess]);

    if (isFetching) return <></>;

    return props.children;
};

export default AuthenticationWrapper;
