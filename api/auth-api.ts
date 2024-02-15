import { LoginRequest } from "@/components/auth/login-form";
import { RegisterRequest } from "@/components/auth/register-form";
import { ApiResponse } from "@/types";
import { AuthenticationResponse } from "@/types/auth";
import { Author } from "@/types/user";
import { getPrivateAxios, getPublicAxios } from ".";

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
        const response: ApiResponse<Author> = await getPrivateAxios().get(
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
    updateProfile: async (body: Author) => {
        const response: ApiResponse<Author> = await getPrivateAxios().patch(
            "/auth/profile",
            body
        );
        return response;
    },
};

export default authApi;
