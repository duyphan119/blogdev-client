"use client";

import { ArticleCard } from "@/types/article";
import Box from "../pages/home/box";
import ArticleCardInfo from "../pages/my-articles/article-card-info";

type Props = {
    articles: ArticleCard[];
    title: string;
};

const SidebarArticles = (props: Props) => {
    return (
        <section>
            <Box title={props.title}>
                <ul className="space-y-4">
                    {props.articles.map((article) => {
                        return (
                            <ArticleCardInfo
                                key={article.id}
                                imageAlign="left"
                                imageClassName="hidden sm:block"
                                imageUrl={article.image_url}
                                title={article.title}
                                slug={article.slug}
                            />
                        );
                    })}
                </ul>
            </Box>
        </section>
    );
};

export default SidebarArticles;
