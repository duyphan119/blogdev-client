import CategoryListPage from "@/components/pages/admin/category-list";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
    searchParams: {
        p?: string;
    };
};

export const metadata: Metadata = {
    title: formatTitle("Admin - Category List"),
};

const AdminCategoryPage = ({ searchParams: { p } }: Props) => {
    return <CategoryListPage currentPage={+(p || "1")} />;
};

export default AdminCategoryPage;
