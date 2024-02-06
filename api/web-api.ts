import { ApiResponse } from "@/types";
import { getPublicAxios } from ".";
import { HomePageData } from "@/types/home-page";

export const webApi = {
    getHomePageData: async () => {
        const response: ApiResponse<HomePageData> = await getPublicAxios().get(
            "web"
        );
        return response;
    },
};
