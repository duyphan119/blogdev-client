"use client";

import articleApi from "@/api/article-api";
import categoryApi from "@/api/category-api";
import uploadApi from "@/api/upload-api";
import ButtonLoading from "@/components/common/button/button-loading";
import MarkdownPreview from "@/components/markdown/markdown-preview";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatTitle } from "@/lib/utils";
import { Article } from "@/types/article";
import useUserStore from "@/zustand/use-user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ArticlePreview from "./article-preview";

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
  approved: z.boolean(),
  is_public: z.boolean(),
});

export type ArticleRequest = z.infer<typeof formSchema>;

type Props = {
  article?: Article;
};

const ArticleForm = ({ article }: Props) => {
  const router = useRouter();

  const { profile } = useUserStore();

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const form = useForm<ArticleRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: article?.content || "",
      title: article?.title || "",
      category: {
        id: article?.category.id || 0,
      },
      image_url: article?.image_url || "",
      introduction_text: article?.introduction_text || "",
      approved: article?.approved || false,
      is_public: article?.is_public || false,
    },
  });

  const query = useQuery({
    queryKey: ["category-list"],
    queryFn: () =>
      categoryApi.paginate({
        sort_by: "name",
        sort_type: "asc",
      }),
  });

  const createArticleMutation = useMutation({
    mutationFn: (body: ArticleRequest) =>
      article
        ? articleApi.update({
            ...article,
            ...body,
          } as Article)
        : articleApi.create(body),
    onSuccess: async (response) => {
      router.back();
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
    if (query.data) {
      return query.data.data.rows.map((category) => {
        return (
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.name}
          </SelectItem>
        );
      });
    }
    return null;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {isPreviewMode ? (
          <>
            <ArticlePreview
              content={form.getValues("content")}
              imageUrl={form.getValues("image_url")}
              introductionText={form.getValues("introduction_text")}
              {...(profile
                ? {
                    author: {
                      id: profile.id,
                      fullName: profile.full_name,
                    },
                  }
                : {})}
              {...(() => {
                const category = query.data?.data.rows.find(
                  (item) => item.id === form.getValues("category.id")
                );
                if (!category) return {};
                return {
                  category: {
                    slug: category.slug,
                    name: category.name,
                  },
                };
              })()}
              createdAt={moment(Date.now()).format("MMM D, YYYY H:m A")}
              title={form.getValues("title")}
            />
          </>
        ) : (
          <>
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
                    <SelectContent>{showCategoryList()}</SelectContent>
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
                  <Input {...field} className={cn(!field.value && "hidden")} />
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
                      disabled={createArticleMutation.isPending}
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
                      disabled={createArticleMutation.isPending}
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
                      disabled={createArticleMutation.isPending}
                      placeholder="Content"
                      rows={30}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="flex items-center gap-4">
          {isPreviewMode ? (
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsPreviewMode(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                type="reset"
                disabled={
                  createArticleMutation.isPending || form.formState.isSubmitting
                }
                variant="secondary"
              >
                Reset
              </Button>
              <Button
                type="button"
                disabled={form.formState.isSubmitting}
                variant="outline"
                onClick={() => setIsPreviewMode(true)}
              >
                Preview
              </Button>
            </>
          )}
          <ButtonLoading
            isLoading={createArticleMutation.isPending}
            disabled={
              createArticleMutation.isPending || form.formState.isSubmitting
            }
            type="submit"
          >
            {article ? "Update" : "Create"}
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
};

export default ArticleForm;
