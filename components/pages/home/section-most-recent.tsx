"use client";

import { ArticleCard } from "@/types/article";
import ArticleCardInfo from "../my-articles/article-card-info";
import Box from "./box";

type Props = {
    articles: ArticleCard[];
};

const SectionMostRecent = (props: Props) => {
    return (
        <section>
            <Box title="Most Recent">
                <ul className="space-y-4">
                    {props.articles.map((article) => {
                        return (
                            <li key={article.id}>
                                <ArticleCardInfo
                                    title={article.title}
                                    imageUrl={article.image_url}
                                    authorFullName={article.author_full_name}
                                    authorId={article.author_id}
                                    slug={article.slug}
                                    imageAlign="right"
                                    imageClassName="hidden md:block"
                                />
                            </li>
                        );
                    })}
                </ul>
            </Box>
        </section>
    );
};

export default SectionMostRecent;
