import articleApi from "@/api/article-api";
import ArticleFormPage from "@/components/pages/admin/article-form";
import { formatTitle } from "@/lib/utils";
import { Article } from "@/types/article";

type Props = {
    params: {
        articleId: string;
    };
};

export const generateMetadata = async (props: Props) => {
    let title = formatTitle("Update Article");

    try {
        if (props.params.articleId) {
            const response = await articleApi.getById(+props.params.articleId);
            if (response.message === "Success") {
                title = response.data.title;
            }
        }
    } catch (error) {}

    return {
        title,
    };
};

const AdminUpdateArticlePage = async ({ params: { articleId } }: Props) => {
    let article: Article | undefined = undefined;
    try {
        if (articleId) {
            const response = await articleApi.getById(+articleId);
            if (response.message === "Success") {
                article = response.data;
            }
        }
    } catch (error) {}
    return <ArticleFormPage article={article} />;
};

export default AdminUpdateArticlePage;
