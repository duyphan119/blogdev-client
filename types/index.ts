export type ApiResponse<T> = {
    message: "Success" | "Error";
    data: T;
};

export type PaginatedData<T> = {
    rows: T[];
    count: number;
    total_pages: number;
};
