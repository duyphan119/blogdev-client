"use client";

import DataTable from "@/components/common/data-table";
import Box from "../box";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import categoryApi from "@/api/category-api";
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
import { Category } from "@/types/category";
import { useEffect, useState } from "react";
import { CategoryParent } from "@/types/category-parent";
import categoryParentApi from "@/api/category-parent-api";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import CellCheck from "@/components/common/data-table/cell-check";

type Props = {
    currentPage?: number;
};

const CategoryListPage = ({ currentPage = 1 }: Props) => {
    const router = useRouter();

    const queryClient = useQueryClient();

    const { show } = useDialogStore();

    const [categoryParent, setCategoryParent] = useState<
        CategoryParent | undefined
    >(undefined);

    const categoryQuery = useQuery({
        queryKey: ["admin-category-list"],
        queryFn: () =>
            categoryApi.adminPaginate({
                // parent: "" + categoryParent?.slug,
            }),
        // enabled: !!categoryParent,
    });

    const categoryParentQuery = useQuery({
        queryKey: ["admin-category-parent-list"],
        queryFn: () => categoryParentApi.adminPaginate(),
    });

    const deleteCategoryMutation = useMutation({
        mutationFn: (id: number) => categoryApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["admin-category-list"],
            });
        },
    });

    const handleDelete = (id: number) => {
        show({
            onConfirm: () => {
                deleteCategoryMutation.mutate(id);
            },
            description:
                "This action cannot be undone. This will permanently delete your category.",
        });
    };

    const handlePageChange = (newPage: number) => {
        router.push(
            `/admin/category?${createSearchParams({
                ...(newPage > 1 ? { p: newPage } : {}),
            })}`
        );
    };

    useEffect(() => {
        if (categoryParentQuery.isSuccess) {
            setCategoryParent(categoryParentQuery.data.data.rows[0]);
        }
    }, [categoryParentQuery]);

    return (
        <div className="">
            {/* <section className="col-span-12 md:col-span-5">
                <Box title="Category Parent List">
                    <DataTable
                        tableOptions={{
                            rows: categoryParentQuery.data?.data.rows || [],
                            columns: [
                                {
                                    field: "check",
                                    text: "",
                                    className: "w-6",
                                    render: (row: CategoryParent) => (
                                        <Checkbox
                                            id={`row-${row.id}`}
                                            // checked={
                                            //     isCheckAll ||
                                            //     checkedIds.includes(row.id)
                                            // }
                                            // onCheckedChange={(checkedState) =>
                                            //     handleCheckedChange(
                                            //         checkedState,
                                            //         row.id
                                            //     )
                                            // }
                                        />
                                    ),
                                    renderColumn: () => (
                                        <Checkbox
                                            id="checkAll"
                                            // checked={isCheckAll}
                                            // onCheckedChange={(checkedState) =>
                                            //     setIsCheckAll(checkedState === true)
                                            // }
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
                                            // onClick={() =>
                                            //     updateArticleMutation.mutate({
                                            //         ...row,
                                            //         is_public: !row.is_public,
                                            //     })
                                            // }
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
                            totalPages:
                                categoryParentQuery.data?.data.total_pages || 0,
                            onPageChange: handlePageChange,
                        }}
                        // headOptions={{
                        //     createButtonLink: {
                        //         href: "/admin/article/create",
                        //     },
                        //     deleteButton: {
                        //         onClick: () => {
                        //             handleDeleteMutiple();
                        //         },
                        //         text:
                        //             query.data &&
                        //             (isCheckAll
                        //                 ? `Delete (${categoryParentQuery.data.data.count})`
                        //                 : checkedIds.length > 0
                        //                 ? `Delete (${checkedIds.length})`
                        //                 : "Delete"),
                        //         disabled: checkedIds.length === 0,
                        //     },
                        //     searchForm: {
                        //         defaultValue: keyword,
                        //         onSubmit: handleSearch,
                        //     },
                        // }}
                    />
                </Box>
            </section> */}
            {/* <section className="col-span-12 md:col-span-7"> */}
            <Box title="Category List">
                <DataTable
                    tableOptions={{
                        rows: categoryQuery.data?.data.rows || [],
                        columns: [
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
                                field: "createdAt",
                                text: "Created At",
                                className: "w-48 text-center",
                                render: (row) => {
                                    const [date, time] = moment(row.created_at)
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
                                            <Button size="icon" variant="ghost">
                                                <BsThreeDotsVertical />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-48">
                                            <ul className="space-y-4">
                                                <li>
                                                    <Link
                                                        href={`/profile/article/${row.id}/update`}
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
                        totalPages: categoryQuery.data?.data.total_pages || 0,
                        onPageChange: handlePageChange,
                    }}
                />
            </Box>
            {/* </section> */}
        </div>
    );
};

export default CategoryListPage;
