"use client";

import { ArticleReplyCommentBody } from "@/api/article-reply-comment-api";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
    articleCommentId: number;
    onCreate: (body: ArticleReplyCommentBody) => void;
};

const formSchema = z.object({
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
});

export type ArticleReplyCommentRequest = z.infer<typeof formSchema>;
const ReplyForm = (props: Props) => {
    const form = useForm<ArticleReplyCommentRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const onSubmit = async (values: ArticleReplyCommentRequest) => {
        props.onCreate({
            ...values,
            article_comment: {
                id: props.articleCommentId,
            },
        });
    };

    return (
        <div className="ml-28">
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
                        Reply
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ReplyForm;
