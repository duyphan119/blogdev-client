import { ArticleTagRequest } from "@/components/pages/my-articles/article-tag-modal/article-tag-form";
import { ApiResponse, PaginatedData } from "@/types";
import { ArticleTag, ArticleTagParams } from "@/types/article-tag";
import { getPrivateAxios, getPublicAxios } from ".";

const articleTagApi = {
    paginate: async (
        params?: ArticleTagParams
    ): Promise<ApiResponse<PaginatedData<ArticleTag>>> =>
        getPublicAxios().get("article-tag", { params }),

    create: async (body: ArticleTagRequest): Promise<ApiResponse<ArticleTag>> =>
        getPrivateAxios().post("article-tag", body),

    createByArticleId: async (
        articleId: number,
        body: ArticleTagRequest
    ): Promise<ApiResponse<ArticleTag>> =>
        getPrivateAxios().post(`article-tag/article/${articleId}`, body),

    delete: async (id: number): Promise<ApiResponse<string>> =>
        getPrivateAxios().delete(`article-tag/${id}`),
};

export default articleTagApi;
