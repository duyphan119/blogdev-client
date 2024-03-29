"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
    title: string;
    slug: string;
    imageUrl: string;
    author: string;
    introductionText: string;
    categoryName: string;
    categorySlug: string;
};

const ArticleCard = (props: Props) => {
    return (
        <div className="space-y-2">
            <div className="image relative w-full pb-[60%]">
                <Image
                    src={props.imageUrl}
                    fill
                    priority
                    className="rounded-sm object-cover"
                    alt="thumbnail"
                    sizes="(max-width: 1200px) 40vw, 100vw"
                />
            </div>
            <p className="category font-medium uppercase block">
                {props.categoryName}
            </p>
            <Link
                href={props.slug}
                className="title text-lg font-bold line-clamp-2 underline-offset-4 hover:underline"
            >
                {props.title}
            </Link>
            <p className="author block text-neutral-700">{props.author}</p>
        </div>
    );
};

export default ArticleCard;
