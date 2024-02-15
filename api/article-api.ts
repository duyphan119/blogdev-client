import { ApiResponse, PaginatedData } from "@/types";
import { getPublicAxios } from ".";
import { Article } from "@/types/article";

const articleApi = {
    getBySlug: async (slug: string) => {
        const response: ApiResponse<Article> = await getPublicAxios().get(
            `article/slug/${slug}`
        );
        return response;
    },
    getRecommendList: async (slug: string) => {
        const response: ApiResponse<PaginatedData<Article>> =
            await getPublicAxios().get(`article/recommend/slug/${slug}`);
        return response;
    },
};

export default articleApi;
