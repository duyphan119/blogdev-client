export type ApiResponse<T> = {
    message: "Success" | "Error";
    data: T;
}

export type PaginatedResponse<T> = ApiResponse<{
    rows: T[];
    count: number;
    total_pages: number;
}>