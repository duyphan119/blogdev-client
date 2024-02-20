"use client";

import authApi from "@/api/auth-api";
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
import { Textarea } from "@/components/ui/textarea";
import { Author } from "@/types/user";
import useUserStore from "@/zustand/use-user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

const formSchema = z.object({
    email: z.string().email({
        message: "Email is invalid",
    }),
    first_name: z.string().min(1, {
        message: "First name is required",
    }),
    last_name: z.string().min(1, {
        message: "Last name is required",
    }),
    introduction: z.string(),
    twitter_url: z.string(),
    github_url: z.string(),
    facebook_url: z.string(),
    linkedin_url: z.string(),
    pinterest_url: z.string(),
    youtube_url: z.string(),
    career: z.string(),
});

export type ProfileRequest = z.infer<typeof formSchema>;

const ProfileForm = (props: Props) => {
    const { setProfile, profile } = useUserStore();

    const updateProfileMutation = useMutation({
        mutationFn: (body: Author) => authApi.updateProfile(body),
    });

    const form = useForm<ProfileRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: profile?.first_name || "",
            introduction: profile?.introduction || "",
            twitter_url: profile?.twitter_url || "",
            github_url: profile?.github_url || "",
            linkedin_url: profile?.linkedin_url || "",
            facebook_url: profile?.facebook_url || "",
            pinterest_url: profile?.pinterest_url || "",
            career: profile?.career || "",
            youtube_url: profile?.youtube_url || "",
            last_name: profile?.last_name || "",
            email: profile?.email || "",
        },
    });

    const onSubmit = async (values: ProfileRequest) => {
        profile &&
            updateProfileMutation.mutate({
                ...profile,
                ...values,
            });
    };

    useEffect(() => {
        if (
            updateProfileMutation.isSuccess &&
            updateProfileMutation.data.message === "Success"
        ) {
            setProfile(updateProfileMutation.data.data);
        }
    }, [updateProfileMutation.isSuccess]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-12 md:gap-8 gap-y-8">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
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
                            <FormItem className="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        placeholder="Last name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="career"
                        render={({ field }) => (
                            <FormItem className="sm:col-span-4 col-span-12">
                                <FormLabel>Career</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        placeholder="Career"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="introduction"
                        render={({ field }) => (
                            <FormItem className="col-span-12 sm:col-span-8">
                                <FormLabel>Introduction</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        rows={4}
                                        placeholder="Introduction"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-12 md:gap-8 gap-y-8">
                    <FormField
                        control={form.control}
                        name="facebook_url"
                        render={({ field }) => (
                            <FormItem className="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormLabel>Facebook URL</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        placeholder="Facebook URL"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="github_url"
                        render={({ field }) => (
                            <FormItem className="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormLabel>Github URL</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        placeholder="Github URL"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="linkedin_url"
                        render={({ field }) => (
                            <FormItem className="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormLabel>Linkedin URL</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        placeholder="Linkedin URL"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pinterest_url"
                        render={({ field }) => (
                            <FormItem className="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormLabel>Pinterest URL</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        placeholder="Pinterest URL"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="twitter_url"
                        render={({ field }) => (
                            <FormItem className="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormLabel>Twitter URL</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        placeholder="Twitter URL"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="youtube_url"
                        render={({ field }) => (
                            <FormItem className="md:col-span-4 sm:col-span-6 col-span-12">
                                <FormLabel>Youtube URL</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={
                                            updateProfileMutation.isPending
                                        }
                                        placeholder="Youtube URL"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-4">
                    <Button
                        disabled={updateProfileMutation.isPending}
                        type="reset"
                        variant="secondary"
                    >
                        Reset
                    </Button>
                    <ButtonLoading
                        type="submit"
                        disabled={
                            updateProfileMutation.isPending ||
                            !form.formState.isDirty ||
                            !form.formState.isValid
                        }
                        isLoading={updateProfileMutation.isPending}
                    >
                        Save
                    </ButtonLoading>
                </div>
            </form>
        </Form>
    );
};

export default ProfileForm;
