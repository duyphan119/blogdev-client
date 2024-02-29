"use client";

import categoryApi from "@/api/category-api";
import { buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Props = {
    categorySlug?: string;
};

const Categories = (props: Props) => {
    const query = useQuery({
        queryKey: ["categories-filter"],
        queryFn: () => categoryApi.getAll(),
        refetchOnMount: false,
    });

    return (
        <div className="shadow border border-border p-4">
            <ul className="flex flex-wrap gap-4 items-center">
                <li>Categories:</li>
                {query.data?.data.map((category) => {
                    if (
                        props.categorySlug &&
                        category.slug === props.categorySlug
                    )
                        return null;
                    return (
                        <li key={category.id}>
                            <Link
                                href={`/article?cat=${category.slug}`}
                                className={buttonVariants({})}
                            >
                                {category.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Categories;
