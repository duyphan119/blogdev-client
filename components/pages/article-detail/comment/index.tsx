"use client";

import articleCommentApi from "@/api/article-comment-api";
import articleReplyCommentApi, {
    ArticleReplyCommentBody,
} from "@/api/article-reply-comment-api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArticleComment } from "@/types/article-comment";
import useDialogStore from "@/zustand/use-dialog-store";
import useUserStore from "@/zustand/use-user-store";
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import ReplyComment from "../reply-comment";
import CommentActions from "./comment-actions";
import EditForm from "./edit-form";
import ReplyForm from "./reply-form";

type Props = {
    articleComment: ArticleComment;
};
const ARTICLE_REPLY_COMMENT_LIMIT = 2;
const Comment = (props: Props) => {
    const queryClient = useQueryClient();

    const { profile } = useUserStore();
    const { show: showConfirmDialog } = useDialogStore();

    const [replyFormVisible, setReplyFormVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [queryIsEnabled, setQueryIsEnabled] = useState(false);
    const [current, setCurrent] = useState(props.articleComment);
    const [articleReplyCommentLimit, setArticleReplyCommentLimit] = useState(0);

    const query = useQuery({
        queryKey: ["article-comment-" + current.id, articleReplyCommentLimit],
        queryFn: () =>
            articleReplyCommentApi.paginate({
                limit: articleReplyCommentLimit,
                p: 1,
                article_comment_id: current.id,
            }),
        refetchOnMount: false,
        enabled: queryIsEnabled,
        placeholderData: keepPreviousData,
    });

    const createArticleReplyCommentMutation = useMutation({
        mutationFn: (body: ArticleReplyCommentBody) =>
            articleReplyCommentApi.create(body),
        onSuccess: (data) => {
            setArticleReplyCommentLimit((state) => state + 1);
            setQueryIsEnabled(true);
            if (!data.data.ref_user) {
                setReplyFormVisible(false);
            }
        },
    });

    const deleteArticleReplyCommentMutation = useMutation({
        mutationFn: (id: number) => articleReplyCommentApi.delete(id),
        onSuccess: (data) => {
            setArticleReplyCommentLimit((state) => state - 1);
            setQueryIsEnabled(true);
        },
    });

    useEffect(() => {
        if (query.isFetched) {
            setQueryIsEnabled(false);
        }
    }, [query.isFetched]);

    const deleteArticleCommentMutation = useMutation({
        mutationFn: (id: number) => articleCommentApi.delete(id),
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["article-comments"] }),
    });

    const handleEdit = (newArticleComment: ArticleComment) => {
        setCurrent((state) => ({
            ...state,
            ...newArticleComment,
        }));
        setEditFormVisible(false);
    };

    const handleViewReplies = async (newLimit: number) => {
        setArticleReplyCommentLimit(newLimit);
        setQueryIsEnabled(true);
    };

    const handleHideReplies = async () => {
        setArticleReplyCommentLimit(0);
        setQueryIsEnabled(true);
    };

    const handleDelete = async (id: number) => {
        showConfirmDialog({
            onConfirm: () => {
                deleteArticleCommentMutation.mutate(id);
            },
            description:
                "This action cannot be undone. This will permanently delete your comment.",
        });
    };

    return (
        <li key={current.id} className="space-y-4">
            <div className="flex gap-8">
                <Avatar className="image relative w-20 h-20 flex-shrink-0 border border-border">
                    <AvatarImage src={current.user.image_url} />
                </Avatar>
                <div className="space-y-2 flex-1">
                    <div className="flex gap-2 items-center text-sm">
                        <div className="font-bold">
                            {current.user.full_name}
                        </div>
                        <Separator className="h-4" orientation="vertical" />
                        <time className="text-neutral-500">
                            {moment(current.created_at).fromNow()}
                        </time>
                    </div>
                    <div className="w-full">
                        {editFormVisible ? (
                            <EditForm
                                articleComment={current}
                                onEdit={handleEdit}
                                onClose={() => setEditFormVisible(false)}
                            />
                        ) : (
                            current.content
                        )}
                    </div>
                    <CommentActions
                        onReply={() => setReplyFormVisible((state) => !state)}
                        articleUserId={current.user.id}
                        onEdit={() => setEditFormVisible((state) => !state)}
                        onDelete={() => handleDelete(current.id)}
                    />
                </div>
            </div>
            {replyFormVisible && (
                <ReplyForm
                    articleCommentId={current.id}
                    onCreate={(body: ArticleReplyCommentBody) => {
                        createArticleReplyCommentMutation.mutate(body);
                    }}
                />
            )}
            {(query.data?.data.rows || []).length > 0 && (
                <ul className="ml-28 flex flex-col gap-4">
                    {(query.data?.data.rows || []).map((item) => {
                        return (
                            <ReplyComment
                                key={item.id}
                                articleReplyComment={item}
                                onCreate={(body: ArticleReplyCommentBody) => {
                                    createArticleReplyCommentMutation.mutate(
                                        body
                                    );
                                }}
                                onDelete={(id: number) =>
                                    deleteArticleReplyCommentMutation.mutate(id)
                                }
                            />
                        );
                    })}
                </ul>
            )}
            {current.reply_count > 0 && (
                <div className="ml-28">
                    {(query.data?.data.rows || []).length <
                    current.reply_count ? (
                        <button
                            onClick={() =>
                                handleViewReplies(
                                    articleReplyCommentLimit +
                                        ARTICLE_REPLY_COMMENT_LIMIT
                                )
                            }
                            className="underline underline-offset-4"
                        >
                            View more replies
                        </button>
                    ) : (
                        <button
                            onClick={handleHideReplies}
                            className="underline underline-offset-4"
                        >
                            Hide replies
                        </button>
                    )}
                </div>
            )}
        </li>
    );
};

export default Comment;
