import CategoryParentFormPage from "@/components/pages/admin/category-parent-form";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: formatTitle("Admin - Create Category Parent"),
};

const AdminCreateCategoryParentPage = (props: Props) => {
  return <CategoryParentFormPage />;
};

export default AdminCreateCategoryParentPage;
