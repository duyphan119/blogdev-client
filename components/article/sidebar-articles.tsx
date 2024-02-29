"use client";

import { Article } from "@/types/article";
import Box from "../pages/home/box";
import ArticleCardInfo from "./article-card-info";

type Props = {
    articles: Article[];
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
