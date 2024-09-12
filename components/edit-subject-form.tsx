"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

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
import { Subject } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import { updateSubject } from "@/lib/services/subject-service";
import { editSubjectToast } from "@/lib/toasts";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Asterisk } from "./ui/asterisk";
import { Input } from "./ui/input";

export function EditSubjectForm({
  refresh,
  setOpen,
  originalSubject,
}: {
  refresh: Function;
  setOpen: Function;
  originalSubject: Subject | undefined;
}) {
  const { t } = useTranslation("common");
  const [submitting, setSubmitting] = useState(false);

  type FormValues = {
    subject: string;
    showInOverview: boolean;
  };

  const FormSchema = z.object({
    subject: z
      .string({
        required_error: t("common.errors.required"),
      })
      .trim()
      .min(1, { message: t("common.errors.required") })
      .max(255),
    showInOverview: z.boolean(),
  });

  const defaultValues: DefaultValues<FormValues> = {
    subject: originalSubject?.name || "",
    showInOverview: originalSubject?.weight === 1,
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmitting(true);
    const weight = data.showInOverview ? 1 : 0;
    let newSubject = {
      ...originalSubject,
      name: data.subject,
      weight,
    } as Subject;
    let subjectName: string = catchProblem(await updateSubject(newSubject));

    form.reset(defaultValues);
    form.setFocus("subject");
    if (subjectName) {
      editSubjectToast(subjectName);
      setSubmitting(false);
    }
    refresh();

    setOpen(false);
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
                {t("common.subjects.subject")}
                <Asterisk className="ml-1" />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("common.subjects.add-placeholder")}
                  {...field}
                />
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
          {submitting ? <LoadingSpinner /> : t("common.actions.submit")}
        </Button>
      </form>
    </Form>
  );
}
