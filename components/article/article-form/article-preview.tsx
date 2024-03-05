"use client";

import MarkdownPreview from "@/components/markdown/markdown-preview";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

type Props = {
    author?: {
        id: number;
        fullName: string;
    };
    category?: {
        name: string;
        slug: string;
    };
    content: string;
    imageUrl: string;
    introductionText: string;
    createdAt: string;
    title: string;
};

const ArticlePreview = ({
    content,
    createdAt,
    imageUrl,
    introductionText,
    author,
    category,
    title,
}: Props) => {
    return (
        <>
            <div className="article-head flex justify-between items-center gap-2 md:flex-nowrap flex-wrap">
                {author && (
                    <Link
                        href={`/article?author=${author.id}`}
                        className="article-author bg-black text-white underline-offset-4 hover:underline px-2 py-1 sm:inline block"
                    >
                        {author.fullName}
                    </Link>
                )}

                <div className="h-6 md:block hidden">
                    <Separator orientation="vertical" />
                </div>
                {category && (
                    <Link
                        href={`/article?cat=${category.slug}`}
                        className={buttonVariants({
                            variant: "link",
                            className: "article-category",
                        })}
                    >
                        {category.name}
                    </Link>
                )}
                <div className="h-6 md:block hidden">
                    <Separator orientation="vertical" />
                </div>
                <time className="article-date flex-1 sm:text-left text-center">
                    {createdAt}
                </time>
            </div>
            <div className="grid grid-cols-12">
                <p className="article-title col-span-12 text-3xl font-bold">
                    {title}
                </p>
                <p className="article-introduction col-span-12 md:col-span-8 text-lg font-medium">
                    {introductionText}
                </p>
            </div>
            {imageUrl && (
                <div className="article-image relative w-full pb-[60%]">
                    <Image
                        src={imageUrl}
                        fill
                        priority
                        className="rounded-sm object-contain"
                        alt="thumbnail"
                        sizes="(max-width: 1200px) 40vw, 100vw"
                    />
                </div>
            )}
            <MarkdownPreview content={content} />
        </>
    );
};

export default ArticlePreview;
