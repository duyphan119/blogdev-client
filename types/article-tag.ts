export type ArticleTag = {
    id: number;
    name: string;
    slug: string;
    created_at: string;
};

export type ArticleTagParams = {
    limit?: number;
    p?: number;
    sort_by?: string;
    sort_type?: string;
    q?: string;
};
