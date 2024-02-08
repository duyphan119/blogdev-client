import { ApiResponse } from "@/types";
import { getPublicAxios } from ".";
import { HomePageData } from "@/types/home-page";
import { ArticleDetailData } from "@/types/article-detail-page";

export const webApi = {
    getHomePageData: async () => {
        const response: ApiResponse<HomePageData> = await getPublicAxios().get(
            "web"
        );
        return response;
    },
    getArticleDetailPageData: async (slug: string) => {
        const response: ApiResponse<ArticleDetailData> =
            await getPublicAxios().get(`web/article/slug/${slug}`);
        return response;
    },
};
