import articleCommentApi from "@/api/article-comment-api";
import { ArticleCommentRequest } from "@/components/pages/article-detail/comment-form";
import { ArticleComment } from "@/types/article-comment";
import { useMutation } from "@tanstack/react-query";

export default function useArticleCommentMutation() {
    const createArticleCommentMutation = useMutation({
        mutationFn: (
            body: ArticleCommentRequest & { article: { id: number } }
        ) => articleCommentApi.create(body),
    });
    const updateArticleCommentMutation = useMutation({
        mutationFn: (body: ArticleComment) => articleCommentApi.update(body),
    });

    return {
        createArticleCommentMutation,
        updateArticleCommentMutation,
    };
}
