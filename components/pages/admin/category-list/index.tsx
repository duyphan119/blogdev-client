"use client";

import categoryApi from "@/api/category-api";
import DataTable from "@/components/common/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createSearchParams } from "@/lib/utils";
import { Category } from "@/types/category";
import useDialogStore from "@/zustand/use-dialog-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";
import Box from "../box";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type Props = {
  currentPage?: number;
  keyword?: string;
  limit?: number;
};

const CategoryListPage = ({
  currentPage = 1,
  keyword = "",
  limit = 10,
}: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { show } = useDialogStore();

  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

  const query = useQuery({
    queryKey: ["admin-category-list", keyword, currentPage],
    queryFn: () =>
      categoryApi.adminPaginate({
        p: currentPage,
        q: keyword,
        limit,
      }),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => categoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-category-list"],
      });
    },
  });

  const deleteCategoriesMutation = useMutation({
    mutationFn: (ids: number[]) => categoryApi.deleteMultiple(ids),
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
        deleteCategoriesMutation.mutate(checkedIds);
      },
      description:
        "This action cannot be undone. This will permanently delete this categories.",
    });
  };

  const handleSearch = (keyword: string) => {
    router.push(
      `/admin/category?${createSearchParams({
        ...(keyword ? { q: keyword } : {}),
        ...(currentPage > 1 ? { p: currentPage } : {}),
      })}`
    );
  };

  return (
    <section className="">
      <Box title="Category List">
        <DataTable
          tableOptions={{
            rows: query.data?.data.rows || [],
            columns: [
              {
                field: "check",
                text: "",
                className: "w-6",
                render: (row: Category) => (
                  <Checkbox
                    id={`row-${row.id}`}
                    checked={isCheckAll || checkedIds.includes(row.id)}
                    onCheckedChange={(checkedState) =>
                      handleCheckedChange(checkedState, row.id)
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
                field: "name",
                text: "Name",
              },
              {
                field: "parent",
                text: "Parent",
                render: (row: Category) => row.parent?.name,
              },
              {
                field: "createdAt",
                text: "Created At",
                className: "w-48 text-center",
                render: (row: Category) => {
                  const [date, time] = moment(row.created_at)
                    .format("MM/DD/YYYY hh:mm:ss")
                    .split(" ");

                  return (
                    <div className="flex gap-1 flex-col md:flex-row">
                      <p>{date}</p>
                      <p>{time}</p>
                    </div>
                  );
                },
              },
              {
                field: "actions",
                text: "Actions",
                className: "text-right",
                render: (row: Category) => (
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
                            className={buttonVariants({
                              variant: "ghost",
                              className: "w-full !justify-start flex gap-2",
                            })}
                          >
                            <RiEdit2Line /> Edit
                          </Link>
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
    </section>
  );
};

export default CategoryListPage;
