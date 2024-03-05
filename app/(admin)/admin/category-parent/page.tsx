import CategoryParentListPage from "@/components/pages/admin/category-parent-list";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
    searchParams: {
        p?: string;
    };
};

export const metadata: Metadata = {
    title: formatTitle("Admin - Category Parent List"),
};

const AdminCategoryParentPage = ({ searchParams: { p } }: Props) => {
    return <CategoryParentListPage currentPage={+(p || "1")} />;
};

export default AdminCategoryParentPage;
