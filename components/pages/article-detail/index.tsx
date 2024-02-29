"use client";

import ArticleListWrapper from "@/components/article/article-list-wrapper";
import MarkdownPreview from "@/components/markdown/markdown-preview";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SocialMediaList from "@/components/user/social-media-list";
import { Article } from "@/types/article";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import CommentForm from "./comment-form";
import Comments from "./comments";
import RecommendArticleList from "./recommend-article-list";
import { badgeVariants } from "@/components/ui/badge";

type Props = {
    article: Article;
};
const COMMENT_LIMIT = 5;
const ArticleDetail = (props: Props) => {
    return (
        <div className="container space-y-8">
            <div className="article-head flex justify-between items-center gap-2 md:flex-nowrap flex-wrap">
                <Link
                    href={`/article?author=${props.article.author.id}`}
                    className="article-author bg-black text-white underline-offset-4 hover:underline px-2 py-1 sm:inline block"
                >
                    {props.article.author.full_name}
                </Link>
                <div className="h-6 md:block hidden">
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
                <div className="h-6 md:block hidden">
                    <Separator orientation="vertical" />
                </div>
                <time className="article-date flex-1 sm:text-left text-center">
                    {moment(props.article.created_at).format(
                        "MMM D, YYYY H:m A"
                    )}
                </time>
            </div>
            <div className="grid grid-cols-12">
                <p className="article-title col-span-12 text-3xl font-bold">
                    {props.article.title}
                </p>
                <p className="article-introduction col-span-12 md:col-span-8 text-lg font-medium">
                    {props.article.introduction_text}
                </p>
            </div>
            <ArticleListWrapper articleSlug={props.article.slug}>
                <div className="space-y-8">
                    <div className="article-image relative w-full pb-[60%]">
                        <Image
                            src={props.article.image_url}
                            fill
                            priority
                            className="rounded-sm object-contain"
                            alt="thumbnail"
                            sizes="(max-width: 1200px) 40vw, 100vw"
                        />
                    </div>
                    <MarkdownPreview content={props.article.content} />
                    <Separator />
                    <div className="flex gap-8 ">
                        <Avatar className="image rounded-lg relative w-20 h-20 flex-shrink-0">
                            <AvatarImage src={props.article.author.image_url} />
                        </Avatar>
                        <div className="flex-1">
                            <Link
                                href={`/article?author=${props.article.author.id}`}
                                className="article-author hover:underline-offset-4 hover:underline block text-xl font-bold"
                            >
                                {props.article.author.full_name}
                            </Link>
                            <div className="my-2">
                                {props.article.author.introduction}
                            </div>
                            <div className="flex md:gap-12 gap-2 md:flex-row flex-col md:items-center">
                                <div className="text-neutral-500 uppercase">
                                    {props.article.author.career}
                                </div>
                                <SocialMediaList
                                    author={props.article.author}
                                />
                            </div>
                        </div>
                    </div>

                    {props.article.tags.length > 0 && (
                        <>
                            <Separator />
                            <div className="flex gap-4 items-center">
                                Tags:
                                <ul className="flex gap-4">
                                    {props.article.tags.map((tag) => {
                                        return (
                                            <Link
                                                href={`/article?tag=${tag.slug}`}
                                                className={badgeVariants({
                                                    variant: "secondary",
                                                })}
                                            >
                                                {tag.name}
                                            </Link>
                                        );
                                    })}
                                </ul>
                            </div>
                        </>
                    )}

                    <Separator />
                    <Comments articleSlug={props.article.slug} />
                    <Separator />
                    <CommentForm articleId={props.article.id} />
                </div>
            </ArticleListWrapper>
            <RecommendArticleList articleSlug={props.article.slug} />
        </div>
    );
};

export default ArticleDetail;
