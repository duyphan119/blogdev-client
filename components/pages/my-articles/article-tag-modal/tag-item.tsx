"use client";

import articleTagApi from "@/api/article-tag-api";
import { Badge } from "@/components/ui/badge";
import { ArticleTag } from "@/types/article-tag";
import useDialogStore from "@/zustand/use-dialog-store";
import { useMutation } from "@tanstack/react-query";
import { IoCloseCircle } from "react-icons/io5";

type Props = {
    tag: ArticleTag;
    onSelect: (newArticleTag: ArticleTag) => void;
    onDeselect: (id: number) => void;
    isActive: boolean;
};

const TagItem = (props: Props) => {
    const { show } = useDialogStore();

    const deleteArticleTagMutation = useMutation({
        mutationFn: (id: number) => articleTagApi.delete(id),
        onSuccess: (response) => {
            props.onDeselect(props.tag.id);
        },
    });

    const handleDelete = () => {
        show({
            onConfirm: () => {
                deleteArticleTagMutation.mutate(props.tag.id);
            },
            description:
                "This action cannot be undone. This will permanently delete this tag.",
        });
    };

    return (
        <Badge
            onClick={() =>
                props.isActive
                    ? props.onDeselect(props.tag.id)
                    : props.onSelect(props.tag)
            }
            variant={props.isActive ? "default" : "outline"}
            className="cursor-pointer"
        >
            {props.tag.name}
            <IoCloseCircle
                className="ml-1 hover:text-red-500"
                onClick={handleDelete}
            />
        </Badge>
    );
};

export default TagItem;
