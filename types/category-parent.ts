export type CategoryParent = {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    is_public: boolean;
};

export type CategoryParentParams = {
    p?: number;
    limit?: number;
    sort_by?: string;
    sort_type?: string;
    q?: string;
};
