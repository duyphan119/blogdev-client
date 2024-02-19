import articleApi from "@/api/article-api";
import Search from "@/components/pages/search";
import { formatTitle } from "@/lib/utils";
import { PaginatedData } from "@/types";
import { ArticleCard } from "@/types/article";
import { Metadata } from "next";

type Props = {
    searchParams: {
        q?: string;
    };
};

export const metadata: Metadata = {
    title: formatTitle("Search"),
};

const ARTICLE_LIMIT = 10;

const SearchPage = async (props: Props) => {
    let data: PaginatedData<ArticleCard> = {
        count: 0,
        rows: [],
        total_pages: 0,
    };
    try {
        const response = await articleApi.paginate({
            limit: ARTICLE_LIMIT,
            p: 1,
            q: props.searchParams.q || "",
        });
        if (response.message === "Success") {
            data = response.data;
        }
    } catch (error) {}
    return (
        <Search
            limit={ARTICLE_LIMIT}
            data={data}
            defaultKeyword={props.searchParams.q || ""}
        />
    );
};

export default SearchPage;
