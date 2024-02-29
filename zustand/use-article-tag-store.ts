import { PaginatedData } from "@/types";
import { ArticleTag } from "@/types/article-tag";
import { create } from "zustand";

type State = {
    articleTags: ArticleTag[];
    setPaginatedArticleTags: (data: PaginatedData<ArticleTag>) => void;
    isFetched: boolean;
    totalPages: number;
    count: number;
    setIsFetched: (isFetched: boolean) => void;
};

const useArticleTagStore = create<State>()((set) => ({
    articleTags: [],
    setPaginatedArticleTags: (data: PaginatedData<ArticleTag>) =>
        set((state) => ({
            ...state,
            articleTags: data.rows,
            count: data.count,
            totalPages: data.total_pages,
            isFetched: true,
        })),
    isFetched: false,
    count: 0,
    totalPages: 0,
    setIsFetched: (isFetched: boolean) =>
        set((state) => ({
            ...state,
            isFetched,
        })),
}));

export default useArticleTagStore;
