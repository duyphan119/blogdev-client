import { ArticleCard } from "./article";

export type ArticleList = {
    trending_articles: ArticleCard[];
    most_recent_articles: ArticleCard[];
    most_views_articles: ArticleCard[];
    most_comments_articles: ArticleCard[];
};
