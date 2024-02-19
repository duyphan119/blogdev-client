"use client";

import { Separator } from "@/components/ui/separator";
import { ArticleCard } from "@/types/article";
import { Fragment } from "react";
import ArticleCardInfo from "../my-articles/article-card-info";
import Box from "./box";

type Props = {
    articles: ArticleCard[];
};

const SectionMostComments = (props: Props) => {
    const [firstArticle, ...articles] = props.articles;
    if (!firstArticle) return null;
    return (
        <section>
            <Box title="Most comments">
                <div className="space-y-8">
                    <ArticleCardInfo
                        categoryName={firstArticle.category_name}
                        categorySlug={firstArticle.category_slug}
                        title={firstArticle.title}
                        imageUrl={firstArticle.image_url}
                        authorFullName={firstArticle.author_full_name}
                        authorId={firstArticle.author_id}
                        slug={firstArticle.slug}
                        introductionText={firstArticle.introduction_text}
                    />
                    <ul className="flex gap-4">
                        {articles.map((article, index) => {
                            return (
                                <Fragment key={article.id}>
                                    {index > 0 && (
                                        <li className="">
                                            <Separator orientation="vertical" />
                                        </li>
                                    )}
                                    <li>
                                        <ArticleCardInfo
                                            title={article.title}
                                            imageUrl={article.image_url}
                                            authorFullName={
                                                article.author_full_name
                                            }
                                            authorId={article.author_id}
                                            slug={article.slug}
                                            imageAlign="right"
                                        />
                                    </li>
                                </Fragment>
                            );
                        })}
                    </ul>
                </div>
            </Box>
        </section>
    );
};

export default SectionMostComments;
