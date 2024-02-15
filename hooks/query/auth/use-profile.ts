import authApi from "@/api/auth-api";
import { ApiResponse } from "@/types";
import { Profile } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";

export default function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: async (): Promise<ApiResponse<Profile>> =>
            authApi.getProfile(),
    });
}
