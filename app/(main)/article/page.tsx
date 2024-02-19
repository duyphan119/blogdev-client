import Articles from "@/components/pages/articles";
import { formatTitle } from "@/lib/utils";
import React from "react";

type Props = {
    searchParams: {
        p?: string;
        author?: string;
    };
};

export const generateMetadata = () => {
    return {
        title: formatTitle("Articles"),
    };
};

const ArticlesPage = (props: Props) => {
    return <Articles />;
};

export default ArticlesPage;
