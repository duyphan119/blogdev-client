"use client";

import { ArticleCard } from "@/types/article";
import Image from "next/image";
import Link from "next/link";
import { RiUser3Line } from "react-icons/ri";
import Box from "./box";
import { todayArticles } from "./data";

type ArticleCardProps = {
    title: string;
    slug: string;
    imageUrl: string;
    author: string;
    introductionText: string;
    categoryName: string;
    categorySlug: string;
};

const Card = (props: ArticleCardProps) => {
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
                href={`/article/${props.slug}`}
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

type Props = {
    articles: ArticleCard[];
};

const SectionToday = (props: Props) => {
    console.log(props.articles);
    return (
        <section>
            <Box title="Today">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-4 space-y-8">
                        <Card
                            title={props.articles[0].title}
                            author={props.articles[0].author_full_name}
                            imageUrl={props.articles[0].image_url}
                            introductionText=""
                            slug={props.articles[0].slug}
                            categoryName={props.articles[0].category_name}
                            categorySlug={props.articles[0].category_slug}
                        />
                        <Card
                            title={props.articles[1].title}
                            author={props.articles[1].author_full_name}
                            imageUrl={props.articles[1].image_url}
                            introductionText=""
                            slug={props.articles[1].slug}
                            categoryName={props.articles[1].category_name}
                            categorySlug={props.articles[1].category_slug}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-8">
                        <Card
                            title={props.articles[2].title}
                            author={props.articles[2].author_full_name}
                            imageUrl={props.articles[2].image_url}
                            introductionText=""
                            slug={props.articles[2].slug}
                            categoryName={props.articles[2].category_name}
                            categorySlug={props.articles[2].category_slug}
                        />
                    </div>
                </div>
            </Box>
        </section>
    );
};

export default SectionToday;
