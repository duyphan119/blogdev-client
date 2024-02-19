"use client";

import { Separator } from "@/components/ui/separator";
import { ArticleCategory } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
    categories: ArticleCategory[];
};

const SectionCategoryArticles = (props: Props) => {
    return (
        <section>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-9">
                    <div className="grid grid-cols-12 gap-8">
                        {props.categories.map((category) => {
                            return (
                                <div
                                    key={category.id}
                                    className="col-span-12 sm:col-span-6 md:col-span-4"
                                >
                                    <div className="">
                                        <Link
                                            href={`/article?cat=${category.slug}`}
                                            className="bg-black text-white uppercase px-2 py-1 hover:underline underline-offset-4"
                                        >
                                            {category.name}
                                        </Link>
                                    </div>
                                    <Link
                                        href={`/article/${category.articles[0].slug}`}
                                        className="image relative col-span-12 md:col-span-6 pb-[60%] block"
                                    >
                                        <Image
                                            src={category.articles[0].image_url}
                                            fill
                                            priority
                                            className="rounded-sm object-cover"
                                            alt="thumbnail"
                                            sizes="(max-width: 1200px) 40vw, 100vw"
                                        />
                                    </Link>
                                    <ul className="space-y-4 mt-4">
                                        {category.articles.map(
                                            (article, index) => {
                                                return (
                                                    <Fragment key={article.id}>
                                                        {index > 0 && (
                                                            <li className="">
                                                                <Separator />
                                                            </li>
                                                        )}
                                                        <li>
                                                            <Link
                                                                href={`/article/${article.slug}`}
                                                                className="hover:underline underline-offset-4 line-clamp-2 text-lg font-bold"
                                                            >
                                                                {article.title}
                                                            </Link>
                                                        </li>
                                                    </Fragment>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3">ads</div>
            </div>
        </section>
    );
};

export default SectionCategoryArticles;
