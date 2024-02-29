"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { Article } from "@/types/article";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    RiCheckLine,
    RiCloseLine,
    RiDeleteBin7Line,
    RiEdit2Line,
} from "react-icons/ri";
import ArticleTagModal from "./article-tag-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDialogStore from "@/zustand/use-dialog-store";
import articleApi from "@/api/article-api";
import { useState } from "react";
import { ArticleTag } from "@/types/article-tag";
import articleTagApi from "@/api/article-tag-api";
import useArticleTagStore from "@/zustand/use-article-tag-store";

type Props = {
    row: Article;
    index: number;
};

const TableArticleItem = ({ row, index }: Props) => {
    const queryClient = useQueryClient();

    const { isFetched, setPaginatedArticleTags, setIsFetched } =
        useArticleTagStore();

    const { show } = useDialogStore();

    const [selectedArticleTags, setSelectedArticleTags] = useState<
        ArticleTag[]
    >(row.tags || []);

    const deleteArticleMutation = useMutation({
        mutationFn: (id: number) => articleApi.userDelete(id),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["my-articles"] });
        },
    });

    const updateArticleMutation = useMutation({
        mutationFn: (newTags: ArticleTag[]) =>
            articleApi.userUpdate({
                ...row,
                tags: newTags,
            }),
        onSuccess: (response) => {
            setSelectedArticleTags(response.data.tags);
        },
    });

    const handleSelectArticleTag = (articleTag: ArticleTag) => {
        updateArticleMutation.mutate([articleTag, ...selectedArticleTags]);
        // setSelectedArticleTags((state) => [articleTag, ...state]);
    };

    const handleDeselectArticleTag = (id: number) => {
        updateArticleMutation.mutate(
            selectedArticleTags.filter((item) => item.id !== id)
        );
        // setSelectedArticleTags((state) =>
        //     state.filter((item) => item.id !== id)
        // );
    };

    const handleDelete = (id: number) => {
        show({
            onConfirm: () => {
                deleteArticleMutation.mutate(id);
            },
            description:
                "This action cannot be undone. This will permanently delete your article.",
        });
    };

    const onOpenChange = async (open: boolean) => {
        if (open) {
            if (!isFetched) {
                try {
                    const response = await articleTagApi.paginate({
                        sort_type: "asc",
                        sort_by: "name",
                    });
                    if (response.message === "Success") {
                        setPaginatedArticleTags(response.data);
                    }
                } catch (error) {}
            }
        } else {
            setIsFetched(false);
        }
    };

    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">
                <div className="image relative w-full pb-[60%]">
                    <Image
                        src={row.image_url}
                        fill
                        priority
                        className="rounded-sm object-cover"
                        alt="thumbnail"
                        sizes="(max-width: 1200px) 40vw, 100vw"
                    />
                </div>
            </TableCell>
            <TableCell>
                {row.is_public ? (
                    <Link href={`/article/${row.slug}`}>{row.title}</Link>
                ) : (
                    row.title
                )}
            </TableCell>
            <TableCell>
                <div className="flex justify-center">
                    {row.is_public ? (
                        <RiCheckLine className="text-xl text-green-600" />
                    ) : (
                        <RiCloseLine className="text-xl text-red-600" />
                    )}
                </div>
            </TableCell>
            <TableCell className="text-right">
                {moment(row.created_at).format("MMM D, YYYY H:m A")}
            </TableCell>
            <TableCell>
                <div className="text-right">
                    <Popover onOpenChange={onOpenChange}>
                        <PopoverTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <BsThreeDotsVertical />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" w-48">
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href={`/profile/article/${row.id}/update`}
                                        className={buttonVariants({
                                            variant: "ghost",
                                            className:
                                                "w-full !justify-start flex gap-2",
                                        })}
                                    >
                                        <RiEdit2Line /> Edit
                                    </Link>
                                </li>
                                <li>
                                    <ArticleTagModal
                                        articleId={row.id}
                                        selectedArticleTags={
                                            selectedArticleTags
                                        }
                                        onSelect={handleSelectArticleTag}
                                        onDeselect={handleDeselectArticleTag}
                                    />
                                </li>
                                <li>
                                    <Button
                                        onClick={() => handleDelete(row.id)}
                                        variant="ghost"
                                        className="w-full justify-start gap-2"
                                    >
                                        <RiDeleteBin7Line />
                                        Delete
                                    </Button>
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default TableArticleItem;
