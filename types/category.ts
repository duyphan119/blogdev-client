import { CategoryParent } from "./category-parent";

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
    parent: CategoryParent;
};

export type CategoryParams = {
    p?: number;
    limit?: number;
    sort_by?: string;
    sort_type?: string;
    keyword?: string;
};

export type GetAllCategoryParams = {
    sort_by?: string;
    sort_type?: string;
    no_paginate?: boolean;
};
