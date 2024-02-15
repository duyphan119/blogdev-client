"use client";

import { ReactNode } from "react";
import ArticleSidebar from "./article-sidebar";

type Props = {
    children: ReactNode;
    articleSlug?: string;
};

const ArticleListWrapper = (props: Props) => {
    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8 space-y-8">
                {props.children}
            </div>
            <div className="col-span-12 md:col-span-4 space-y-8">
                <ArticleSidebar articleSlug={props.articleSlug} />
            </div>
        </div>
    );
};

export default ArticleListWrapper;
