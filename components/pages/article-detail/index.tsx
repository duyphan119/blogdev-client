"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArticleComment } from "@/types/article-comment";
import { ArticleDetailData } from "@/types/article-detail-page";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
    RiFacebookLine,
    RiGithubLine,
    RiLinkedinLine,
    RiPinterestLine,
    RiTwitterXLine,
    RiYoutubeLine,
} from "react-icons/ri";
import CommentForm from "./comment-form";
import Comments from "./comments";
import SidebarArticles from "./sidebar-articles";
import articleCommentApi from "@/api/article-comment-api";

type Props = {
    data: ArticleDetailData;
};
const COMMENT_LIMIT = 5;
const ArticleDetail = (props: Props) => {
    const [articleComments, setArticleComments] = useState<ArticleComment[]>(
        props.data.comments
    );
    const [commentCount, setCommentCount] = useState<number>(
        props.data.comment_count
    );
    const [commentPage, setCommentPage] = useState<number>(1);
    const totalPages = useMemo(
        () => Math.ceil(commentCount / COMMENT_LIMIT),
        [commentCount]
    );

    const handleCreateArticleComment = (articleComment: ArticleComment) => {
        setArticleComments((state) => [articleComment, ...state]);
        setCommentCount((state) => state + 1);
    };

    const handlePageChange = (newPage: number) => {
        const fetchArticleComments = async () => {
            try {
                const response = await articleCommentApi.paginate({
                    limit: COMMENT_LIMIT * newPage,
                    p: 1,
                    article_slug: props.data.article.slug,
                });

                if (response.message === "Success") {
                    setArticleComments(response.data.rows);
                    setCommentPage(newPage);
                }
            } catch (error) {}
        };

        fetchArticleComments();
    };

    const handleDelete = (id: number) => {
        setArticleComments((state) => state.filter((item) => item.id !== id));
        setCommentCount((state) => state - 1);
    };

    return (
        <div className="mx-auto md:max-w-7xl md:px-8 sm:px-0 px-8">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12">
                    <div className="article-head flex items-center gap-2">
                        <Link
                            href={`/article?author=${props.data.article.author.id}`}
                            className="article-author bg-black text-white underline-offset-4 hover:underline px-2 py-1"
                        >
                            {props.data.article.author.full_name}
                        </Link>
                        <div className="h-6">
                            <Separator orientation="vertical" />
                        </div>
                        <Link
                            href={`/article?cat=${props.data.article.category.slug}`}
                            className={buttonVariants({
                                variant: "link",
                                className: "article-category",
                            })}
                        >
                            {props.data.article.category.name}
                        </Link>
                        <div className="h-6">
                            <Separator orientation="vertical" />
                        </div>
                        <time className="article-date">
                            {moment(props.data.article.created_at).format(
                                "MMM D, YYYY H:m A"
                            )}
                        </time>
                    </div>
                </div>
                <div className="col-span-12">
                    <div className="grid grid-cols-12">
                        <p className="article-title col-span-12 text-3xl font-bold">
                            {props.data.article.title}
                        </p>
                        <p className="article-introduction col-span-12 md:col-span-8 text-lg font-medium">
                            {props.data.article.introduction_text}
                        </p>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-8 space-y-8">
                    <div className="article-image relative w-full pb-[100%]">
                        <Image
                            src={props.data.article.image_url}
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
                            __html: props.data.article.content,
                        }}
                    ></div>
                    <Separator />
                    <div className="flex gap-8 ">
                        <Avatar className="image rounded-lg relative w-20 h-20 flex-shrink-0">
                            <AvatarImage
                                src={props.data.article.author.image_url}
                            />
                        </Avatar>
                        <div className="space-y-4 flex-1">
                            <div className="">
                                <Link
                                    href={`/article?author=${props.data.article.author.id}`}
                                    className="article-authorunderline-offset-4 underline "
                                >
                                    {props.data.article.author.full_name}
                                </Link>
                                &nbsp;
                                {props.data.article.author.introduction}
                            </div>
                            <div className="flex gap-12 items-center">
                                <div className="text-neutral-500 uppercase">
                                    {props.data.article.author.career}
                                </div>
                                <ul className="flex gap-4">
                                    {!props.data.article.author
                                        .facebook_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.data.article.author
                                                        .facebook_url
                                                }
                                                title="Facebook"
                                            >
                                                <RiFacebookLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.data.article.author.twitter_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.data.article.author
                                                        .twitter_url
                                                }
                                                title="Twitter"
                                            >
                                                <RiTwitterXLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.data.article.author
                                        .pinterest_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.data.article.author
                                                        .pinterest_url
                                                }
                                                title="Pinterest"
                                            >
                                                <RiPinterestLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.data.article.author.youtube_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.data.article.author
                                                        .youtube_url
                                                }
                                                title="Youtube"
                                            >
                                                <RiYoutubeLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.data.article.author.github_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.data.article.author
                                                        .github_url
                                                }
                                                title="Github"
                                            >
                                                <RiGithubLine className="text-2xl -translate-y-0.5" />
                                            </Link>
                                        </li>
                                    )}
                                    {!props.data.article.author
                                        .linkedin_url && (
                                        <li className="">
                                            <Link
                                                href={
                                                    props.data.article.author
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
                    <Comments
                        articleComments={articleComments}
                        commentCount={commentCount}
                        totalPages={totalPages}
                        currentPage={commentPage}
                        onPageChange={handlePageChange}
                        onDelete={handleDelete}
                    />
                    <Separator />
                    <CommentForm
                        articleId={props.data.article.id}
                        onCreate={handleCreateArticleComment}
                    />
                </div>
                <div className="col-span-12 md:col-span-4 space-y-12">
                    <SidebarArticles
                        title="Most Recent"
                        articles={props.data.most_recent_articles}
                    />
                    <SidebarArticles
                        title="Most Views"
                        articles={props.data.most_views_articles}
                    />
                    <SidebarArticles
                        title="Most Comments"
                        articles={props.data.most_comments_articles}
                    />
                    <SidebarArticles
                        title="Trending"
                        articles={props.data.trending_articles}
                    />
                </div>
                <div className="col-span-12">
                    <div className="uppercase text-center border-t border-t-border border-b border-b-border py-4 font-light">
                        You Might Also Like
                    </div>
                    <div className="mt-8">
                        <ul className="grid grid-cols-12 gap-8">
                            {props.data.recommend_articles.map((article) => {
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
                                                className="rounded-sm"
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
            </div>
        </div>
    );
};

export default ArticleDetail;
