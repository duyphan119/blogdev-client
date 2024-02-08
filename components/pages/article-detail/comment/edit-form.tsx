"use client";

import articleCommentApi from "@/api/article-comment-api";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
    articleComment: ArticleComment;
    onEdit: (newArticleComment: ArticleComment) => void;
};

const formSchema = z.object({
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
});

type ArticleCommentRequest = z.infer<typeof formSchema>;

const EditForm = (props: Props) => {
    const form = useForm<ArticleCommentRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: props.articleComment.content,
        },
    });

    const onSubmit = async (values: ArticleCommentRequest) => {
        try {
            const response = await articleCommentApi.update({
                ...props.articleComment,
                ...values,
            });
            if (response.message === "Success") {
                props.onEdit(response.data);
            }
        } catch (error) {}
    };

    return (
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
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="col-span-12">
                    Post
                </Button>
            </form>
        </Form>
    );
};

export default EditForm;
