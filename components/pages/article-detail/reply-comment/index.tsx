"use client";

import articleReplyCommentApi, {
    ArticleReplyCommentBody,
} from "@/api/article-reply-comment-api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArticleReplyComment } from "@/types/article-reply-comment";
import useDialogStore from "@/zustand/use-dialog-store";
import useUserStore from "@/zustand/use-user-store";
import moment from "moment";
import { useState } from "react";
import EditForm from "./edit-form";
import ReplyForm from "./reply-form";
import CommentActions from "../comment/comment-actions";

type Props = {
    articleReplyComment: ArticleReplyComment;
    onCreate: (body: ArticleReplyCommentBody) => void;
    onDelete: (id: number) => void;
};

const ReplyComment = (props: Props) => {
    const { profile } = useUserStore();
    const { show: showConfirmDialog } = useDialogStore();
    const [replyFormVisible, setReplyFormVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [current, setCurrent] = useState<ArticleReplyComment>(
        props.articleReplyComment
    );

    const handleEdit = async (newContent: string) => {
        try {
            const response = await articleReplyCommentApi.update({
                ...props.articleReplyComment,
                content: newContent,
            });
            if (response.message === "Success") {
                setCurrent((state) => ({
                    ...state,
                    content: newContent,
                }));
                setEditFormVisible(false);
            }
        } catch (error) {}
    };

    const handleCreate = (body: ArticleReplyCommentBody) => {
        props.onCreate(body);
        setReplyFormVisible(false);
    };

    const handleDelete = (id: number) => {
        showConfirmDialog({
            onConfirm: async () => {
                props.onDelete(id);
            },
            description:
                "This action cannot be undone. This will permanently delete your comment.",
        });
    };

    return (
        <li className="space-y-4">
            <div className="flex gap-8">
                <Avatar className="image relative w-20 h-20 flex-shrink-0 border border-border">
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
                                content={current.content}
                                onEdit={handleEdit}
                                onClose={() => setEditFormVisible(false)}
                            />
                        ) : (
                            <>
                                {current.ref_user && (
                                    <span className="bg-neutral-200 mr-1 p-1">
                                        @{current.ref_user.full_name}
                                    </span>
                                )}
                                {current.content}
                            </>
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
                    onCreate={handleCreate}
                    articleReplyComment={current}
                />
            )}
        </li>
    );
};

export default ReplyComment;
