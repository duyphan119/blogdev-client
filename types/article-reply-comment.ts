import { ArticleComment } from "./article-comment";

export type ArticleReplyComment = {
    id: number;
    content: string;
    created_at: string;
    article_comment: ArticleComment;
    user: {
        id: number;
        email: string;
        full_name: string;
        image_url: string;
    };
    ref_user: {
        id: number;
        email: string;
        full_name: string;
        image_url: string;
    } | null;
};

export type ArticleReplyCommentParams = {
    limit?: number;
    p?: number;
    sort_by?: string;
    sort_type?: string;
    q?: string;
    article_comment_id?: number;
};
