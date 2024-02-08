import articleApi from "@/api/article-api";
import { webApi } from "@/api/web-api";
import ArticleDetail from "@/components/pages/article-detail";
import { formatTitle } from "@/lib/utils";
import { Article } from "@/types/article";
import { ArticleComment } from "@/types/article-comment";
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
    try {
        const response = await webApi.getArticleDetailPageData(
            props.params.slug
        );

        if (response.message === "Success") {
            return <ArticleDetail data={response.data} />;
        }
    } catch (error) {}
    return notFound();
};

export default ArticleDetailPage;
