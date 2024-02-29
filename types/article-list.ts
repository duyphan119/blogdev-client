import { Article } from "./article";

export type ArticleList = {
    trending_articles: Article[];
    most_recent_articles: Article[];
    most_views_articles: Article[];
    most_comments_articles: Article[];
};
