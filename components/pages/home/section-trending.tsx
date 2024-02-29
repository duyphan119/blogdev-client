"use client";

import { Article } from "@/types/article";
import ArticleCardInfo from "../../article/article-card-info";
import Box from "./box";

type Props = {
    articles: Article[];
};

const SectionTrending = (props: Props) => {
    return (
        <section>
            <Box title="Trending">
                <ul className="grid grid-cols-4 gap-8">
                    {props.articles.map((article, index) => {
                        return (
                            <li
                                className="space-y-2 col-span-4 sm:col-span-2 md:col-span-1"
                                key={article.id}
                            >
                                <ArticleCardInfo
                                    key={article.id}
                                    title={article.title}
                                    imageUrl={article.image_url}
                                    categoryName={article.category.name}
                                    categorySlug={article.category.slug}
                                    authorFullName={article.author.full_name}
                                    authorId={article.author.id}
                                    slug={article.slug}
                                    imageAlign="top"
                                    introductionText={article.introduction_text}
                                />
                            </li>
                        );
                    })}
                </ul>
            </Box>
        </section>
    );
};

export default SectionTrending;
