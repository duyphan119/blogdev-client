"use client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    keyword: z.string(),
});

export type SearchRequest = z.infer<typeof formSchema>;

type Props = {
    onSearch: (keyword: string) => void;
    keyword: string;
};

const ArticleSearch = (props: Props) => {
    const form = useForm<SearchRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: props.keyword,
        },
    });

    const onSubmit = (values: SearchRequest) => {
        props.onSearch(values.keyword);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="keyword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Search..." {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default ArticleSearch;
