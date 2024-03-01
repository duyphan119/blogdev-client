import ArticleListPage from "@/components/pages/admin/article-list";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
    searchParams: {
        p?: string;
    };
};

export const metadata: Metadata = {
    title: formatTitle("Admin - Article List"),
};

const AdminArticlePage = (props: Props) => {
    return <ArticleListPage />;
};

export default AdminArticlePage;
