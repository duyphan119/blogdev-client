import ArticleListPage from "@/components/pages/admin/article-list";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  searchParams: {
    p?: string;
    q?: string;
    sort_by?: string;
    sort_type?: string;
  };
};

export const metadata: Metadata = {
  title: formatTitle("Admin - Article List"),
};

const AdminArticlePage = ({
  searchParams: { p, q, sort_by, sort_type },
}: Props) => {
  return (
    <ArticleListPage
      currentPage={+(p || "1")}
      keyword={q}
      sortBy={sort_by}
      sortType={sort_type}
    />
  );
};

export default AdminArticlePage;
