import { Article } from "./article";
import { ArticleComment } from "./article-comment";

export type ArticleDetailData = {
    article: Article;
    comments: ArticleComment[];
    comment_count: number;
    recommend_articles: Article[];
    trending_articles: Article[];
    most_recent_articles: Article[];
    most_views_articles: Article[];
    most_comments_articles: Article[];
};
