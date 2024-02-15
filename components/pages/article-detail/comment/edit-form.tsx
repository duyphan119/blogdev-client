"use client";

import articleCommentApi from "@/api/article-comment-api";
import ButtonLoading from "@/components/common/button/button-loading";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ArticleComment } from "@/types/article-comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
    articleComment: ArticleComment;
    onEdit: (newArticleComment: ArticleComment) => void;
    onClose: () => void;
};

const formSchema = z.object({
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
});

type ArticleCommentRequest = z.infer<typeof formSchema>;

const EditForm = (props: Props) => {
    const updateArticleCommentMutation = useMutation({
        mutationFn: (body: ArticleComment) => articleCommentApi.update(body),
    });

    const form = useForm<ArticleCommentRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: props.articleComment.content,
        },
    });

    const onSubmit = async (values: ArticleCommentRequest) => {
        updateArticleCommentMutation.mutate({
            ...props.articleComment,
            ...values,
        });
    };

    useEffect(() => {
        if (
            updateArticleCommentMutation.isSuccess &&
            updateArticleCommentMutation.data.message === "Success"
        ) {
            props.onEdit(updateArticleCommentMutation.data.data);
        }
    }, [updateArticleCommentMutation.isSuccess]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Textarea
                                    placeholder="Content"
                                    rows={4}
                                    disabled={
                                        updateArticleCommentMutation.isPending
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex gap-4 mt-4">
                    <Button
                        type="button"
                        onClick={props.onClose}
                        variant="secondary"
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <ButtonLoading
                        disabled={
                            updateArticleCommentMutation.isPending ||
                            !form.formState.isDirty ||
                            !form.formState.isValid
                        }
                        isLoading={updateArticleCommentMutation.isPending}
                        type="submit"
                        className="flex-1"
                    >
                        Save
                    </ButtonLoading>
                </div>
            </form>
        </Form>
    );
};

export default EditForm;
