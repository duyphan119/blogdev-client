import ArticleForm from "@/components/pages/article-form";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
    title: formatTitle("Create Article"),
};

const CreateArticlePage = (props: Props) => {
    return <ArticleForm />;
};

export default CreateArticlePage;
