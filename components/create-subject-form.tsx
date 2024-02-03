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
import Subjects from "@/lib/entities/subject";
import useTranslation from "next-translate/useTranslation";
import { toast } from "sonner";
import { Asterisk } from "./ui/asterisk";
import { Input } from "./ui/input";

export function CreateSubjectForm({ refresh }: { refresh: Function }) {
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    Subjects.add(data.subject);
    form.reset(defaultValues);
    form.setFocus("subject");
    toast(t("actions.copy.success"), {
      description: "a",
      action: {
        label: "Got it",
        onClick: () => void 0,
      },
    })
    refresh();
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
