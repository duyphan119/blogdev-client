"use client";

import { ArticleCard } from "@/types/article";
import React from "react";
import Box from "../pages/home/box";
import Image from "next/image";
import Link from "next/link";

type Props = {
    articles: ArticleCard[];
    title: string;
};

const SidebarArticles = (props: Props) => {
    return (
        <section>
            <Box title={props.title}>
                <ul className="space-y-4">
                    {props.articles.map((article) => {
                        return (
                            <div key={article.id} className="flex gap-4">
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
                                <div className="space-y-2 flex-1">
                                    <Link
                                        href={`/article/${article.slug}`}
                                        className="title text-lg font-bold line-clamp-2 underline-offset-4 hover:underline"
                                    >
                                        {article.title}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </ul>
            </Box>
        </section>
    );
};

export default SidebarArticles;
