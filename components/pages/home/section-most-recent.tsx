"use client";

import { Article } from "@/types/article";
import ArticleCardInfo from "../../article/article-card-info";
import Box from "./box";

type Props = {
    articles: Article[];
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
                                    authorFullName={article.author.full_name}
                                    authorId={article.author.id}
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
