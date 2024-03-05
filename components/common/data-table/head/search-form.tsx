"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RiSearch2Line } from "react-icons/ri";
import * as z from "zod";

export type SearchFormProps = {
    defaultValue?: string;
    onSubmit: (value: string) => void;
};

const formSchema = z.object({
    keyword: z.string(),
});

export type SearchFormFields = z.infer<typeof formSchema>;

const SearchForm = (props: SearchFormProps) => {
    if (!props) return null;

    const form = useForm<SearchFormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            keyword: props.defaultValue || "",
        },
    });

    const onSubmit = (values: SearchFormFields) => {
        props.onSubmit(values.keyword);
    };

    return (
        <Form {...form}>
            <form
                className="flex gap-2 flex-1 justify-end"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="keyword"
                    render={({ field }) => {
                        return (
                            <FormControl className="max-w-56">
                                <FormItem>
                                    <Input
                                        placeholder="Search here..."
                                        {...field}
                                    />
                                </FormItem>
                            </FormControl>
                        );
                    }}
                />
                <Button>
                    <RiSearch2Line />
                </Button>
            </form>
        </Form>
    );
};

export default SearchForm;
