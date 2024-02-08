import { Article } from "./article";

export type ArticleComment = {
    id: number;
    content: string;
    created_at: string;
    article: Article;
    user: {
        id: number;
        email: string;
        full_name: string;
        image_url: string;
    };
    reply_count: number;
};

export type ArticleCommentParams = {
    limit?: number;
    p?: number;
    sort_by?: string;
    sort_type?: string;
    q?: string;
    article_slug?: string;
};
