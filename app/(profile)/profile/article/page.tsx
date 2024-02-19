import MyArticles from "@/components/pages/my-articles";
import { formatTitle } from "@/lib/utils";
import { Metadata } from "next";

type Props = {
    searchParams: {
        p: string;
        q: string;
    };
};

export const metadata: Metadata = {
    title: formatTitle("My Articles"),
};

const ArticlesPage = (props: Props) => {
    return (
        <MyArticles
            currentPage={Number(props.searchParams.p || "1")}
            keyword={props.searchParams.q || ""}
        />
    );
};

export default ArticlesPage;
