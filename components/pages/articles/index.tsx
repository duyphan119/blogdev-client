"use client";

import articleApi from "@/api/article-api";
import ArticleCardInfo from "@/components/article/article-card-info";
import ArticleListWrapper from "@/components/article/article-list-wrapper";
import { Button } from "@/components/ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { RiFilter2Line } from "react-icons/ri";
import Categories from "./categories";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    categorySlug?: string;
    limit: number;
};

const Articles = (props: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState("createdAt-desc");

    const query = useQuery({
        queryKey: ["articles", props.categorySlug, currentPage, sort],
        queryFn: () => {
            const [sortBy, sortType] = sort.split("-");
            return articleApi.paginate({
                p: 1,
                limit: props.limit * currentPage,
                sort_by: sortBy,
                sort_type: sortType,
                ...(props.categorySlug ? { cat: props.categorySlug } : {}),
            });
        },
        placeholderData: keepPreviousData,
    });

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container">
            <ArticleListWrapper>
                <Categories categorySlug={props.categorySlug} />
                <div className="flex items-center justify-between gap-2">
                    <div className="">
                        {query.data?.data.count || 0} articles
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="sm:block hidden">Sort by</div>
                        <Select
                            value={sort}
                            onValueChange={(value) => setSort(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Default" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="createdAt-desc">
                                    Latest
                                </SelectItem>
                                <SelectItem value="createdAt-asc">
                                    Oldest
                                </SelectItem>
                                <SelectItem value="title-desc">
                                    Title Z-A
                                </SelectItem>
                                <SelectItem value="title-asc">
                                    Title A-Z
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-8">
                    <ul className="space-y-8">
                        {query.data?.data.rows.map((article) => {
                            return (
                                <li key={article.id}>
                                    <ArticleCardInfo
                                        title={article.title}
                                        imageUrl={article.image_url}
                                        categoryName={article.category.name}
                                        categorySlug={article.category.slug}
                                        authorFullName={
                                            article.author.full_name
                                        }
                                        authorId={article.author.id}
                                        createdAt={article.created_at}
                                        slug={article.slug}
                                        imageAlign="left-responsive-to-top"
                                        imageClassName="md:w-60 md:h-40 sm:w-48 sm:h-32 w-full pb-[60%] sm:pb-0"
                                        className="gap-4"
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    {query.data &&
                        (query.data.data.total_pages > 1 ||
                            query.data.data.rows.length > props.limit) && (
                            <div className="text-center">
                                {currentPage < query.data.data.total_pages ? (
                                    <Button
                                        disabled={query.isPending}
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        className="uppercase"
                                    >
                                        View more
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={query.isPending}
                                        onClick={() => handlePageChange(1)}
                                        className="uppercase"
                                    >
                                        Collapse
                                    </Button>
                                )}
                            </div>
                        )}
                </div>
            </ArticleListWrapper>
        </div>
    );
};

export default Articles;
