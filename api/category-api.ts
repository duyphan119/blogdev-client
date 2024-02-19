import { Category, GetAllCategoryParams } from "@/types/category";
import { getPublicAxios } from ".";
import { ApiResponse } from "@/types";

const categoryApi = {
    getAll: async (params?: GetAllCategoryParams) => {
        const response: ApiResponse<Category[]> = await getPublicAxios().get(
            "category",
            { params }
        );
        return response;
    },
};

export default categoryApi;
