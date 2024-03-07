import categoryParentApi from "@/api/category-parent-api";
import CategoryParentFormPage from "@/components/pages/admin/category-parent-form";
import { formatTitle } from "@/lib/utils";
import { CategoryParent } from "@/types/category-parent";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    categoryParentId: string;
  };
};

export const metadata: Metadata = {
  title: formatTitle("Admin - Create Category Parent"),
};

export const generateMetadata = async ({
  params: { categoryParentId },
}: Props): Promise<Metadata> => {
  let title = formatTitle("Admin - Update Category Parent");

  if (categoryParentId) {
    try {
      let id = +categoryParentId;

      const response = await categoryParentApi.getById(id);
      if (response.message === "Success") {
        title += ` - ${response.data.name}`;
      }
    } catch (error) {}
  }

  return {
    title,
  };
};

const AdminUpdateCategoryParentPage = async ({
  params: { categoryParentId },
}: Props) => {
  let categoryParent: CategoryParent | undefined = undefined;

  if (categoryParentId) {
    try {
      let id = +categoryParentId;

      const response = await categoryParentApi.getById(id);
      if (response.message === "Success") {
        categoryParent = response.data;
      }
    } catch (error) {}
  }

  if (!categoryParent) {
    notFound();
  } else {
    return <CategoryParentFormPage categoryParent={categoryParent} />;
  }
};

export default AdminUpdateCategoryParentPage;
