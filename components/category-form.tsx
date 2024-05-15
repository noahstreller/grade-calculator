"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

import { useCategory } from "@/components/category-provider";
import { usePreferences } from "@/components/preferences-provider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Category } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import {
  deleteCategory,
  insertCategory,
  updateCategory,
} from "@/lib/services/category-service";
import { addCategoryToast } from "@/lib/toasts";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Asterisk } from "./ui/asterisk";
import { Input } from "./ui/input";

export function CreateCategoryForm({ setOpen }: { setOpen: Function }) {
  const { t } = useTranslation("common");
  const categoryState = useCategory();
  const preferences = usePreferences().preferences!;
  const [submitting, setSubmitting] = useState(false);

  type FormValues = {
    category: string;
  };

  const FormSchema = z.object({
    category: z
      .string({
        required_error: t("errors.required"),
      })
      .trim()
      .min(1, { message: t("errors.required") })
      .max(255),
  });

  const defaultValues: DefaultValues<FormValues> = {
    category: "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmitting(true);
    const category = data.category;
    let inserted: Category = catchProblem(
      await insertCategory(category, false)
    );

    form.reset(defaultValues);
    form.setFocus("category");
    if (inserted) {
      categoryState.setCategories([...categoryState.categories, inserted]);
      addCategoryToast(category);
      setSubmitting(false);
    }
    if (!preferences.newEntitySheetShouldStayOpen) setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-5">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category Name
                <Asterisk className="ml-1" />
              </FormLabel>
              <FormControl>
                <Input placeholder={"Enter category"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={submitting}>
          {submitting ? <LoadingSpinner /> : t("actions.submit")}
        </Button>
      </form>
    </Form>
  );
}

export function EditCategoryForm({ setOpen }: { setOpen: Function }) {
  const { t } = useTranslation("common");
  const categoryState = useCategory();
  const [submitting, setSubmitting] = useState(false);

  async function handleDelete() {
    setSubmitting(true);
    let deleted: Category = catchProblem(
      await deleteCategory(categoryState.category!.id)
    );
    if (deleted) {
      categoryState.setCategories([
        ...categoryState.categories.filter(
          (category) => category.id !== categoryState.category?.id
        ),
      ]);
      setSubmitting(false);
    }
    setOpen(false);
  }

  type FormValues = {
    categoryName: string;
  };

  const FormSchema = z.object({
    categoryName: z
      .string({
        required_error: t("errors.required"),
      })
      .trim()
      .min(1, { message: t("errors.required") })
      .max(255),
  });

  const defaultValues: DefaultValues<FormValues> = {
    categoryName: categoryState.category?.name ?? "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [categoryState.category]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.categoryName === categoryState.category?.name) {
      setOpen(false);
      return;
    }
    setSubmitting(true);
    const newCategory: Category = {
      ...categoryState.category!,
      name: data.categoryName,
    };
    let inserted: Category = catchProblem(await updateCategory(newCategory));
    if (inserted) {
      categoryState.setCategories([
        ...categoryState.categories.filter(
          (c) => c.id !== categoryState.category?.id
        ),
        inserted,
      ]);
      setSubmitting(false);
    }
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-5">
        <FormField
          control={form.control}
          name="categoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category Name
                <Asterisk className="ml-1" />
              </FormLabel>
              <FormControl>
                <Input placeholder={"Enter category"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Button className="w-full" type="submit" disabled={submitting}>
            {submitting ? <LoadingSpinner /> : t("actions.submit")}
          </Button>

          <Button
            className="w-full"
            variant="destructive"
            disabled={submitting}
            onClick={handleDelete}
          >
            {submitting ? <LoadingSpinner /> : "Delete Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
