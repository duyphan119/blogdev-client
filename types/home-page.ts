import { ArticleCard } from "./article";
import { ArticleCategory } from "./category";

export type HomePageData = {
    today_articles: ArticleCard[];
    most_recent_articles: ArticleCard[];
    longreads_articles: ArticleCard[];
    categories: Array<ArticleCategory>;
    most_views_articles: ArticleCard[];
    most_comments_articles: ArticleCard[];
    trending_articles: ArticleCard[];
};
