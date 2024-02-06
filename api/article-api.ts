import { ApiResponse } from "@/types";
import { getPublicAxios } from ".";
import { Article } from "@/types/article";

const articleApi = {
    getBySlug: async (slug: string) => {
        const response: ApiResponse<Article> = await getPublicAxios().get(
            `article/slug/${slug}`
        );
        return response;
    },
};

export default articleApi;
