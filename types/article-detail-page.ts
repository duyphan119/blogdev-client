import { Article, ArticleCard } from "./article";
import { ArticleComment } from "./article-comment";

export type ArticleDetailData = {
    article: Article;
    comments: ArticleComment[];
    comment_count: number;
    recommend_articles: ArticleCard[];
    trending_articles: ArticleCard[];
    most_recent_articles: ArticleCard[];
    most_views_articles: ArticleCard[];
    most_comments_articles: ArticleCard[];
};
