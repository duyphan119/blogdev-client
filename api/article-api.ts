import { ArticleRequest } from "@/components/pages/article-form";
import { ApiResponse, PaginatedData } from "@/types";
import { Article, ArticleParams, AuthorArticles } from "@/types/article";
import { getPrivateAxios, getPublicAxios } from ".";

const articleApi = {
    paginate: async (params?: ArticleParams) => {
        const response: ApiResponse<PaginatedData<Article>> =
            await getPublicAxios().get("article", {
                params,
            });
        return response;
    },
    getBySlug: async (slug: string) => {
        const response: ApiResponse<Article> = await getPublicAxios().get(
            `article/slug/${slug}`
        );
        return response;
    },
    getById: async (id: number) => {
        const response: ApiResponse<Article> = await getPublicAxios().get(
            `article/id/${id}`
        );
        return response;
    },
    getByAuthorId: async (authorId: number, params?: ArticleParams) => {
        const response: ApiResponse<AuthorArticles> =
            await getPublicAxios().get(`article/author/${authorId}`, {
                params,
            });
        return response;
    },
    getRecommendList: async (slug: string) => {
        const response: ApiResponse<PaginatedData<Article>> =
            await getPublicAxios().get(`article/recommend/slug/${slug}`);
        return response;
    },
    getMyPosts: async (params?: ArticleParams) => {
        const response: ApiResponse<PaginatedData<Article>> =
            await getPrivateAxios().get("article/author", { params });
        return response;
    },
    userCreate: async (body: ArticleRequest) => {
        const response: ApiResponse<Article> = await getPrivateAxios().post(
            "article/author",
            body
        );
        return response;
    },
    userUpdate: async (body: Article) => {
        const response: ApiResponse<Article> = await getPrivateAxios().patch(
            `article/author/${body.id}`,
            body
        );
        return response;
    },
    userDelete: async (id: number) => {
        const response: ApiResponse<Article> = await getPrivateAxios().delete(
            `article/author/${id}`
        );
        return response;
    },
};

export default articleApi;
