"use client";

import { RiUser3Line } from "react-icons/ri";
import Box from "./box";
import { todayArticles } from "./data";
import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
    title: string;
    slug: string;
    imageUrl: string;
    author: string;
    introductionText: string;
    categoryName: string;
    categorySlug: string;
};

const ArticleCard = (props: ArticleCardProps) => {
    return (
        <div className="space-y-2">
            <div className="image relative w-full pb-[60%]">
                <Image
                    src={props.imageUrl}
                    fill
                    priority
                    className="rounded-sm"
                    alt="thumbnail"
                    sizes="(max-width: 1200px) 40vw, 100vw"
                />
            </div>
            <p className="category font-medium uppercase">
                {props.categoryName}
            </p>
            <Link
                href={props.slug}
                className="title text-lg font-bold line-clamp-2 underline-offset-4 hover:underline"
            >
                {props.title}
            </Link>
            <p className="author text-neutral-700">
                <RiUser3Line className="inline mr-1 -translate-y-0.5" />
                {props.author}
            </p>
        </div>
    );
};

type Props = {};

const SectionToday = (props: Props) => {
    return (
        <section>
            <Box title="Today">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-4 space-y-8">
                        <ArticleCard
                            title={todayArticles[0].title}
                            author={todayArticles[0].author.full_name}
                            imageUrl={todayArticles[0].image_url}
                            introductionText=""
                            slug={todayArticles[0].slug}
                            categoryName={todayArticles[0].category.name}
                            categorySlug={todayArticles[0].category.slug}
                        />
                        <ArticleCard
                            title={todayArticles[1].title}
                            author={todayArticles[1].author.full_name}
                            imageUrl={todayArticles[1].image_url}
                            introductionText=""
                            slug={todayArticles[1].slug}
                            categoryName={todayArticles[1].category.name}
                            categorySlug={todayArticles[1].category.slug}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <ArticleCard
                            title={todayArticles[2].title}
                            author={todayArticles[2].author.full_name}
                            imageUrl={todayArticles[2].image_url}
                            introductionText=""
                            slug={todayArticles[2].slug}
                            categoryName={todayArticles[2].category.name}
                            categorySlug={todayArticles[2].category.slug}
                        />
                    </div>
                </div>
            </Box>
        </section>
    );
};

export default SectionToday;
