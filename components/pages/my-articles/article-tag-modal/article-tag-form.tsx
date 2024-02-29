"use client";

import articleTagApi from "@/api/article-tag-api";
import ButtonLoading from "@/components/common/button/button-loading";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArticleTag } from "@/types/article-tag";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
    onSelect: (newArticleTag: ArticleTag) => void;
    articleId: number;
    onClose: () => void;
};

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be at least 1 character.",
    }),
});

export type ArticleTagRequest = z.infer<typeof formSchema>;

const ArticleTagForm = (props: Props) => {
    const form = useForm<ArticleTagRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const createArticleTagMutation = useMutation({
        mutationFn: (body: ArticleTagRequest) =>
            articleTagApi.createByArticleId(props.articleId, body),
        onSuccess: (response) => {
            props.onSelect(response.data);
        },
    });

    const onSubmit = (values: ArticleTagRequest) => {
        createArticleTagMutation.mutate(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required={true}>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4">
                    <Button variant="secondary" onClick={props.onClose}>
                        Cancel
                    </Button>
                    <ButtonLoading type="submit">Create</ButtonLoading>
                </div>
            </form>
        </Form>
    );
};

export default ArticleTagForm;
