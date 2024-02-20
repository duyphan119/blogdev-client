"use client";

import articleApi from "@/api/article-api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SocialMediaList from "@/components/user/social-media-list";
import { ArticleCard } from "@/types/article";
import { Author } from "@/types/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ArticleCardInfo from "../my-articles/article-card-info";

type Props = {
    articles?: ArticleCard[];
    totalPages?: number;
    author: Author;
    limit?: number;
};

const AuthorArticles = ({
    author,
    limit = 0,
    totalPages = 0,
    articles = [],
}: Props) => {
    const [queryIsEnabled, setQueryIsEnabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const query = useQuery({
        queryKey: ["author-articles", author, queryIsEnabled, currentPage],
        queryFn: () =>
            articleApi.getByAuthorId(author.id, {
                p: 1,
                limit: limit * currentPage,
            }),
        enabled: queryIsEnabled,
        placeholderData: keepPreviousData,
    });

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setQueryIsEnabled(true);
    };

    return (
        <>
            <div className="bg-black py-16">
                <div className="container space-y-8">
                    <div className="flex md:flex-row flex-col gap-4">
                        <Avatar className="border border-neutral-700 rounded-sm w-56 h-56">
                            <AvatarImage src={author.image_url} />
                        </Avatar>
                        <div className="flex-1 text-white">
                            <h2 className="text-4xl font-bold">
                                {author.full_name}
                            </h2>
                            <h6 className="text-sm mt-1 text-blue-500 uppercase">
                                {author.career}
                            </h6>
                            <div className="my-5">{author.introduction}</div>
                            <SocialMediaList author={author} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container space-y-8 mt-16">
                <ul className="space-y-8">
                    {(query.data?.data.rows || articles || []).map(
                        (article) => {
                            return (
                                <li key={article.id}>
                                    <ArticleCardInfo
                                        title={article.title}
                                        imageUrl={article.image_url}
                                        categoryName={article.category_name}
                                        categorySlug={article.category_slug}
                                        authorFullName={
                                            article.author_full_name
                                        }
                                        authorId={article.author_id}
                                        createdAt={article.created_at}
                                        slug={article.slug}
                                        imageAlign="left-responsive-to-top"
                                        imageClassName="md:w-60 md:h-40 sm:w-48 sm:h-32 w-full pb-[60%] sm:pb-0"
                                    />
                                </li>
                            );
                        }
                    )}
                </ul>
                {totalPages > 0 && (
                    <div className="text-center">
                        {currentPage < totalPages ? (
                            <Button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                className="uppercase"
                            >
                                View more
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handlePageChange(1)}
                                className="uppercase"
                            >
                                Collapse
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default AuthorArticles;
