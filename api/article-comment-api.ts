import { ArticleCommentRequest } from "@/components/pages/article-detail/comment-form";
import { ApiResponse, PaginatedData } from "@/types";
import { ArticleComment, ArticleCommentParams } from "@/types/article-comment";
import { getPrivateAxios, getPublicAxios } from ".";

type ArticleCommentResponse = ApiResponse<ArticleComment>;
type ArticleCommentsResponse = ApiResponse<PaginatedData<ArticleComment>>;
type DeletedResponse = ApiResponse<string>;

const articleCommentApi = {
  create: (body: ArticleCommentRequest): Promise<ArticleCommentResponse> =>
    getPrivateAxios().post("article-comment", body),

  update: (body: ArticleComment): Promise<ArticleCommentResponse> =>
    getPrivateAxios().patch(`article-comment/${body.id}`, body),

  paginate: (params?: ArticleCommentParams): Promise<ArticleCommentsResponse> =>
    getPublicAxios().get("article-comment", {
      params,
    }),

  delete: (id: number): Promise<DeletedResponse> =>
    getPrivateAxios().delete(`article-comment/${id}`),
};

export default articleCommentApi;
