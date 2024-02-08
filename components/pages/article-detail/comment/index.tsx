"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArticleComment } from "@/types/article-comment";
import moment from "moment";
import { useState } from "react";
import EditForm from "./edit-form";
import ReplyForm from "./reply-form";
import { ArticleReplyComment } from "@/types/article-reply-comment";
import ReplyComment from "../reply-comment";
import articleReplyCommentApi from "@/api/article-reply-comment-api";
import useUserStore from "@/zustand/use-user-store";
import articleCommentApi from "@/api/article-comment-api";

type Props = {
    articleComment: ArticleComment;
    onDelete: (id: number) => void;
};
const ARTICLE_REPLY_COMMENT_LIMIT = 5;
const Comment = (props: Props) => {
    const { profile } = useUserStore();
    const [replyFormVisible, setReplyFormVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [articleReplyComments, setArticleReplyComments] = useState<
        ArticleReplyComment[]
    >([]);
    const [articleReplyCommentLimit, setArticleReplyCommentLimit] = useState(
        ARTICLE_REPLY_COMMENT_LIMIT
    );
    const [current, setCurrent] = useState(props.articleComment);

    const handleEdit = (newArticleComment: ArticleComment) => {
        setCurrent((state) => ({
            ...state,
            ...newArticleComment,
        }));
        setEditFormVisible(false);
    };

    const handleCreate = (articleReplyComment: ArticleReplyComment) => {
        setArticleReplyComments((state) => [articleReplyComment, ...state]);
        setReplyFormVisible(false);
    };

    const handleViewReplies = async (newLimit: number) => {
        try {
            const response = await articleReplyCommentApi.paginate({
                limit: newLimit,
                p: 1,
                article_comment_id: current.id,
            });

            if (response.message === "Success") {
                setArticleReplyComments(response.data.rows);
            }
        } catch (error) {}
        setArticleReplyCommentLimit(newLimit);
    };

    const handleHideReplies = async () => {
        setArticleReplyCommentLimit(ARTICLE_REPLY_COMMENT_LIMIT);
        setArticleReplyComments([]);
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await articleCommentApi.delete(id);
            if (response.message === "Success") {
                props.onDelete(id);
            }
        } catch (error) {}
    };

    return (
        <li key={current.id} className="space-y-4">
            <div className="flex gap-8">
                <Avatar className="image relative w-20 h-20 flex-shrink-0">
                    <AvatarImage src={current.user.image_url} />
                </Avatar>
                <div className="space-y-2">
                    <div className="flex gap-2 items-center text-sm">
                        <div className="font-bold">
                            {current.user.full_name}
                        </div>
                        <Separator className="h-4" orientation="vertical" />
                        <time className="text-neutral-500">
                            {moment(current.created_at).fromNow()}
                        </time>
                    </div>
                    <div className="">
                        {editFormVisible ? (
                            <EditForm
                                articleComment={current}
                                onEdit={handleEdit}
                            />
                        ) : (
                            current.content
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                setReplyFormVisible((state) => !state)
                            }
                            className="text-sm hover:underline underline-offset-4 text-neutral-500"
                        >
                            REPLY
                        </button>
                        {profile && profile.id === current.user.id && (
                            <>
                                <button
                                    onClick={() =>
                                        setEditFormVisible((state) => !state)
                                    }
                                    title="Edit comment"
                                    className="text-sm hover:underline underline-offset-4 text-neutral-500"
                                >
                                    EDIT
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(props.articleComment.id)
                                    }
                                    title="Delete comment"
                                    className="text-sm hover:underline underline-offset-4 text-neutral-500 hover:text-red-500"
                                >
                                    DELETE
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {replyFormVisible && (
                <ReplyForm
                    articleCommentId={current.id}
                    onCreate={handleCreate}
                />
            )}
            {articleReplyComments.length > 0 && (
                <ul className="ml-28 space-y-4">
                    {articleReplyComments.map((item) => {
                        return (
                            <ReplyComment
                                key={item.id}
                                articleReplyComment={item}
                            />
                        );
                    })}
                </ul>
            )}
            {current.reply_count > 0 && (
                <div className="ml-28">
                    {articleReplyComments.length < current.reply_count ? (
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
