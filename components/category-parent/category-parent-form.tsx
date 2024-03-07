"use client";

import { CategoryParent } from "@/types/category-parent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ButtonLoading from "../common/button/button-loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryParentApi from "@/api/category-parent-api";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  categoryParent?: CategoryParent;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  description: z.string(),
});

export type CategoryParentRequest = z.infer<typeof formSchema>;

const CategoryParentForm = ({ categoryParent }: Props) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const form = useForm<CategoryParentRequest>({
    defaultValues: {
      name: categoryParent?.name ?? "",
      description: categoryParent?.description ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: (body: CategoryParentRequest) =>
      categoryParent
        ? categoryParentApi.update({
            ...categoryParent,
            ...body,
          })
        : categoryParentApi.create(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-category-parent-list"],
      });
      router.push("/admin/category-parent");
    },
  });

  const onSubmit = (values: CategoryParentRequest) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4">
          <Button
            type="reset"
            disabled={mutation.isPending || form.formState.isSubmitting}
            variant="secondary"
          >
            Reset
          </Button>
          <ButtonLoading
            isLoading={mutation.isPending}
            disabled={mutation.isPending || form.formState.isSubmitting}
            type="submit"
          >
            {categoryParent ? "Update" : "Create"}
          </ButtonLoading>
        </div>
      </form>
    </Form>
  );
};

export default CategoryParentForm;
