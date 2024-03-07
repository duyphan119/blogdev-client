import { ApiResponse, PaginatedData } from "@/types";
import { CategoryParent, CategoryParentParams } from "@/types/category-parent";
import { getPrivateAxios, getPublicAxios } from ".";
import { CategoryParentRequest } from "@/components/category-parent/category-parent-form";

type CategoryParentResponse = ApiResponse<CategoryParent>;
type CategoryParentListResponse = ApiResponse<PaginatedData<CategoryParent>>;
type DeletedResponse = ApiResponse<string>;

const name = "category-parent";

const categoryParentApi = {
  paginate: (
    params?: CategoryParentParams
  ): Promise<CategoryParentListResponse> =>
    getPublicAxios().get(name, {
      params,
    }),

  adminPaginate: (
    params?: CategoryParentParams
  ): Promise<CategoryParentListResponse> =>
    getPrivateAxios().get(`${name}/admin`, {
      params,
    }),

  getById: (id: number): Promise<CategoryParentResponse> =>
    getPublicAxios().get(`${name}/${id}`),

  delete: (id: number): Promise<DeletedResponse> =>
    getPrivateAxios().delete(`${name}/${id}`),

  deleteMultiple: (ids: number[]): Promise<DeletedResponse> =>
    getPrivateAxios().delete(name, {
      params: { ids: ids.join(`_`) },
    }),

  update: (body: CategoryParent): Promise<CategoryParentResponse> =>
    getPrivateAxios().patch(`${name}/${body.id}`, body),

  create: (body: CategoryParentRequest): Promise<CategoryParentResponse> =>
    getPrivateAxios().post(name, body),
};

export default categoryParentApi;
