"use client";

import { Separator } from "@/components/ui/separator";
import { Article } from "@/types/article";
import { Fragment } from "react";
import ArticleCardInfo from "../../article/article-card-info";
import Box from "./box";

type Props = {
    articles: Article[];
};

const SectionLongreads = (props: Props) => {
    const [firstArticle, ...articles] = props.articles;
    if (!firstArticle) return null;
    return (
        <section>
            <Box title="Longreads">
                <div className="space-y-8">
                    <ArticleCardInfo
                        categoryName={firstArticle.category.name}
                        categorySlug={firstArticle.category.slug}
                        title={firstArticle.title}
                        imageUrl={firstArticle.image_url}
                        authorFullName={firstArticle.author.full_name}
                        authorId={firstArticle.author.id}
                        slug={firstArticle.slug}
                        introductionText={firstArticle.introduction_text}
                    />
                    <ul className="grid grid-cols-12 gap-y-6 md:gap-6">
                        {articles.map((article) => {
                            return (
                                <li
                                    className="col-span-12 md:col-span-6 lg:col-span-3"
                                    key={article.id}
                                >
                                    <ArticleCardInfo
                                        title={article.title}
                                        imageUrl={article.image_url}
                                        authorFullName={
                                            article.author.full_name
                                        }
                                        authorId={article.author.id}
                                        slug={article.slug}
                                        imageAlign="right"
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Box>
        </section>
    );
};

export default SectionLongreads;
