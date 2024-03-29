"use client";

import { Article } from "@/types/article";
import ArticleCardInfo from "../../article/article-card-info";
import Box from "./box";

type Props = {
    articles: Article[];
};

const SectionToday = (props: Props) => {
    const lastArticle = props.articles[props.articles.length - 1] || null;
    return (
        <section>
            <Box title={`Today's picks`}>
                <div className="grid grid-cols-12 sm:gap-8 gap-y-8">
                    {props.articles.length > 0 && (
                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            {props.articles.map((article, index) => {
                                if (index === props.articles.length - 1)
                                    return null;
                                return (
                                    <ArticleCardInfo
                                        key={article.id}
                                        title={article.title}
                                        authorFullName={
                                            article.author.full_name
                                        }
                                        authorId={article.author.id}
                                        imageUrl={article.image_url}
                                        slug={article.slug}
                                        categoryName={article.category.name}
                                        categorySlug={article.category.slug}
                                        imageAlign="top"
                                    />
                                );
                            })}
                        </div>
                    )}
                    {lastArticle && (
                        <div className="col-span-12 lg:col-span-8">
                            <ArticleCardInfo
                                title={lastArticle.title}
                                authorFullName={lastArticle.author.full_name}
                                authorId={lastArticle.author.id}
                                imageUrl={lastArticle.image_url}
                                slug={lastArticle.slug}
                                categoryName={lastArticle.category.name}
                                categorySlug={lastArticle.category.slug}
                                imageAlign="top"
                            />
                        </div>
                    )}
                </div>
            </Box>
        </section>
    );
};

export default SectionToday;
