"use client";

import { ArticleCard } from "@/types/article";
import ArticleCardInfo from "../my-articles/article-card-info";
import Box from "./box";

type Props = {
    articles: ArticleCard[];
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
                                    categoryName={article.category_name}
                                    categorySlug={article.category_slug}
                                    authorFullName={article.author_full_name}
                                    authorId={article.author_id}
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
