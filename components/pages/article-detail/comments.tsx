"use client";

import { Button } from "@/components/ui/button";
import { ArticleComment } from "@/types/article-comment";
import Comment from "./comment";

type Props = {
    articleComments: ArticleComment[];
    commentCount: number;
    totalPages: number;
    currentPage: number;
    onPageChange: (newPage: number) => void;
    onDelete: (id: number) => void;
};

const Comments = (props: Props) => {
    return (
        <div className="space-y-4">
            <div className="text-xl font-semibold">
                {`Comments ${
                    props.commentCount > 0 ? `(${props.commentCount})` : ""
                }`}
            </div>
            <div className="article-comments">
                {props.articleComments.length > 0 ? (
                    <div className="space-y-8">
                        <ul className="space-y-8">
                            {props.articleComments.map((articleComment) => {
                                return (
                                    <Comment
                                        key={articleComment.id}
                                        articleComment={articleComment}
                                        onDelete={props.onDelete}
                                    />
                                );
                            })}
                        </ul>
                        {props.totalPages > 1 &&
                            (props.currentPage < props.totalPages ? (
                                <Button
                                    onClick={() =>
                                        props.onPageChange(
                                            props.currentPage + 1
                                        )
                                    }
                                    variant="outline"
                                    className="w-full uppercase"
                                >
                                    View more
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => props.onPageChange(1)}
                                    variant="outline"
                                    className="w-full uppercase"
                                >
                                    Collapse
                                </Button>
                            ))}
                    </div>
                ) : (
                    <div className="bg-slate-200 px-4 py-2">
                        There are no comments yet. Why don't you write one?
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comments;
