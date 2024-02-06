"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";

type Props = {};

const formSchema = z.object({
    email: z.string().email({
        message: "Email is invalid.",
    }),
    full_name: z.string().min(1, {
        message: "Full name must be at least 1 characters.",
    }),
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
    website: z.string().url({
        message: "Wesbite is invalid.",
    }),
});

export type CommentRequest = z.infer<typeof formSchema>;

const CommentForm = (props: Props) => {
    const form = useForm<CommentRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            content: "",
            full_name: "",
        },
    });

    const onSubmit = async (values: CommentRequest) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-12 gap-8 p-8 border"
            >
                <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                        <FormItem className="col-span-12 md:col-span-4">
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                                <Input placeholder="Full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="col-span-12 md:col-span-4">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                        <FormItem className="col-span-12 md:col-span-4">
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                                <Input placeholder="Website" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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

export default CommentForm;
