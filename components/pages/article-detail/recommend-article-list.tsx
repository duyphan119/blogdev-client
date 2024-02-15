"use client";

import articleApi from "@/api/article-api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

type Props = {
    articleSlug: string;
};

const RecommendArticleList = (props: Props) => {
    const query = useQuery({
        queryKey: ["recommend-article-list", props.articleSlug],
        queryFn: () => articleApi.getRecommendList(props.articleSlug),
        refetchOnMount: false,
    });

    if (!query.isSuccess) return null;
    return (
        <div className="">
            <div className="uppercase text-center border-t border-t-border border-b border-b-border py-4 font-light">
                You Might Also Like
            </div>
            <div className="mt-8">
                <ul className="grid grid-cols-12 gap-8">
                    {query.data.data.rows.map((article) => {
                        return (
                            <li
                                key={article.id}
                                className="col-span-12 sm:col-span-6 md:col-span-3 space-y-2"
                            >
                                <div className="article-image relative w-full pb-[60%]">
                                    <Image
                                        src={article.image_url}
                                        fill
                                        priority
                                        className="rounded-sm object-cover"
                                        alt="thumbnail"
                                        sizes="(max-width: 1200px) 40vw, 100vw"
                                    />
                                </div>
                                <Link
                                    href={`/article/${article.slug}`}
                                    className="title text-lg font-bold line-clamp-2 underline-offset-4 hover:underline"
                                >
                                    {article.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default RecommendArticleList;
