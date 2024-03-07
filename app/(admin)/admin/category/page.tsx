import CategoryListPage from "@/components/pages/admin/category-list";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
  searchParams: {
    p?: string;
    q?: string;
  };
};

export const metadata: Metadata = {
  title: formatTitle("Admin - Category List"),
};

const AdminCategoryPage = ({ searchParams: { p, q } }: Props) => {
  return <CategoryListPage currentPage={+(p || "1")} keyword={q} />;
};

export default AdminCategoryPage;
