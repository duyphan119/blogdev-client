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
                <div className="mx-auto md:max-w-7xl md:px-4 sm:px-0 px-8 space-y-8">
                    <div className="flex gap-4">
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
            <div className="mx-auto md:max-w-7xl md:px-4 sm:px-0 px-8 space-y-8 mt-16">
                <ul className="space-y-8">
                    {(query.data?.data.rows || articles || []).map(
                        (article) => {
                            return (
                                <li key={article.id} className="flex gap-8 ">
                                    <Link
                                        href={`/article/${article.slug}`}
                                        className="image relative w-48 h-48 flex-shrink-0 block"
                                    >
                                        <Image
                                            src={article.image_url}
                                            fill
                                            priority
                                            className="rounded-sm object-cover"
                                            alt="thumbnail"
                                            sizes="(max-width: 1200px) 40vw, 100vw"
                                        />
                                    </Link>
                                    <div className="space-y-2 flex-1">
                                        <Link
                                            href={`/article?cat=${article.category_slug}`}
                                            className="category font-light uppercase underline-offset-4 hover:underline"
                                        >
                                            {article.category_name}
                                        </Link>
                                        <Link
                                            href={`/article/${article.slug}`}
                                            className="title text-xl font-bold line-clamp-3 underline-offset-4 hover:underline"
                                        >
                                            {article.title}
                                        </Link>
                                        <time className="time text-sm font-light text-neutral-700 mt-4 block">
                                            {moment(article.created_at).format(
                                                "MMM D, YYYY H:m A"
                                            )}
                                        </time>
                                    </div>
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
