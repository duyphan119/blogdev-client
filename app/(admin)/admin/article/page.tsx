import ArticleListPage from "@/components/pages/admin/article-list";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
    searchParams: {
        p?: string;
        q?: string;
    };
};

export const metadata: Metadata = {
    title: formatTitle("Admin - Article List"),
};

const AdminArticlePage = ({ searchParams: { p, q } }: Props) => {
    return <ArticleListPage currentPage={+(p || "1")} keyword={q} />;
};

export default AdminArticlePage;
