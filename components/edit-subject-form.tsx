"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

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
  const { t, lang } = useTranslation("common");
  const preferences = usePreferences().preferences!;
  const [submitting, setSubmitting] = useState(false);

  type FormValues = {
    subject: string;
  };

  const FormSchema = z.object({
    subject: z
      .string({
        required_error: t("errors.required"),
      })
      .trim()
      .min(1, { message: t("errors.required") })
      .max(255),
  });

  const defaultValues: DefaultValues<FormValues> = {
    subject: originalSubject?.name || "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmitting(true);
    let newSubject = { ...originalSubject, name: data.subject } as Subject;
    let subjectName: string = catchProblem(
      await updateSubject(newSubject)
    );

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

        <Button className="w-full" type="submit" disabled={submitting}>
          {submitting ? <LoadingSpinner /> : t("actions.submit")}
        </Button>
      </form>
    </Form>
  );
}
