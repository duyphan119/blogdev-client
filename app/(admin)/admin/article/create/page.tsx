import ArticleFormPage from "@/components/pages/admin/article-form";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
    title: formatTitle("Admin - Create Article"),
};

const AdminCreateArticlePage = (props: Props) => {
    return <ArticleFormPage />;
};

export default AdminCreateArticlePage;
