"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import appGlobals from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import { addGradeToast } from "@/lib/toasts";
import { cn, truncateText } from "@/lib/utils";
import useTranslation from "next-translate/useTranslation";
import {
  useEffect,
  useState
} from "react";
import { Asterisk } from "./ui/asterisk";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export function CreateGradeForm({
  subjectSet,
  refresh,
  setDrawerOpen
}: {
  subjectSet: Set<string>;
  refresh: Function;
  setDrawerOpen: Function;
}) {
  const { t, lang } = useTranslation("common");

  const initial: string[] = [];

  const [subjects, setSubjects] = useState(initial);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    subjectSet.forEach((subj) => {
      setSubjects((subjects) => [...subjects, subj]);
    });
  }, [subjectSet]);

  const FormSchema = z.object({
    subject: z.string({
      required_error: t("errors.required"),
    }),
    grade: z
      .number({
        invalid_type_error: t("errors.invalid-type.number"),
        required_error: t("errors.required"),
      })
      .gte(appGlobals.minimumGrade)
      .lte(appGlobals.maximumGrade),
    weight: z
      .number({
        invalid_type_error: t("errors.invalid-type.number"),
      })
      .gte(0)
      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const gradeAsNumber = Number(data.grade);
    const weightAsNumber = Number(data.weight) || 1;

    let grade = new Grade(gradeAsNumber, data.subject, weightAsNumber);
    addGradeToast(grade);
    refresh();
    if (!appGlobals.newEntitySheetShouldStayOpen) setDrawerOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-5">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                {t("subjects.subject")}
                <Asterisk className="ml-1" />
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? truncateText(
                            subjects.find(
                              (subject) => subject === field.value
                            ) ?? "",
                            20
                          ).text
                        : "Select subject"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder={t("subjects.search")} />
                    <ScrollArea className="h-fit max-h-[50vh] overflow-auto">
                      <CommandGroup>
                        {subjects.length === 0 ? (
                          <CommandItem disabled>No subjects found</CommandItem>
                        ) : (
                          subjects.map((subject) => (
                            <CommandItem
                              value={subject}
                              key={subject}
                              onSelect={() => {
                                form.setValue("subject", subject);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  subject === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {subject}
                            </CommandItem>
                          ))
                        )}
                      </CommandGroup>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("grades.grade")}
                <Asterisk className="ml-1" />
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder={t("grades.add-placeholder")}
                  {...field}
                  onChange={(e) => {
                    if (e.target.value === "") field.onChange("");
                    else field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("grades.weight")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder={t("grades.weight-placeholder")}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
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
