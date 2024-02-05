"use client";

import React, { Fragment } from "react";
import Box from "./box";
import { longReadsArticles } from "./data";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { RiUser3Line } from "react-icons/ri";

type Props = {};

const SectionTrending = (props: Props) => {
    const [firstArticle, ...articles] = longReadsArticles;
    return (
        <section>
            <Box title="Trending">
                <div className="flex gap-8">
                    {articles.map((article, index) => {
                        return (
                            <div className="space-y-2" key={article.id}>
                                <div className="image relative w-full pb-[60%]">
                                    <Image
                                        src={article.image_url}
                                        fill
                                        priority
                                        className="rounded-sm"
                                        alt="thumbnail"
                                        sizes="(max-width: 1200px) 40vw, 100vw"
                                    />
                                </div>
                                <p className="category font-medium uppercase">
                                    {article.category.name}
                                </p>
                                <Link
                                    href={article.slug}
                                    className="title text-lg font-bold line-clamp-2 underline-offset-4 hover:underline"
                                >
                                    {article.title}
                                </Link>
                                <p className="introduction-text line-clamp-4 font-thin">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Et ipsum libero pariatur
                                    in perspiciatis odio facilis, eos
                                    exercitationem impedit, cupiditate, ratione
                                    sapiente nulla inventore. Voluptas nostrum
                                    veniam suscipit cupiditate voluptatem!
                                </p>
                                <p className="author text-neutral-700">
                                    <RiUser3Line className="inline mr-1 -translate-y-0.5" />
                                    {article.author.full_name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Box>
        </section>
    );
};

export default SectionTrending;
