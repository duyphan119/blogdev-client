import articleApi from "@/api/article-api";
import ArticleDetail from "@/components/pages/article-detail";
import { formatTitle } from "@/lib/utils";
import { Article } from "@/types/article";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: {
        slug: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    let title = formatTitle("Không tìm thấy trang");

    try {
        const response = await articleApi.getBySlug(props.params.slug);

        if (response.message === "Success") {
            title = formatTitle(response.data.title);
        }
    } catch (error) {}

    return {
        title,
    };
};

const ArticleDetailPage = async (props: Props) => {
    let article: Article | null = null;

    try {
        const response = await articleApi.getBySlug(props.params.slug);

        if (response.message === "Success") {
            article = response.data;
        }
    } catch (error) {}

    if (!article) return notFound();

    return <ArticleDetail article={article} />;
};

export default ArticleDetailPage;
