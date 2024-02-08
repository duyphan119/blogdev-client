"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArticleReplyComment } from "@/types/article-reply-comment";
import moment from "moment";
import { useState } from "react";
import EditForm from "./edit-form";
import ReplyForm from "./reply-form";

type Props = {
    articleReplyComment: ArticleReplyComment;
};

const ReplyComment = (props: Props) => {
    const [replyFormVisible, setReplyFormVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);

    const handleEdit = (newContent: string) => {
        //
    };

    const handleCreate = (articleReplyComment: ArticleReplyComment) => {
        setReplyFormVisible(false);
    };

    return (
        <li key={props.articleReplyComment.id} className="space-y-4">
            <div className="flex gap-8">
                <Avatar className="image relative w-20 h-20 flex-shrink-0">
                    <AvatarImage
                        src={props.articleReplyComment.user.image_url}
                    />
                </Avatar>
                <div className="space-y-2">
                    <div className="flex gap-2 items-center text-sm">
                        <div className="font-bold">
                            {props.articleReplyComment.user.full_name}
                        </div>
                        <Separator className="h-4" orientation="vertical" />
                        <time className="text-neutral-500">
                            {moment(
                                props.articleReplyComment.created_at
                            ).fromNow()}
                        </time>
                    </div>
                    <div className="">
                        {editFormVisible ? (
                            <EditForm
                                content={props.articleReplyComment.content}
                                onEdit={handleEdit}
                            />
                        ) : (
                            props.articleReplyComment.content
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
                        <button
                            type="button"
                            onClick={() =>
                                setEditFormVisible((state) => !state)
                            }
                            className="text-sm hover:underline underline-offset-4 text-neutral-500"
                        >
                            EDIT
                        </button>
                        <button
                            type="button"
                            className="text-sm hover:underline underline-offset-4 text-neutral-500 hover:text-red-500"
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
            {replyFormVisible && (
                <ReplyForm
                    articleCommentId={props.articleReplyComment.id}
                    onCreate={handleCreate}
                />
            )}
        </li>
    );
};

export default ReplyComment;
