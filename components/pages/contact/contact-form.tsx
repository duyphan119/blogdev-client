"use client";

import contactApi from "@/api/contact-api";
import ButtonLoading from "@/components/common/button/button-loading";
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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

const formSchema = z.object({
    full_name: z.string().min(1, {
        message: "Full name must be at least 1 characters.",
    }),
    email: z.string().email({
        message: "Email is invalid.",
    }),
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
});

export type ContactRequest = z.infer<typeof formSchema>;

const ContactForm = (props: Props) => {
    const createContactMutation = useMutation({
        mutationFn: (body: ContactRequest) => contactApi.create(body),
    });

    const form = useForm<ContactRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            email: "",
            content: "",
        },
    });

    const onSubmit = async (values: ContactRequest) => {
        createContactMutation.mutate(values);
    };

    useEffect(() => {
        if (createContactMutation.isSuccess) {
            toast({
                title: "Thank you. We will respond to you via email.",
            });
            form.reset();
        }
    }, [createContactMutation.isSuccess]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-12 gap-8">
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-6">
                                <FormLabel required={true}>Full name</FormLabel>
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
                            <FormItem className="col-span-12 md:col-span-6">
                                <FormLabel required={true}>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required={true}>Content</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Content"
                                    rows={9}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <ButtonLoading
                    type="submit"
                    className=""
                    isLoading={createContactMutation.isPending}
                    disabled={
                        createContactMutation.isPending ||
                        !form.formState.isDirty ||
                        !form.formState.isValid
                    }
                >
                    Send
                </ButtonLoading>
            </form>
        </Form>
    );
};

export default ContactForm;
