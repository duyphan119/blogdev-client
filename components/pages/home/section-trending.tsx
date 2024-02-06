"use client";

import { ArticleCard } from "@/types/article";
import Image from "next/image";
import Link from "next/link";
import { RiUser3Line } from "react-icons/ri";
import Box from "./box";

type Props = {
    articles: ArticleCard[];
};

const SectionTrending = (props: Props) => {
    return (
        <section>
            <Box title="Trending">
                <div className="grid grid-cols-4 gap-8">
                    {props.articles.map((article, index) => {
                        return (
                            <div
                                className="space-y-2 col-span-4 sm:col-span-2 md:col-span-1"
                                key={article.id}
                            >
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
                                    {article.category_name}
                                </p>
                                <Link
                                    href={article.slug}
                                    className="title text-lg font-bold line-clamp-2 underline-offset-4 hover:underline"
                                >
                                    {article.title}
                                </Link>
                                <p className="introduction-text line-clamp-4 font-thin">
                                    {article.introduction_text}
                                </p>
                                <p className="author text-neutral-700">
                                    <RiUser3Line className="inline mr-1 -translate-y-0.5" />
                                    {article.author}
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
