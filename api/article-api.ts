import { ArticleRequest } from "@/components/pages/article-form";
import { ApiResponse, PaginatedData } from "@/types";
import { Article, ArticleParams, AuthorArticles } from "@/types/article";
import { getPrivateAxios, getPublicAxios } from ".";

type ArticleResponse = ApiResponse<Article>;
type ArticleListResponse = ApiResponse<PaginatedData<Article>>;
type DeletedResponse = ApiResponse<string>;

const name = "article";

const articleApi = {
    paginate: (params?: ArticleParams): Promise<ArticleListResponse> =>
        getPublicAxios().get(name, {
            params,
        }),

    adminPaginate: (params?: ArticleParams): Promise<ArticleListResponse> =>
        getPrivateAxios().get(`${name}/admin`, {
            params,
        }),

    getBySlug: (slug: string): Promise<ArticleResponse> =>
        getPublicAxios().get(`${name}/slug/${slug}`),

    getById: (id: number): Promise<ArticleResponse> =>
        getPublicAxios().get(`${name}/id/${id}`),

    getByAuthorId: (
        authorId: number,
        params?: ArticleParams
    ): Promise<ApiResponse<AuthorArticles>> =>
        getPublicAxios().get(`${name}/author/${authorId}`, {
            params,
        }),

    getRecommendList: (slug: string) =>
        getPublicAxios().get(`${name}/recommend/slug/${slug}`),

    getMyPosts: (params?: ArticleParams) =>
        getPrivateAxios().get(`${name}/author`, { params }),

    create: (body: ArticleRequest): Promise<ArticleResponse> =>
        getPrivateAxios().post(name, body),

    update: (body: Article): Promise<ArticleResponse> =>
        getPrivateAxios().patch(`${name}/${body.id}`, body),

    userCreate: (body: ArticleRequest): Promise<ArticleResponse> =>
        getPrivateAxios().post(`${name}/author`, body),

    userUpdate: (body: Article): Promise<ArticleResponse> =>
        getPrivateAxios().patch(`${name}/author/${body.id}`, body),

    userDelete: (id: number): Promise<DeletedResponse> =>
        getPrivateAxios().delete(`${name}/author/${id}`),

    delete: (id: number): Promise<DeletedResponse> =>
        getPrivateAxios().delete(`${name}/${id}`),

    deleteMultiple: (ids: number[]): Promise<DeletedResponse> =>
        getPrivateAxios().delete(name, { params: { ids: ids.join("_") } }),
};

export default articleApi;
