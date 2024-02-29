"use client";

import { ReactNode } from "react";
import ArticleSidebar from "./article-sidebar";
import { cn } from "@/lib/utils";

type Props = {
    children: ReactNode;
    articleSlug?: string;
    contentClassName?: string;
};

const ArticleListWrapper = (props: Props) => {
    return (
        <div className="grid grid-cols-12 gap-y-8 lg:gap-8">
            <div
                className={cn(
                    "col-span-12 lg:col-span-8 space-y-8",
                    props.contentClassName
                )}
            >
                {props.children}
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-8">
                <ArticleSidebar articleSlug={props.articleSlug} />
            </div>
        </div>
    );
};

export default ArticleListWrapper;
