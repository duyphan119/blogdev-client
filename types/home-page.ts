import { Article } from "./article";
import { ArticleCategory } from "./category";

export type HomePageData = {
    today_articles: Article[];
    most_recent_articles: Article[];
    longreads_articles: Article[];
    categories: Array<ArticleCategory>;
    most_views_articles: Article[];
    most_comments_articles: Article[];
    trending_articles: Article[];
};
