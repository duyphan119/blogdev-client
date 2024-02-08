import { ArticleCommentRequest } from "@/components/pages/article-detail/comment-form";
import { ApiResponse, PaginatedData } from "@/types";
import { ArticleComment, ArticleCommentParams } from "@/types/article-comment";
import { getPrivateAxios, getPublicAxios } from ".";

const articleCommentApi = {
    create: async (
        body: ArticleCommentRequest & { article: { id: number } }
    ) => {
        const response: ApiResponse<ArticleComment> =
            await getPrivateAxios().post("article-comment", body);
        return response;
    },
    update: async (body: ArticleComment) => {
        const response: ApiResponse<ArticleComment> =
            await getPrivateAxios().patch(`article-comment/${body.id}`, body);
        return response;
    },
    paginate: async (params?: ArticleCommentParams) => {
        const response: ApiResponse<PaginatedData<ArticleComment>> =
            await getPublicAxios().get("article-comment", {
                params,
            });
        return response;
    },
    delete: async (id: number) => {
        const response: ApiResponse<string> = await getPrivateAxios().delete(
            `article-comment/${id}`
        );
        return response;
    },
};

export default articleCommentApi;
