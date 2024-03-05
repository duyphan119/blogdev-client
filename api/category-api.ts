import { Category, CategoryParams } from "@/types/category";
import { getPrivateAxios, getPublicAxios } from ".";
import { ApiResponse, PaginatedData } from "@/types";

type CategoryResponse = ApiResponse<Category>;
type CategoryListResponse = ApiResponse<PaginatedData<Category>>;
type DeletedResponse = ApiResponse<string>;

const categoryApi = {
    getBySlug: async (slug: string): Promise<CategoryResponse> =>
        getPublicAxios().get(`category/slug/${slug}`),

    adminPaginate: async (
        params?: CategoryParams
    ): Promise<CategoryListResponse> =>
        getPrivateAxios().get("category/admin", {
            params,
        }),

    paginate: async (params?: CategoryParams): Promise<CategoryListResponse> =>
        getPublicAxios().get("category", {
            params,
        }),

    delete: async (id: number): Promise<DeletedResponse> =>
        getPrivateAxios().delete(`category/${id}`),

    deleteMultiple: (ids: number[]): Promise<DeletedResponse> =>
        getPrivateAxios().delete(`category`, {
            params: { ids: ids.join("_") },
        }),

    update: async (body: Category): Promise<CategoryResponse> =>
        getPrivateAxios().patch(`category-parent/${body.id}`, body),
};

export default categoryApi;
