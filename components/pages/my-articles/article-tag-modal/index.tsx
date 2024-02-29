"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArticleTag } from "@/types/article-tag";
import { RiHashtag } from "react-icons/ri";
import ArticleTagForm from "./article-tag-form";
import TagItem from "./tag-item";
import { useState } from "react";
import useArticleTagStore from "@/zustand/use-article-tag-store";
import { cn } from "@/lib/utils";

type Props = {
    articleId: number;
    selectedArticleTags: ArticleTag[];
    onSelect: (newArticleTag: ArticleTag) => void;
    onDeselect: (id: number) => void;
};

const ArticleTagModal = (props: Props) => {
    const {
        isFetched,
        setPaginatedArticleTags,
        setIsFetched,
        articleTags,
        count,
        totalPages,
    } = useArticleTagStore();

    const [formVisible, setFormVisible] = useState(false);

    return (
        <Dialog modal={true}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                    <RiHashtag /> Tags
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw]">
                <DialogHeader>
                    <DialogTitle>Article's Tags</DialogTitle>
                </DialogHeader>
                <div className="w-full">
                    <div className="grid grid-cols-12 gap-y-4 md:gap-4">
                        {formVisible && (
                            <div className="col-span-12 md:col-span-6 border border-border p-4">
                                <ArticleTagForm
                                    articleId={props.articleId}
                                    onSelect={props.onSelect}
                                    onClose={() => setFormVisible(false)}
                                />
                            </div>
                        )}
                        <div
                            className={cn(
                                "col-span-12 space-y-4",
                                formVisible ? "md:col-span-6" : ""
                            )}
                        >
                            {!formVisible && (
                                <Button onClick={() => setFormVisible(true)}>
                                    Create
                                </Button>
                            )}
                            <ul className="flex gap-4">
                                {articleTags.map((tag) => {
                                    const isActive =
                                        props.selectedArticleTags.findIndex(
                                            (item) => item.id === tag.id
                                        ) !== -1;
                                    return (
                                        <li key={tag.id}>
                                            <TagItem
                                                tag={tag}
                                                isActive={isActive}
                                                onDeselect={props.onDeselect}
                                                onSelect={props.onSelect}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ArticleTagModal;
