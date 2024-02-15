"use client";

import { Separator } from "@/components/ui/separator";
import useUserStore from "@/zustand/use-user-store";
import { RiDeleteBin2Line, RiEdit2Line, RiReplyLine } from "react-icons/ri";

type Props = {
    onReply: () => void;
    articleUserId: number;
    onDelete: () => void;
    onEdit: () => void;
};

const CommentActions = (props: Props) => {
    const { profile } = useUserStore();

    return (
        <div className="flex gap-4">
            <button
                type="button"
                onClick={props.onReply}
                className="text-sm hover:underline underline-offset-4 text-neutral-500 flex items-center gap-1"
            >
                <RiReplyLine className="text-lg" />
                REPLY
            </button>
            {profile && profile.id === props.articleUserId && (
                <>
                    <Separator orientation="vertical" className="h-4" />
                    <button
                        onClick={props.onEdit}
                        title="Edit comment"
                        className="text-sm hover:underline underline-offset-4 text-neutral-500 flex items-center gap-1"
                    >
                        <RiEdit2Line />
                        EDIT
                    </button>
                    <Separator orientation="vertical" className="h-4" />
                    <button
                        onClick={props.onDelete}
                        title="Delete comment"
                        className="text-sm hover:underline underline-offset-4 text-neutral-500 hover:text-red-500 flex items-center gap-1"
                    >
                        <RiDeleteBin2Line />
                        DELETE
                    </button>
                </>
            )}
        </div>
    );
};

export default CommentActions;
