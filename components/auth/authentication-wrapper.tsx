'use client';

import authApi from '@/api/auth-api';
import useUserStore from '@/zustand/useUserStore';
import { ReactNode, useEffect } from 'react'

type Props = {
    children: ReactNode
}

const AuthenticationWrapper = (props: Props) => {
    const { setProfile } = useUserStore();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authApi.getProfile();
                if (response.message === "Success") {
                    setProfile(response.data);
                }
            } catch (error) {

            }
        }

        fetchProfile();
    }, [])

    return props.children;
}

export default AuthenticationWrapper