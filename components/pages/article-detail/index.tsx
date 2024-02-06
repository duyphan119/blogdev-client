"use client";

import { buttonVariants } from "@/components/ui/button";
import { Article } from "@/types/article";
import Link from "next/link";
import moment from "moment";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
    RiFacebookLine,
    RiGithubLine,
    RiLinkedinLine,
    RiPinterestLine,
    RiTwitterXLine,
    RiYoutubeLine,
} from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CommentForm from "./comment-form";

type Props = {
    article: Article;
};

const ArticleDetail = (props: Props) => {
    return (
        <div className="mx-auto md:max-w-7xl md:px-8 sm:px-0 px-8">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12">
                    <div className="article-head flex items-center gap-2">
                        <Link
                            href={`/article?author=${props.article.author.id}`}
                            className="article-author bg-black text-white underline-offset-4 hover:underline px-2 py-1"
                        >
                            {props.article.author.full_name}
                        </Link>
                        <div className="h-6">
                            <Separator orientation="vertical" />
                        </div>
                        <Link
                            href={`/article?cat=${props.article.category.slug}`}
                            className={buttonVariants({
                                variant: "link",
                                className: "article-category",
                            })}
                        >
                            {props.article.category.name}
                        </Link>
                        <div className="h-6">
                            <Separator orientation="vertical" />
                        </div>
                        <time className="article-date">
                            {moment(props.article.created_at).format(
                                "MMM D, YYYY H:m A"
                            )}
                        </time>
                    </div>
                </div>
                <div className="col-span-12">
                    <div className="grid grid-cols-12">
                        <p className="article-title col-span-12 text-3xl font-bold">
                            {props.article.title}
                        </p>
                        <p className="article-introduction col-span-12 md:col-span-8 text-lg font-medium">
                            {props.article.introduction_text}
                        </p>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-8 space-y-8">
                    <div className="article-image relative w-full pb-[60%]">
                        <Image
                            src={props.article.image_url}
                            fill
                            priority
                            className="rounded-sm"
                            alt="thumbnail"
                            sizes="(max-width: 1200px) 40vw, 100vw"
                        />
                    </div>
                    <div
                        className="article-content"
                        dangerouslySetInnerHTML={{
                            __html: props.article.content,
                        }}
                    ></div>
                    <Separator />
                    <div className="flex gap-8 ">
                        <Avatar className="image rounded-lg relative w-20 h-20 flex-shrink-0">
                            <AvatarImage src={props.article.author.image_url} />
                        </Avatar>
                        <div className="space-y-4 flex-1">
                            <div className="">
                                <Link
                                    href={`/article?author=${props.article.author.id}`}
                                    className="article-authorunderline-offset-4 underline "
                                >
                                    {props.article.author.full_name}
                                </Link>
                                &nbsp;
                                {props.article.author.introduction}
                            </div>
                            <div className="flex gap-12 items-center">
                                <div className="text-neutral-500 uppercase">
                                    {props.article.author.career}
                                </div>
                                <ul className="flex gap-4">
                                    {!props.article.author.facebook_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.article.author
                                                        .facebook_url
                                                }
                                                title="Facebook"
                                            >
                                                <RiFacebookLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.article.author.twitter_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.article.author
                                                        .twitter_url
                                                }
                                                title="Twitter"
                                            >
                                                <RiTwitterXLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.article.author.pinterest_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.article.author
                                                        .pinterest_url
                                                }
                                                title="Pinterest"
                                            >
                                                <RiPinterestLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.article.author.youtube_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.article.author
                                                        .youtube_url
                                                }
                                                title="Youtube"
                                            >
                                                <RiYoutubeLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.article.author.github_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.article.author
                                                        .github_url
                                                }
                                                title="Github"
                                            >
                                                <RiGithubLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.article.author.linkedin_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.article.author
                                                        .linkedin_url
                                                }
                                                title="Linkedin"
                                            >
                                                <RiLinkedinLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <div className="text-xl font-semibold">
                            Leave a comment
                        </div>
                        <div className="article-comment-form">
                            <CommentForm />
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <div className="text-xl font-semibold">Comments</div>
                        <div className="article-comments"></div>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-4">Ads</div>
            </div>
        </div>
    );
};

export default ArticleDetail;
