"use client";

import authApi from "@/api/auth-api";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email({
        message: "Email is invalid",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
});

export type LoginRequest = z.infer<typeof formSchema>;

type Props = {};

const LoginForm = (props: Props) => {
    const router = useRouter();

    const form = useForm<LoginRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "duychomap123@gmail.com",
            password: "123456",
        },
    });

    const onSubmit = async (values: LoginRequest) => {
        const response = await authApi.login(values);
        console.log(response);

        if (response.message === "Success") {
            router.push("/");
            setCookie("accessToken", response.data.access_token, {
                maxAge: response.data.access_token_expired / 1000,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <Input placeholder="Password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Password must be at least 6 characters
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default LoginForm;
