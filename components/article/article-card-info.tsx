"use client";

import { cn } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

import { RiUser3Line } from "react-icons/ri";

type Props = {
    imageUrl?: string;
    categoryName?: string;
    categorySlug?: string;
    title: string;
    slug: string;
    authorFullName?: string;
    authorId?: number;
    createdAt?: string;
    imageAlign?: "left" | "right" | "top" | "bottom" | "left-responsive-to-top";
    imageClassName?: string;
    introductionText?: string;
    className?: string;
};

const ArticleCardInfo = (props: Props) => {
    const ImageLink = ({ className = "block" }: { className?: string }) =>
        props.imageUrl && (
            <Link
                href={`/article/${props.slug}`}
                className={cn(
                    "image relative flex-shrink-0",
                    (props.imageAlign === "top" ||
                        props.imageAlign === "bottom") &&
                        "w-full pb-[60%]",
                    (props.imageAlign === "left" ||
                        props.imageAlign === "right") &&
                        "w-20 h-20",
                    props.imageClassName,
                    className
                )}
            >
                <Image
                    src={props.imageUrl}
                    fill
                    priority
                    className="rounded-sm object-cover"
                    alt="thumbnail"
                    sizes="(max-width: 1200px) 400px,  (max-width: 900px) 300px, 200px"
                />
            </Link>
        );

    const CategoryName = () =>
        props.categoryName && (
            <Link
                href={`/article?cat=${props.categorySlug}`}
                className="category font-light uppercase underline-offset-4 hover:underline block"
            >
                {props.categoryName}
            </Link>
        );

    const ArticleTitle = () => (
        <Link
            href={`/article/${props.slug}`}
            className="title text-xl font-bold line-clamp-3 underline-offset-4 hover:underline"
        >
            {props.title}
        </Link>
    );

    const ArticleAuthor = () =>
        props.authorFullName && (
            <Link
                href={`/article/author/${props.authorId}`}
                className="author block text-neutral-700 dark:text-neutral-400"
            >
                <RiUser3Line className="inline mr-1 -translate-y-0.5" />
                {props.authorFullName}
            </Link>
        );

    const Time = () =>
        props.createdAt && (
            <time className="time text-sm font-light text-neutral-700 mt-4 block">
                {moment(props.createdAt).format("MMM D, YYYY H:m A")}
            </time>
        );

    const IntroductionText = () =>
        props.introductionText && (
            <div
                className={cn(
                    "introduction-text font-thin line-clamp-4",
                    !props.imageAlign ||
                        !["left", "right", "bottom", "top"].includes(
                            props.imageAlign
                        )
                        ? "mt-auto "
                        : ""
                )}
            >
                {props.introductionText}
            </div>
        );
    if (props.imageAlign === "top")
        return (
            <div className={cn("space-y-2", props.className)}>
                <ImageLink />
                <CategoryName />
                <ArticleTitle />
                <IntroductionText />
                <ArticleAuthor />
                <Time />
            </div>
        );
    if (props.imageAlign === "right")
        return (
            <div className={cn("flex gap-2 w-full", props.className)}>
                <div className="space-y-2 flex-1">
                    <CategoryName />
                    <ArticleTitle />
                    <IntroductionText />
                    <ArticleAuthor />
                    <Time />
                </div>
                <ImageLink />
            </div>
        );
    else if (
        props.imageAlign === "left" ||
        props.imageAlign === "left-responsive-to-top"
    )
        return (
            <div
                className={cn(
                    "flex gap-2 w-full",
                    props.imageAlign === "left-responsive-to-top" &&
                        "sm:flex-row flex-col",
                    props.className
                )}
            >
                <ImageLink />
                <div className="space-y-2 flex-1">
                    <CategoryName />
                    <ArticleTitle />
                    <IntroductionText />
                    <ArticleAuthor />
                    <Time />
                </div>
            </div>
        );
    else
        return (
            <div className={cn("grid grid-cols-12 gap-8", props.className)}>
                <ImageLink className="image relative col-span-12 md:col-span-6 pb-[60%] block" />
                <div className="col-span-12 md:col-span-6 flex gap-2 flex-col">
                    <CategoryName />
                    <ArticleTitle />
                    <ArticleAuthor />
                    <IntroductionText />
                </div>
            </div>
        );
};

export default ArticleCardInfo;
