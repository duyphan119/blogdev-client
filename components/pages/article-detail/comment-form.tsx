"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import articleCommentApi from "@/api/article-comment-api";
import ButtonLoading from "@/components/common/button/button-loading";
import { buttonVariants } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ArticleComment } from "@/types/article-comment";
import useUserStore from "@/zustand/use-user-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Props = {
    articleId: number;
};

const formSchema = z.object({
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
});

export type ArticleCommentRequest = z.infer<typeof formSchema>;

const CommentForm = (props: Props) => {
    const queryClient = useQueryClient();

    const pathname = usePathname();

    const { profile, isFetchedProfile } = useUserStore();

    const createArticleCommentMutation = useMutation({
        mutationFn: (
            body: ArticleCommentRequest & { article: { id: number } }
        ) => articleCommentApi.create(body),
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["article-comments"] }),
    });

    const form = useForm<ArticleCommentRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const onSubmit = async (values: ArticleCommentRequest) => {
        createArticleCommentMutation.mutate({
            ...values,
            article: {
                id: props.articleId,
            },
        });
    };

    return (
        <div className="space-y-4">
            <div className="text-xl font-semibold">Leave a comment</div>
            {isFetchedProfile &&
                (profile ? (
                    <div className="article-comment-form">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="grid grid-cols-12 gap-8 p-8 border"
                            >
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12">
                                            <FormLabel>Content</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Content"
                                                    rows={4}
                                                    disabled={
                                                        createArticleCommentMutation.isPending
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <ButtonLoading
                                    type="submit"
                                    disabled={
                                        createArticleCommentMutation.isPending ||
                                        !form.formState.isDirty ||
                                        !form.formState.isValid
                                    }
                                    isLoading={
                                        createArticleCommentMutation.isPending
                                    }
                                    className="col-span-12"
                                >
                                    Post
                                </ButtonLoading>
                            </form>
                        </Form>
                    </div>
                ) : (
                    <div className="p-8 border">
                        <Link
                            href="/login"
                            className={buttonVariants({
                                variant: "link",
                            })}
                            onClick={() => {
                                setCookie("prevPage", pathname);
                            }}
                        >
                            Sign in
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default CommentForm;
