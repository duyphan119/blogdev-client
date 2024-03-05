import { ApiResponse, PaginatedData } from "@/types";
import { CategoryParent, CategoryParentParams } from "@/types/category-parent";
import { getPrivateAxios, getPublicAxios } from ".";

type CategoryParentResponse = ApiResponse<CategoryParent>;
type CategoryParentListResponse = ApiResponse<PaginatedData<CategoryParent>>;
type DeletedResponse = ApiResponse<string>;

const categoryParentApi = {
    paginate: async (
        params?: CategoryParentParams
    ): Promise<CategoryParentListResponse> =>
        getPublicAxios().get("category-parent", {
            params,
        }),

    adminPaginate: async (
        params?: CategoryParentParams
    ): Promise<CategoryParentListResponse> =>
        getPrivateAxios().get("category-parent/admin", {
            params,
        }),

    delete: async (id: number): Promise<DeletedResponse> =>
        getPrivateAxios().delete(`category-parent/${id}`),

    deleteMultiple: async (ids: number[]): Promise<DeletedResponse> =>
        getPrivateAxios().delete(`category-parent`, {
            params: { ids: ids.join("_") },
        }),

    update: async (body: CategoryParent): Promise<CategoryParentResponse> =>
        getPrivateAxios().patch(`category-parent/${body.id}`, body),
};

export default categoryParentApi;
