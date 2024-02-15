import { ApiResponse, PaginatedData } from "@/types";
import { getPrivateAxios, getPublicAxios } from ".";
import {
    ArticleReplyComment,
    ArticleReplyCommentParams,
} from "@/types/article-reply-comment";
import { ArticleReplyCommentRequest } from "@/components/pages/article-detail/comment/reply-form";

export type ArticleReplyCommentBody = ArticleReplyCommentRequest & {
    ref_user_id?: number;
    article_comment: {
        id: number;
    };
};

const articleReplyCommentApi = {
    create: async (body: ArticleReplyCommentBody) => {
        const response: ApiResponse<ArticleReplyComment> =
            await getPrivateAxios().post("article-reply-comment", body);
        return response;
    },
    update: async (body: ArticleReplyComment) => {
        const response: ApiResponse<ArticleReplyComment> =
            await getPrivateAxios().patch(
                `article-reply-comment/${body.id}`,
                body
            );
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
