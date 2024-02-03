"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

import { cn, truncateText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Grade from "@/lib/entities/grade";
import { Input } from "./ui/input";
import appGlobals from "@/lib/app.globals";
import { ScrollArea } from "./ui/scroll-area";
import Subjects from "@/lib/entities/subject";
import { Asterisk } from "./ui/asterisk";

export function CreateSubjectForm({ refresh }: { refresh: Function }) {
  const { t, lang } = useTranslation("common");

  const FormSchema = z.object({
    subject: z
      .string({
        required_error: t("errors.required"),
      })
      .trim()
      .min(1, { message: t("errors.required") })
      .max(255),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    Subjects.add(data.subject);
    //toast(t("grades.add-success"));
    toast(data.subject);
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
