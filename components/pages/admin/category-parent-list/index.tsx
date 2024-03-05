"use client";

import categoryParentApi from "@/api/category-parent-api";
import DataTable from "@/components/common/data-table";
import CellCheck from "@/components/common/data-table/cell-check";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { createSearchParams } from "@/lib/utils";
import { CategoryParent } from "@/types/category-parent";
import useDialogStore from "@/zustand/use-dialog-store";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";
import Box from "../box";

type Props = {
    currentPage?: number;
    keyword?: string;
};

const CategoryParentListPage = ({ currentPage = 1, keyword = "" }: Props) => {
    const router = useRouter();

    const queryClient = useQueryClient();

    const { show } = useDialogStore();

    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

    const query = useQuery({
        queryKey: ["admin-category-parent-list", currentPage, keyword],
        queryFn: () =>
            categoryParentApi.adminPaginate({
                p: currentPage,
                q: keyword,
                limit: 10,
            }),
    });

    const deleteArticleMutation = useMutation({
        mutationFn: (id: number) => categoryParentApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-category-parent-list"],
            });
        },
    });

    const deleteCategoryParentsMutation = useMutation({
        mutationFn: (ids: number[]) => categoryParentApi.deleteMultiple(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-category-parent-list"],
            });
            setCheckedIds([]);
            if (isCheckAll) {
                setIsCheckAll(false);
            }
        },
    });

    const updateCategoryParentMutation = useMutation({
        mutationFn: (article: CategoryParent) =>
            categoryParentApi.update(article),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-category-parent-list"],
            });
        },
    });

    const handleDelete = (id: number) => {
        show({
            onConfirm: () => {
                deleteArticleMutation.mutate(id);
            },
            description:
                "This action cannot be undone. This will permanently delete this article.",
        });
    };

    const handlePageChange = (newPage: number) => {
        router.push(
            `/admin/category-parent?${createSearchParams({
                ...(newPage > 1 ? { p: newPage } : {}),
                ...(keyword ? { q: keyword } : {}),
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

    const handleDeleteMutiple = () => {
        show({
            onConfirm: () => {
                deleteCategoryParentsMutation.mutate(checkedIds);
            },
            description:
                "This action cannot be undone. This will permanently delete this category parents.",
        });
    };

    const handleSearch = (keyword: string) => {
        router.push(
            `/admin/category-parent?${createSearchParams({
                ...(keyword ? { q: keyword } : {}),
                ...(currentPage > 1 ? { p: currentPage } : {}),
            })}`
        );
    };
    return (
        <div>
            <section className="col-span-12 md:col-span-5">
                <Box title="Category Parent List">
                    <DataTable
                        tableOptions={{
                            rows: query.data?.data.rows || [],
                            columns: [
                                {
                                    field: "check",
                                    text: "",
                                    className: "w-6",
                                    render: (row: CategoryParent) => (
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
                                                setIsCheckAll(
                                                    checkedState === true
                                                )
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
                                    field: "name",
                                    text: "Name",
                                },
                                {
                                    field: "is_public",
                                    text: "Public",
                                    className: "w-7",
                                    render: (row: CategoryParent) => (
                                        <CellCheck
                                            value={row.is_public}
                                            onClick={() =>
                                                updateCategoryParentMutation.mutate(
                                                    {
                                                        ...row,
                                                        is_public:
                                                            !row.is_public,
                                                    }
                                                )
                                            }
                                        />
                                    ),
                                },
                                {
                                    field: "createdAt",
                                    text: "Created At",
                                    className: "w-24 text-center",
                                    render: (row: CategoryParent) => {
                                        const [date, time] = moment(
                                            row.created_at
                                        )
                                            .format("MM/DD/YYYY hh:mm:ss")
                                            .split(" ");

                                        return (
                                            <>
                                                <p>{date}</p>
                                                <p>{time}</p>
                                            </>
                                        );
                                    },
                                },
                                {
                                    field: "actions",
                                    text: "Actions",
                                    className: "text-right",
                                    render: (row) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <BsThreeDotsVertical />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-48">
                                                <ul className="space-y-4">
                                                    <li>
                                                        <Link
                                                            href={`/admin/category-parent/${row.id}/update`}
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
                                                                handleDelete(
                                                                    row.id
                                                                )
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
                                href: "/admin/category-parent/create",
                            },
                            deleteButton: {
                                onClick: () => {
                                    handleDeleteMutiple();
                                },
                                text:
                                    query.data &&
                                    (isCheckAll
                                        ? `Delete (${query.data.data.count})`
                                        : checkedIds.length > 0
                                        ? `Delete (${checkedIds.length})`
                                        : "Delete"),
                                disabled: checkedIds.length === 0,
                            },
                            searchForm: {
                                defaultValue: keyword,
                                onSubmit: handleSearch,
                            },
                        }}
                    />
                </Box>
            </section>{" "}
        </div>
    );
};

export default CategoryParentListPage;
