"use client";

import { Button } from "@/components/ui/button";
import Comment from "./comment";
import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import articleCommentApi from "@/api/article-comment-api";

type Props = {
    articleSlug: string;
};

const COMMENT_LIMIT = 5;

const Comments = (props: Props) => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);

    const query = useQuery({
        queryKey: ["article-comments", props.articleSlug, page],
        queryFn: () =>
            articleCommentApi.paginate({
                article_slug: props.articleSlug,
                p: 1,
                limit: COMMENT_LIMIT * page,
            }),
        placeholderData: keepPreviousData,
        staleTime: 5000,
        refetchOnMount: false,
        enabled: !!(props.articleSlug && page),
    });

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
        if (
            !query.isPlaceholderData &&
            page < +("" + query.data?.data.total_pages)
        ) {
            queryClient.prefetchQuery({
                queryKey: ["projects", page + 1],
                queryFn: () =>
                    articleCommentApi.paginate({
                        article_slug: props.articleSlug,
                        p: 1,
                        limit: COMMENT_LIMIT * page,
                    }),
            });
        }
    }, [query.data, query.isPlaceholderData, page, queryClient]);

    if (!query.data) return null;

    return (
        <div className="space-y-4">
            <div className="text-xl font-semibold">
                {`Comments ${
                    query.data.data.count > 0
                        ? `(${query.data.data.count})`
                        : ""
                }`}
            </div>
            <div className="article-comments">
                {query.data.data.rows.length > 0 ? (
                    <div className="space-y-8">
                        <ul className="space-y-8">
                            {query.data.data.rows.map((articleComment) => {
                                return (
                                    <Comment
                                        key={articleComment.id}
                                        articleComment={articleComment}
                                    />
                                );
                            })}
                        </ul>
                        {page < query.data.data.total_pages && (
                            <Button
                                onClick={() => handlePageChange(page + 1)}
                                variant="outline"
                                className="w-full uppercase"
                            >
                                View more
                            </Button>
                        )}
                        {query.data.data.rows.length > COMMENT_LIMIT && (
                            <Button
                                onClick={() => handlePageChange(1)}
                                variant="outline"
                                className="w-full uppercase"
                            >
                                Collapse
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="bg-slate-200 px-4 py-2">
                        There are no comments yet. Why don't you write one?
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comments;
