export type ArticleCategory = {
    id: number;
    name: string;
    slug: string;
    articles: Array<{
        id: number;
        image_url: string;
        title: string;
        slug: string;
    }>;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
};
