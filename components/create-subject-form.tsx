"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

import { useCategory } from "@/components/category-provider";
import { usePreferences } from "@/components/preferences-provider";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/card-stack";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingSpinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { catchProblem } from "@/lib/problem";
import { quickCreateSubject } from "@/lib/services/subject-service";
import { addSubjectToast } from "@/lib/toasts";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Asterisk } from "./ui/asterisk";
import { Input } from "./ui/input";

export function CreateSubjectForm({
  refresh,
  setOpen,
}: {
  refresh: Function;
  setOpen: Function;
}) {
  const { t } = useTranslation("common");
  const preferences = usePreferences().preferences!;
  const [submitting, setSubmitting] = useState(false);
  const categoryState = useCategory();

  type FormValues = {
    subject: string;
    showInOverview: boolean;
  };

  const FormSchema = z.object({
    subject: z
      .string({
        required_error: t("errors.required"),
      })
      .trim()
      .min(1, { message: t("errors.required") })
      .max(255),
    showInOverview: z.boolean().default(true),
  });

  const defaultValues: DefaultValues<FormValues> = {
    subject: "",
    showInOverview: true,
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmitting(true);
    const subject = data.subject;
    const weight = data.showInOverview ? 1 : 0;
    try {
      let insertedId: number | undefined = catchProblem(
        await quickCreateSubject(subject, weight, categoryState.category?.id),
        true
      );

      form.reset(defaultValues);
      form.setFocus("subject");

      if (insertedId) {
        addSubjectToast(subject);
        setSubmitting(false);
      }
      refresh();
      if (!preferences.newEntitySheetShouldStayOpen) setOpen(false);
    } catch (e) {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-5">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("subjects.subject")}
                <Asterisk className="ml-1" />
              </FormLabel>
              <FormControl>
                <Input placeholder={t("subjects.add-placeholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showInOverview"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-1 justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Relevant for academic promotion
                </FormLabel>
                <FormDescription>
                  {field.value ? (
                    <>
                      This subject will be{" "}
                      <Highlight colorName="green">included</Highlight> while
                      calculating the total average
                    </>
                  ) : (
                    <>
                      This subject will be{" "}
                      <Highlight colorName="red">ignored</Highlight> while
                      calculating the total average
                    </>
                  )}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
