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

type Props = {
    currentPage?: number;
};

const CategoryListPage = ({ currentPage = 1 }: Props) => {
    const router = useRouter();

    const queryClient = useQueryClient();

    const { show } = useDialogStore();

    const query = useQuery({
        queryKey: ["admin-category-list"],
        queryFn: () => categoryApi.paginate(),
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

    return (
        <div>
            <Box title="Category List">
                <DataTable
                    tableOptions={{
                        rows: query.data?.data.rows || [],
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
                                field: "parent",
                                text: "Parent",
                                render: (row: Category) =>
                                    row.parent?.name || "",
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
                        totalPages: query.data?.data.total_pages || 0,
                        onPageChange: handlePageChange,
                    }}
                />
            </Box>
        </div>
    );
};

export default CategoryListPage;
