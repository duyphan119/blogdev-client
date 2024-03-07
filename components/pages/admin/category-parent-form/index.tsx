"use client";

import { CategoryParent } from "@/types/category-parent";
import Box from "../box";
import CategoryParentForm from "@/components/category-parent/category-parent-form";

type Props = {
  categoryParent?: CategoryParent;
};

const CategoryParentFormPage = ({ categoryParent }: Props) => {
  return (
    <section>
      <Box title="Category Parent Form">
        <CategoryParentForm categoryParent={categoryParent} />
      </Box>
    </section>
  );
};

export default CategoryParentFormPage;
