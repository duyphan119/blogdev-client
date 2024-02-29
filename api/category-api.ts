import {
    Category,
    CategoryParams,
    GetAllCategoryParams,
} from "@/types/category";
import { getPrivateAxios, getPublicAxios } from ".";
import { ApiResponse, PaginatedData } from "@/types";

const categoryApi = {
    getAll: async (
        params?: GetAllCategoryParams
    ): Promise<ApiResponse<Category[]>> =>
        getPublicAxios().get("category", {
            params: {
                no_paginate: true,
                ...params,
            },
        }),

    getBySlug: async (slug: string): Promise<ApiResponse<Category>> =>
        getPublicAxios().get(`category/slug/${slug}`),

    paginate: async (
        params?: CategoryParams
    ): Promise<ApiResponse<PaginatedData<Category>>> =>
        getPublicAxios().get("category", {
            params,
        }),
    delete: async (id: number) => {
        const response: ApiResponse<string> = await getPrivateAxios().delete(
            `category/${id}`
        );
        return response;
    },
};

export default categoryApi;
