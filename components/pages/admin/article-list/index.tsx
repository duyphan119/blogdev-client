"use client";

import DataTable from "@/components/common/data-table";
import Box from "../box";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import articleApi from "@/api/article-api";
import moment from "moment";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { createSearchParams } from "@/lib/utils";
import useDialogStore from "@/zustand/use-dialog-store";
import { Article } from "@/types/article";
import Image from "next/image";
import { FormEventHandler, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
    currentPage?: number;
};

const ArticleListPage = ({ currentPage = 1 }: Props) => {
    const router = useRouter();

    const queryClient = useQueryClient();

    const { show } = useDialogStore();

    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

    const query = useQuery({
        queryKey: ["admin-article-list"],
        queryFn: () => articleApi.paginate(),
    });

    const deleteArticleMutation = useMutation({
        mutationFn: (id: number) => articleApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-article-list"],
            });
        },
    });

    const handleDelete = (id: number) => {
        show({
            onConfirm: () => {
                deleteArticleMutation.mutate(id);
            },
            description:
                "This action cannot be undone. This will permanently delete your article.",
        });
    };

    const handlePageChange = (newPage: number) => {
        router.push(
            `/admin/article?${createSearchParams({
                ...(newPage > 1 ? { p: newPage } : {}),
            })}`
        );
    };

    const handleCheckedChange = (checkedState: CheckedState, id: number) => {
        if (checkedState === true) {
            setCheckedIds((state) => [id, ...state]);
        } else {
            setCheckedIds((state) => state.filter((elm) => elm !== id));
        }
    };

    return (
        <div>
            <Box title="Article List">
                <DataTable
                    tableOptions={{
                        rows: query.data?.data.rows || [],
                        columns: [
                            {
                                field: "check",
                                text: "",
                                className: "w-6",
                                render: (row: Article) => (
                                    <Checkbox
                                        id={`row-${row.id}`}
                                        checked={
                                            isCheckAll ||
                                            checkedIds.includes(row.id)
                                        }
                                        onCheckedChange={(checkedState) =>
                                            handleCheckedChange(
                                                checkedState,
                                                row.id
                                            )
                                        }
                                    />
                                ),
                                renderColumn: () => (
                                    <Checkbox
                                        id="checkAll"
                                        checked={isCheckAll}
                                        onCheckedChange={(checkedState) =>
                                            setIsCheckAll(checkedState === true)
                                        }
                                    />
                                ),
                            },
                            {
                                field: "index",
                                text: "#",
                                className: "w-6",
                            },
                            {
                                field: "title",
                                text: "Title",
                                render: (row: Article) => (
                                    <div className="flex gap-2">
                                        <div className="h-12 w-[4.5rem] relative">
                                            <Image
                                                src={row.image_url}
                                                fill={true}
                                                priority={true}
                                                alt=""
                                                className="object-cover"
                                                sizes="72px"
                                            />
                                        </div>
                                        <p>{row.title}</p>
                                    </div>
                                ),
                            },
                            {
                                field: "category",
                                text: "Category",
                                render: (row: Article) =>
                                    row.category?.name || "",
                            },
                            {
                                field: "author",
                                text: "Author",
                                render: (row: Article) => row.author.full_name,
                            },
                            {
                                field: "createdAt",
                                text: "Created At",
                                className: "w-48 text-center",
                                render: (row) =>
                                    moment(row.created_at).format(
                                        "MMM DD, YYYY H:m A"
                                    ),
                            },
                            {
                                field: "actions",
                                text: "Actions",
                                className: "text-right",
                                render: (row) => (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <BsThreeDotsVertical />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48">
                                            <ul className="space-y-4">
                                                <li>
                                                    <Link
                                                        href={`/admin/article/${row.id}/update`}
                                                        className={buttonVariants(
                                                            {
                                                                variant:
                                                                    "ghost",
                                                                className:
                                                                    "w-full !justify-start flex gap-2",
                                                            }
                                                        )}
                                                    >
                                                        <RiEdit2Line /> Edit
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Button
                                                        onClick={() =>
                                                            handleDelete(row.id)
                                                        }
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
                                ),
                            },
                        ],
                    }}
                    paginationOptions={{
                        currentPage,
                        totalPages: query.data?.data.total_pages || 0,
                        onPageChange: handlePageChange,
                    }}
                    headOptions={{
                        createButtonLink: {
                            href: "/admin/article/create",
                        },
                        deleteButton: {
                            onClick: () => {
                                console.log("delete many");
                            },
                            text:
                                query.data &&
                                (isCheckAll
                                    ? `Delete (${query.data.data.count})`
                                    : checkedIds.length > 0
                                    ? `Delete (${checkedIds.length})`
                                    : "Delete"),
                        },
                    }}
                />
            </Box>
        </div>
    );
};

export default ArticleListPage;
