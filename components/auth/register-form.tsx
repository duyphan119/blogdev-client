"use client";

import authApi from "@/api/auth-api";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUserStore from "@/zustand/use-user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({
        message: "Email is invalid",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
    first_name: z.string().min(1, {
        message: "First name is required",
    }),
    last_name: z.string().min(1, {
        message: "Last name is required",
    }),
});

export type RegisterRequest = z.infer<typeof formSchema>;

type Props = {};

const RegisterForm = (props: Props) => {
    const { profile, isFetchedProfile } = useUserStore();

    if (isFetchedProfile && profile) redirect("/");

    const router = useRouter();

    const form = useForm<RegisterRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "duychomap4567@gmail.com",
            password: "123456",
            first_name: "Duy",
            last_name: "Phan",
        },
    });

    const queryClient = useQueryClient();

    const registerMutation = useMutation({
        mutationFn: (body: RegisterRequest) => authApi.login(body),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            const prevPage = getCookie("prevPage")?.toString() ?? "/";
            deleteCookie("prevPage");
            setCookie("accessToken", response.data.access_token, {
                maxAge: response.data.access_token_expired / 1000,
            });
            router.push(prevPage);
        },
    });

    const onSubmit = async (values: RegisterRequest) => {
        registerMutation.mutate(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mx-auto md:w-1/2 w-full md:border md:border-border md:shadow p-8 my-24"
            >
                <h1 className="text-center text-3xl uppercase font-bold">
                    Register new account
                </h1>
                <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem className="md:col-span-1 col-span-2">
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="First name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem className="md:col-span-1 col-span-2">
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Last name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Password must be at least 6 characters
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Link
                        href="/login"
                        className={buttonVariants({
                            variant: "link",
                            className: "!px-0 !py-0",
                        })}
                    >
                        Login now
                    </Link>
                </div>
                <Button type="submit" className="w-full">
                    Register
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
