"use client";

import articleApi from "@/api/article-api";
import Box from "@/components/layouts/profile-layout/box";
import { buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import TableArticles from "./table-articles";
import Pagination from "./pagination";
import { useRouter } from "next/navigation";
import ArticleSearch from "./article-search";
import { createSearchParams } from "@/lib/utils";

type Props = {
    currentPage: number;
    keyword: string;
};

const MyArticles = (props: Props) => {
    const router = useRouter();

    const query = useQuery({
        queryKey: ["my-articles", props.currentPage, props.keyword],
        queryFn: () =>
            articleApi.getMyPosts({
                limit: 5,
                p: props.currentPage,
                q: props.keyword,
            }),
    });

    const rows = query.data?.data.rows || [];
    const totalPages = query.data?.data.total_pages || 0;

    const handlePageChange = (newPage: number) => {
        router.push(
            `/profile/article?${createSearchParams({
                p: newPage,
                q: props.keyword,
            })}`
        );
    };

    const handleSearch = (keyword: string) => {
        router.push(
            `/profile/article?${createSearchParams({
                p: 1,
                q: keyword,
            })}`
        );
    };

    return (
        <Box title="Posts" contentClassName="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <ArticleSearch
                    keyword={props.keyword}
                    onSearch={handleSearch}
                />
                <Link
                    href="/profile/article/create"
                    className={buttonVariants({
                        className: "flex items-center gap-1",
                    })}
                >
                    <RiAddLine className="text-lg" /> Create
                </Link>
            </div>
            <TableArticles rows={rows} />
            <Pagination
                totalPages={totalPages}
                currentPage={props.currentPage}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default MyArticles;
