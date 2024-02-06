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
