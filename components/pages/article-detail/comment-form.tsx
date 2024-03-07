"use client";

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
import useUserStore from "@/zustand/use-user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
    articleId: number;
};

const formSchema = z.object({
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
    article: z.object({
        id: z.number().min(1, {
            message: "Article Id is required"
        })
    })
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
            article: {
                id: props.articleId
            }
        },
    });

    const onSubmit = (values: ArticleCommentRequest) => {
        createArticleCommentMutation.mutate(values);
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
                                className="space-y-8 p-8 border"
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
                                    className="w-full"
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
