import { PaginatedData } from ".";
import { Category } from "./category";
import { Author } from "./user";

export type ArticleCard = {
    id: number;
    image_url: string;
    title: string;
    slug: string;
    created_at: string;
    author_id: number;
    author_full_name: string;
    category_name: string;
    category_slug: string;
    introduction_text: string;
    is_public: boolean;
};

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
};

export type ArticleParams = {
    limit?: number;
    p?: number;
    sort_by?: string;
    sort_type?: string;
    q?: string;
};

export type AuthorArticles = PaginatedData<ArticleCard> & {
    author: Author;
};
