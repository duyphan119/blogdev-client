"use client";

import React, { Fragment } from "react";
import Box from "./box";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { RiUser3Line } from "react-icons/ri";
import { ArticleCard } from "@/types/article";

type Props = {
    articles: ArticleCard[];
};

const SectionLongreads = (props: Props) => {
    const [firstArticle, ...articles] = props.articles;
    if (!firstArticle) return null;
    return (
        <section>
            <Box title="Longreads">
                <div className="space-y-8">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="image relative col-span-12 md:col-span-6 pb-[60%]">
                            <Image
                                src={firstArticle.image_url}
                                fill
                                priority
                                className="rounded-sm object-cover"
                                alt="thumbnail"
                                sizes="(max-width: 1200px) 40vw, 100vw"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 flex gap-2 flex-col">
                            <Link
                                href={`/article?cat=${firstArticle.category_slug}`}
                                className="category font-medium uppercase block underline-offset-4 hover:underline"
                            >
                                {firstArticle.category_name}
                            </Link>
                            <Link
                                href={`/article/${firstArticle.slug}`}
                                className="title text-3xl font-bold line-clamp-2 underline-offset-4 hover:underline"
                            >
                                {firstArticle.title}
                            </Link>
                            <p className="author text-neutral-700">
                                <RiUser3Line className="inline mr-1 -translate-y-0.5" />
                                {firstArticle.author_full_name}
                            </p>
                            <div className="introduction-text mt-auto font-thin">
                                {firstArticle.introduction_text}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {articles.map((article, index) => {
                            return (
                                <Fragment key={article.id}>
                                    {index > 0 && (
                                        <div className="">
                                            <Separator orientation="vertical" />
                                        </div>
                                    )}
                                    <div className="flex justify-between w-full gap-4">
                                        <div className="space-y-2">
                                            <Link
                                                href={`/article/${article.slug}`}
                                                className="title text-lg font-bold line-clamp-2 underline-offset-4 hover:underline"
                                            >
                                                {article.title}
                                            </Link>
                                            <p className="author text-neutral-700">
                                                <RiUser3Line className="inline mr-1 -translate-y-0.5" />
                                                {article.author_full_name}
                                            </p>
                                        </div>
                                        <div className="image relative w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={article.image_url}
                                                fill
                                                priority
                                                className="rounded-sm object-cover"
                                                alt="thumbnail"
                                                sizes="(max-width: 1200px) 40vw, 100vw"
                                            />
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </Box>
        </section>
    );
};

export default SectionLongreads;
