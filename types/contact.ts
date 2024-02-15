export type Contact = {
    id: number;
    full_name: string;
    email: string;
    content: string;
    created_at: string;
};

export type ContactParams = {
    limit?: number;
    p?: number;
    sort_by?: string;
    sort_type?: string;
    q?: string;
};
