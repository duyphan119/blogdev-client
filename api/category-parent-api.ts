import { ApiResponse, PaginatedData } from "@/types";
import { CategoryParent, CategoryParentParams } from "@/types/category-parent";
import { getPublicAxios } from ".";

const categoryParentApi = {
    getAll: async (params?: CategoryParentParams) => {
        const response: ApiResponse<CategoryParent[]> =
            await getPublicAxios().get("category-parent", {
                params: {
                    no_paginate: true,
                    ...params,
                },
            });
        return response;
    },
    paginate: async (params?: CategoryParentParams) => {
        const response: ApiResponse<PaginatedData<CategoryParent>> =
            await getPublicAxios().get("category-parent", {
                params,
            });
        return response;
    },
};

export default categoryParentApi;
