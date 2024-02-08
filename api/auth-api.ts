import { LoginRequest } from "@/components/auth/login-form";
import { ApiResponse } from "@/types";
import { AuthenticationResponse, Profile } from "@/types/auth";
import { getPrivateAxios, getPublicAxios } from ".";
import { RegisterRequest } from "@/components/auth/register-form";

const authApi = {
    login: async (body: LoginRequest) => {
        const response: ApiResponse<AuthenticationResponse> =
            await getPublicAxios().post("auth/login", body);
        return response;
    },
    register: async (body: RegisterRequest) => {
        const response: ApiResponse<AuthenticationResponse> =
            await getPublicAxios().post("auth/register", body);
        return response;
    },
    getProfile: async () => {
        const response: ApiResponse<Profile> = await getPrivateAxios().get(
            "auth/profile"
        );
        return response;
    },
    refreshToken: async () => {
        const response: ApiResponse<AuthenticationResponse> =
            await getPublicAxios().patch("auth/refresh-token");
        return response;
    },
    logout: async (): Promise<boolean> => {
        await getPrivateAxios().post("auth/logout");
        return true;
    },
};

export default authApi;
