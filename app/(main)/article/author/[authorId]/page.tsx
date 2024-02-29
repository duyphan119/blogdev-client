import articleApi from "@/api/article-api";
import AuthorArticles from "@/components/pages/author-articles";
import { Article } from "@/types/article";
import { Author } from "@/types/user";
import { notFound } from "next/navigation";

type Props = {
    params: {
        authorId: string;
    };
    searchParams: {
        p?: string;
    };
};

const ARTICLE_LIMIT = 10;

const AuthorArticlesPage = async (props: Props) => {
    let articles: Article[] = [];
    let totalPages = 0;
    let count = 0;
    let author: Author | null = null;
    try {
        const response = await articleApi.getByAuthorId(
            +props.params.authorId,
            {
                limit: ARTICLE_LIMIT,
            }
        );
        if (response.message === "Success") {
            articles = response.data.rows;
            totalPages = response.data.total_pages;
            count = response.data.count;
            author = response.data.author;
        }
    } catch (error) {}
    if (!author) {
        notFound();
    }
    return (
        <AuthorArticles
            articles={articles}
            totalPages={totalPages}
            author={author}
            limit={ARTICLE_LIMIT}
        />
    );
};

export default AuthorArticlesPage;
