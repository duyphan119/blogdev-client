export type CategoryParent = {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
};

export type CategoryParentParams = {
    p?: number;
    limit?: number;
    sort_by?: string;
    sort_type?: string;
    keyword?: string;
};
