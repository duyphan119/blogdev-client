"use client";

import articleApi from "@/api/article-api";
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
import { Article } from "@/types/article";
import useDialogStore from "@/zustand/use-dialog-store";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin7Line, RiEdit2Line } from "react-icons/ri";
import Box from "../box";

type Props = {
  currentPage?: number;
  keyword?: string;
  sortBy?: string;
  sortType?: string;
};

const ArticleListPage = ({
  currentPage = 1,
  keyword = "",
  sortBy,
  sortType,
}: Props) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { show } = useDialogStore();

  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

  const query = useQuery({
    queryKey: ["admin-article-list", currentPage, keyword, sortBy, sortType],
    queryFn: () =>
      articleApi.adminPaginate({
        p: currentPage,
        q: keyword,
        limit: 10,
        sort_by: sortBy,
        sort_type: sortType,
      }),
  });

  const deleteArticleMutation = useMutation({
    mutationFn: (id: number) => articleApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-article-list"],
      });
    },
  });

  const deleteArticlesMutation = useMutation({
    mutationFn: (ids: number[]) => articleApi.deleteMultiple(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-article-list"],
      });
      setCheckedIds([]);
      if (isCheckAll) {
        setIsCheckAll(false);
      }
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: (article: Article) => articleApi.update(article),
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
        "This action cannot be undone. This will permanently delete this article.",
    });
  };

  const handlePageChange = (newPage: number) => {
    router.push(
      `/admin/article?${createSearchParams({
        ...(newPage > 1 ? { p: newPage } : {}),
        ...(keyword ? { q: keyword } : {}),
        ...(sortBy ? { sort_by: sortBy } : {}),
        ...(sortType ? { sort_type: sortType } : {}),
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
        deleteArticlesMutation.mutate(checkedIds);
      },
      description:
        "This action cannot be undone. This will permanently delete this articles.",
    });
  };

  const handleSearch = (keyword: string) => {
    router.push(
      `/admin/article?${createSearchParams({
        ...(keyword ? { q: keyword } : {}),
        ...(currentPage > 1 ? { p: currentPage } : {}),
        ...(sortBy ? { sort_by: sortBy } : {}),
        ...(sortType ? { sort_type: sortType } : {}),
      })}`
    );
  };

  const handleSort = (field: string, isAsc: boolean) => {
    console.log({ field, isAsc });
    router.push(
      `/admin/article?${createSearchParams({
        ...(keyword ? { q: keyword } : {}),
        ...(currentPage > 1 ? { p: currentPage } : {}),
        ...(field ? { sort_by: field } : {}),
        ...(isAsc ? { sort_type: "asc" } : {}),
      })}`
    );
  };

  return (
    <section>
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
                sort: {
                  field: "title",
                  isAsc: sortType === "asc",
                  visible: sortBy === "title",
                  onSort: handleSort,
                },
              },
              {
                field: "category",
                text: "Category",
                render: (row: Article) => row.category?.name || "",
                sort: {
                  field: "category-name",
                  isAsc: sortType === "asc",
                  visible: sortBy === "category-name",
                  onSort: handleSort,
                },
              },
              {
                field: "approved",
                text: "Approved",
                className: "w-7",
                render: (row: Article) => (
                  <CellCheck
                    value={row.approved}
                    onClick={() =>
                      updateArticleMutation.mutate({
                        ...row,
                        approved: !row.approved,
                      })
                    }
                  />
                ),
              },
              {
                field: "is_public",
                text: "Public",
                className: "w-7",
                render: (row: Article) => (
                  <CellCheck
                    value={row.is_public}
                    onClick={() =>
                      updateArticleMutation.mutate({
                        ...row,
                        is_public: !row.is_public,
                      })
                    }
                  />
                ),
              },
              {
                field: "author",
                text: "Author",
                render: (row: Article) => row.author.full_name,
              },
              {
                field: "createdAt",
                text: "Created At",
                className: "w-24 text-center",
                render: (row) => {
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
              href: "/admin/article/create",
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

export default ArticleListPage;
