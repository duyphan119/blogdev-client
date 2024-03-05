"use client";

import articleApi from "@/api/article-api";
import categoryApi from "@/api/category-api";
import uploadApi from "@/api/upload-api";
import ButtonLoading from "@/components/common/button/button-loading";
import Box from "@/components/layouts/profile-layout/box";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatTitle } from "@/lib/utils";
import { Article } from "@/types/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
    title: z.string().min(1, {
        message: "Title must be at least 1 characters.",
    }),
    category: z.object({
        id: z.number().min(1, {
            message: "Category is required",
        }),
    }),
    image_url: z.string(),
    introduction_text: z.string(),
});

export type ArticleRequest = z.infer<typeof formSchema>;

type Props = {
    article?: Article;
    articleId?: number;
};

const ArticleForm = (props: Props) => {
    const router = useRouter();

    const [article, setArticle] = useState<Article | null>(null);

    const form = useForm<ArticleRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
            title: "",
            category: {
                id: 0,
            },
            image_url: "",
            introduction_text: "",
        },
    });

    const query = useQuery({
        queryKey: ["category-list", props.articleId],
        queryFn: () =>
            Promise.allSettled([
                categoryApi.paginate({
                    sort_by: "name",
                    sort_type: "asc",
                }),
                articleApi.getById(Number(props.articleId)),
            ]),
    });

    const createArticleMutation = useMutation({
        mutationFn: (body: ArticleRequest) =>
            props.articleId
                ? articleApi.userUpdate({
                      ...article,
                      ...body,
                  } as Article)
                : articleApi.userCreate(body),
        onSuccess: async (response) => {
            router.push("/profile/article");
        },
    });

    const onSubmit = (values: ArticleRequest) => {
        createArticleMutation.mutate(values);
    };

    const handleInputFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            const response = await uploadApi.uploadImageSingle(formData);
            if (response.message === "Success") {
                form.setValue("image_url", response.data);
            }
        }
    };

    const showCategoryList = () => {
        if (query.data?.[0].status === "fulfilled") {
            return query.data[0].value.data.rows.map((category) => {
                return (
                    <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                    >
                        {category.name}
                    </SelectItem>
                );
            });
        }
        return null;
    };

    useEffect(() => {
        if (query.data?.[1].status === "fulfilled") {
            setArticle(query.data[1].value.data);
        }
    }, [query]);

    useEffect(() => {
        if (article) {
            form.setValue("title", article.title);
            form.setValue("content", article.content);
            form.setValue("introduction_text", article.introduction_text);
            form.setValue("image_url", article.image_url);
            form.setValue("category.id", article.category.id);
            document.title = formatTitle(`Update Article - ${article.title}`);
        }
    }, [article]);

    return (
        <Box title="Article Form">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="category.id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required={true}>Category</FormLabel>
                                <Select
                                    value={field.value.toString()}
                                    onValueChange={(value: string) =>
                                        field.onChange(Number(value))
                                    }
                                >
                                    <SelectTrigger className="">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {showCategoryList()}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image_url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        id="image_url"
                                        onChange={handleInputFileChange}
                                    />
                                </FormControl>
                                <Input
                                    {...field}
                                    className={cn(!field.value && "hidden")}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required={true}>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            createArticleMutation.isPending
                                        }
                                        placeholder="Title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="introduction_text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Introduction Text</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            createArticleMutation.isPending
                                        }
                                        placeholder="Introduction Text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel required={true}>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={
                                            createArticleMutation.isPending
                                        }
                                        placeholder="Content"
                                        rows={30}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-4">
                        <Button
                            type="reset"
                            disabled={createArticleMutation.isPending}
                            variant="secondary"
                        >
                            Reset
                        </Button>
                        <Button
                            type="button"
                            disabled={
                                !form.formState.isSubmitting ||
                                !form.formState.isValid
                            }
                            variant="outline"
                        >
                            Preview
                        </Button>
                        <ButtonLoading
                            isLoading={createArticleMutation.isPending}
                            disabled={
                                createArticleMutation.isPending ||
                                form.formState.isSubmitting ||
                                !form.formState.isValid
                            }
                            type="submit"
                        >
                            {props.articleId ? "Update" : "Create"}
                        </ButtonLoading>
                    </div>
                </form>
            </Form>
        </Box>
    );
};

export default ArticleForm;
