"use client";

import React, { Fragment } from "react";
import Box from "./box";
import { longReadsArticles } from "./data";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { RiUser3Line } from "react-icons/ri";

type Props = {};

const SectionMostViews = (props: Props) => {
    const [firstArticle, ...articles] = longReadsArticles;
    return (
        <section>
            <Box title="Most views">
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
                            <p className="category font-medium uppercase">
                                {firstArticle.category.name}
                            </p>
                            <Link
                                href={firstArticle.slug}
                                className="title text-3xl font-bold line-clamp-2 underline-offset-4 hover:underline"
                            >
                                {firstArticle.title}
                            </Link>
                            <p className="author text-neutral-700">
                                <RiUser3Line className="inline mr-1 -translate-y-0.5" />
                                {firstArticle.author.full_name}
                            </p>
                            <div className="introduction-text mt-auto font-thin">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Fugiat non est ad et
                                doloremque blanditiis culpa optio harum odit
                                porro iste libero hic itaque possimus, quia
                                deleniti debitis necessitatibus ab reprehenderit
                                eligendi iusto totam. Tempore fuga a debitis
                                magni unde.
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
                                    <div className="flex gap-4">
                                        <div className="space-y-2">
                                            <Link
                                                href={article.slug}
                                                className="title text-lg font-bold line-clamp-2 underline-offset-4 hover:underline"
                                            >
                                                {article.title}
                                            </Link>
                                            <p className="author text-neutral-700">
                                                <RiUser3Line className="inline mr-1 -translate-y-0.5" />
                                                {article.author.full_name}
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

export default SectionMostViews;
