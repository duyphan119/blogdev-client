import { LoginRequest } from "@/components/auth/login-form";
import { ApiResponse } from "@/types";
import { AuthenticationResponse, Profile } from "@/types/auth";
import { getPrivateAxios, getPublicAxios } from ".";

const authApi = {
    login: async (body: LoginRequest): Promise<ApiResponse<AuthenticationResponse>> => {
        const response: ApiResponse<AuthenticationResponse> = await getPublicAxios().post("auth/login", body);
        return response;
    },
    getProfile: async (): Promise<ApiResponse<Profile>> => {
        const response: ApiResponse<Profile> = await getPrivateAxios().get("auth/profile");
        return response;
    },
    refreshToken: async (): Promise<ApiResponse<AuthenticationResponse>> => {
        const response: ApiResponse<AuthenticationResponse> = await getPublicAxios().patch("auth/refresh-token");
        return response;
    },
    logout: async (): Promise<boolean> => {
        await getPrivateAxios().post("auth/logout");
        return true;
    }
}

export default authApi;