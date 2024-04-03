"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import appGlobals from "@/lib/app.globals";
import Subjects from "@/lib/entities/subject";
import { catchProblem } from "@/lib/problem";
import { quickCreateSubject } from "@/lib/services/subject-service";
import { addSubjectToast } from "@/lib/toasts";
import useTranslation from "next-translate/useTranslation";
import { Asterisk } from "./ui/asterisk";
import { Input } from "./ui/input";

export function CreateSubjectForm({ refresh, setOpen }: { refresh: Function, setOpen: Function}) {
  const { t, lang } = useTranslation("common");

  type FormValues = {
    subject: string;
  }

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
    subject: ""
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let subject = Subjects.add(data.subject);

    catchProblem(await quickCreateSubject(subject));

    form.reset(defaultValues);
    form.setFocus("subject");
    addSubjectToast(subject);
    refresh();
    if (!appGlobals.newEntitySheetShouldStayOpen) setOpen(false);
  }

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

        <Button className="w-full" type="submit">
          {t("actions.submit")}
        </Button>
      </form>
    </Form>
  );
}
