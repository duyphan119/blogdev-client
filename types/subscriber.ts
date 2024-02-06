export type Subscriber = {
    id: number;
    email: string;
    created_at: string;
};

export type SubscriberParams = {
    limit?: number;
    p?: number;
    q?: string;
    sort_by?: string;
    sort_type?: string;
};
