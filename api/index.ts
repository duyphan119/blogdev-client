import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import authApi from "./auth-api";

export const getPublicAxios = () => {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080",
        withCredentials: true,
    });

    axiosInstance.interceptors.response.use((response) => response.data);

    return axiosInstance;
};

export const getPrivateAxios = () => {
    const axiosInstance = getPublicAxios();

    axiosInstance.interceptors.request.use(async (config) => {
        const accessToken = getCookie("accessToken")?.toString() ?? "";
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            try {
                const response = await authApi.refreshToken();

                if (response.message === "Success") {
                    setCookie("accessToken", response.data.access_token, {
                        maxAge: response.data.access_token_expired / 1000,
                    });
                    config.headers.Authorization = `Bearer ${response.data.access_token}`;
                }
            } catch (error) {}
        }

        return config;
    });

    return axiosInstance;
};
