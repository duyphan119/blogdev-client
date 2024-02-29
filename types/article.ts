import { PaginatedData } from ".";
import { ArticleTag } from "./article-tag";
import { Category } from "./category";
import { Author } from "./user";

export type Article = {
    id: number;
    image_url: string;
    title: string;
    slug: string;
    created_at: string;
    content: string;
    views: number;
    commentCount: number;
    author: Author;
    category: Category;
    introduction_text: string;
    is_public: boolean;
    tags: ArticleTag[];
};

export type ArticleParams = {
    limit?: number;
    p?: number;
    sort_by?: string;
    sort_type?: string;
    q?: string;
    cat?: string;
};

export type AuthorArticles = PaginatedData<Article> & {
    author: Author;
};
