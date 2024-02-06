"use client";

import React from "react";
import Box from "./box";
import Image from "next/image";
import Link from "next/link";
import { RiUser3Line } from "react-icons/ri";
import { ArticleCard } from "@/types/article";

type Props = {
    articles: ArticleCard[];
};

const SectionMostRecent = (props: Props) => {
    return (
        <section>
            <Box title="Most Recent">
                <ul className="space-y-4">
                    {props.articles.map((article) => {
                        return (
                            <div key={article.id} className="flex gap-8 ">
                                <div className="space-y-2 flex-1">
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
                        );
                    })}
                </ul>
            </Box>
        </section>
    );
};

export default SectionMostRecent;
