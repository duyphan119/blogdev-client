import { ApiResponse, PaginatedData } from "@/types";
import { getPrivateAxios, getPublicAxios } from ".";
import {
    ArticleReplyComment,
    ArticleReplyCommentParams,
} from "@/types/article-reply-comment";

const articleReplyCommentApi = {
    create: async (body: any) => {
        const response: ApiResponse<ArticleReplyComment> =
            await getPrivateAxios().post("article-reply-comment", body);
        return response;
    },
    paginate: async (params?: ArticleReplyCommentParams) => {
        const response: ApiResponse<PaginatedData<ArticleReplyComment>> =
            await getPublicAxios().get("article-reply-comment", {
                params,
            });
        return response;
    },
    delete: async (id: number) => {
        const response: ApiResponse<string> = await getPrivateAxios().delete(
            `article-reply-comment/${id}`
        );
        return response;
    },
};

export default articleReplyCommentApi;
