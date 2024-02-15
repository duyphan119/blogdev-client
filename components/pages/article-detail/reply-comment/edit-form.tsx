"use client";

import articleReplyCommentApi from "@/api/article-reply-comment-api";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
    content: string;
    onEdit: (newContent: string) => void;
    onClose: () => void;
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
            content: props.content,
        },
    });

    const onSubmit = (values: ArticleCommentRequest) => {
        props.onEdit(values.content);
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
                <div className="w-full flex gap-4 mt-4">
                    <Button
                        type="button"
                        onClick={props.onClose}
                        variant="secondary"
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EditForm;
