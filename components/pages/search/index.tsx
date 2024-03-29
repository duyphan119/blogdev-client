"use client";

import ButtonLoading from "@/components/common/button/button-loading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PaginatedData } from "@/types";
import { Article } from "@/types/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ArticleCardInfo from "../../article/article-card-info";
import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import articleApi from "@/api/article-api";
import { Button } from "@/components/ui/button";

type Props = {
    data: PaginatedData<Article>;
    defaultKeyword: string;
    limit: number;
};

const formSchema = z.object({
    keyword: z.string(),
});

export type SearchArticlesRequest = z.infer<typeof formSchema>;

const Search = (props: Props) => {
    const router = useRouter();

    const [queryIsEnabled, setQueryIsEnabled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const query = useQuery({
        queryKey: [
            "search-articles",
            queryIsEnabled,
            currentPage,
            props.defaultKeyword,
        ],
        queryFn: () =>
            articleApi.paginate({
                p: 1,
                limit: props.limit * currentPage,
                q: props.defaultKeyword,
            }),
        enabled: queryIsEnabled,
        placeholderData: keepPreviousData,
    });

    const form = useForm<SearchArticlesRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: props.defaultKeyword,
        },
    });

    const onSubmit = (values: SearchArticlesRequest) => {
        router.push(`/search?q=${values.keyword}`);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        setQueryIsEnabled(true);
    };

    return (
        <div className="space-y-8">
            <div className="container">
                <h1 className="text-3xl font-bold text-center">
                    Search articles from BLDEV
                </h1>
            </div>
            <Separator />
            <div className="container space-y-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex sm:w-2/3 w-full sm:flex-row flex-col sm:gap-0 gap-2 mx-auto"
                    >
                        <FormField
                            control={form.control}
                            name="keyword"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input
                                            placeholder="Search..."
                                            disabled={
                                                form.formState.isSubmitting
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <ButtonLoading
                            type="submit"
                            disabled={
                                form.formState.isSubmitting ||
                                !form.formState.isValid
                            }
                            isLoading={form.formState.isSubmitting}
                            className="uppercase rounded-none"
                        >
                            Search
                        </ButtonLoading>
                    </form>
                </Form>
                <div className="grid grid-cols-12 gap-y-8 md:gap-8">
                    <div className="col-span-12 md:col-span-9">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-light">
                                {props.data.count} articles{" "}
                                {props.defaultKeyword
                                    ? `about "
                                ${props.defaultKeyword}"`
                                    : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-y-8 md:gap-8">
                    <div className="col-span-12 md:col-span-9 space-y-8">
                        <ul className="space-y-8">
                            {(query.data?.data.rows || props.data.rows).map(
                                (article) => {
                                    return (
                                        <li key={article.id}>
                                            <ArticleCardInfo
                                                title={article.title}
                                                imageUrl={article.image_url}
                                                categoryName={
                                                    article.category.name
                                                }
                                                categorySlug={
                                                    article.category.slug
                                                }
                                                authorFullName={
                                                    article.author.full_name
                                                }
                                                authorId={article.author.id}
                                                createdAt={article.created_at}
                                                slug={article.slug}
                                                imageAlign="left-responsive-to-top"
                                                imageClassName="md:w-60 md:h-40 sm:w-48 sm:h-32 w-full pb-[60%] sm:pb-0"
                                                className="gap-4"
                                            />
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                        {props.data.total_pages > 1 && (
                            <div className="text-center">
                                {currentPage < props.data.total_pages ? (
                                    <Button
                                        disabled={
                                            queryIsEnabled && query.isPending
                                        }
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        className="uppercase"
                                    >
                                        View more
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={
                                            queryIsEnabled && query.isPending
                                        }
                                        onClick={() => handlePageChange(1)}
                                        className="uppercase"
                                    >
                                        Collapse
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Separator />
        </div>
    );
};

export default Search;
