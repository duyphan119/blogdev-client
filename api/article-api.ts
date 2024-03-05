import { ArticleRequest } from "@/components/pages/article-form";
import { ApiResponse, PaginatedData } from "@/types";
import { Article, ArticleParams, AuthorArticles } from "@/types/article";
import { getPrivateAxios, getPublicAxios } from ".";

type ArticleResponse = ApiResponse<Article>;
type ArticleListResponse = ApiResponse<PaginatedData<Article>>;
type DeletedResponse = ApiResponse<string>;

const articleApi = {
    paginate: (params?: ArticleParams): Promise<ArticleListResponse> =>
        getPublicAxios().get("article", {
            params,
        }),

    adminPaginate: (params?: ArticleParams): Promise<ArticleListResponse> =>
        getPrivateAxios().get("article/admin", {
            params,
        }),

    getBySlug: (slug: string): Promise<ArticleResponse> =>
        getPublicAxios().get(`article/slug/${slug}`),

    getById: (id: number): Promise<ArticleResponse> =>
        getPublicAxios().get(`article/id/${id}`),

    getByAuthorId: (
        authorId: number,
        params?: ArticleParams
    ): Promise<ApiResponse<AuthorArticles>> =>
        getPublicAxios().get(`article/author/${authorId}`, {
            params,
        }),

    getRecommendList: (slug: string) =>
        getPublicAxios().get(`article/recommend/slug/${slug}`),

    getMyPosts: (params?: ArticleParams) =>
        getPrivateAxios().get("article/author", { params }),

    create: (body: ArticleRequest): Promise<ArticleResponse> =>
        getPrivateAxios().post("article", body),

    update: (body: Article): Promise<ArticleResponse> =>
        getPrivateAxios().patch(`article/${body.id}`, body),

    userCreate: (body: ArticleRequest): Promise<ArticleResponse> =>
        getPrivateAxios().post("article/author", body),

    userUpdate: (body: Article): Promise<ArticleResponse> =>
        getPrivateAxios().patch(`article/author/${body.id}`, body),

    userDelete: (id: number): Promise<DeletedResponse> =>
        getPrivateAxios().delete(`article/author/${id}`),

    delete: (id: number): Promise<DeletedResponse> =>
        getPrivateAxios().delete(`article/${id}`),

    deleteMultiple: (ids: number[]): Promise<DeletedResponse> =>
        getPrivateAxios().delete(`article`, { params: { ids: ids.join("_") } }),
};

export default articleApi;
