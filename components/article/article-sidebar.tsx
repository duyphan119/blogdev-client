"use client";

import { webApi } from "@/api/web-api";
import { useQuery } from "@tanstack/react-query";
import SidebarArticles from "./sidebar-articles";

type Props = {
    articleSlug?: string;
};

const ArticleSidebar = (props: Props) => {
    const query = useQuery({
        queryKey: ["article-list-data", props.articleSlug],
        queryFn: () => webApi.getArticleListData(props.articleSlug),
        refetchOnMount: false,
        enabled: true,
    });

    if (!query.isSuccess || query.data.message === "Error") return null;

    return (
        <>
            <SidebarArticles
                title="Most Recent"
                articles={query.data.data.most_recent_articles}
            />
            <SidebarArticles
                title="Most Views"
                articles={query.data.data.most_views_articles}
            />
            <SidebarArticles
                title="Most Comments"
                articles={query.data.data.most_comments_articles}
            />
            <SidebarArticles
                title="Trending"
                articles={query.data.data.trending_articles}
            />
        </>
    );
};

export default ArticleSidebar;
