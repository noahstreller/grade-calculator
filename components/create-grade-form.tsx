"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { TimePicker } from "@/components/ui/time-picker";
import { NewGrade, Subject } from "@/db/schema";
import appGlobals from "@/lib/app.globals";
import { catchProblem } from "@/lib/problem";
import { addGrade } from "@/lib/services/grade-service";
import { getAllSubjects } from "@/lib/services/subject-service";
import { cn, truncateText } from "@/lib/utils";
import { format } from "date-fns";
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

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  // useEffect(() => {
  //   subjectSet.forEach((subj) => {
  //     setSubjects((subjects) => [...subjects, subj]);
  //   });
  // }, [subjectSet]);

  useEffect(() => {
    const fetchData = async() => {
      const data = catchProblem(await getAllSubjects());
      console.table(data)
      setSubjects([...data])
    }
    fetchData();
  }, []);

  const FormSchema = z.object({
    subject: z.number({
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
    date: z.date().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const gradeAsNumber = Number(data.grade);
    const weightAsNumber = Number(data.weight) || 1;

    const gradeIguess: NewGrade = {
      date: data.date,
      weight: data.weight,
      value: data.grade,
      subject_fk: data.subject
    };

    catchProblem(await addGrade(gradeIguess));


    // let grade = new Grade(undefined, gradeAsNumber, data.subject, weightAsNumber, data.date);
    // addGradeToast(grade);
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
                              (subject) => subject.id === field.value
                            )?.name ?? "",
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
                          <CommandItem disabled>
                            {t("subjects.notfound")}
                          </CommandItem>
                        ) : (
                          subjects.map((subject) => (
                            <CommandItem
                              value={subject.name!}
                              key={subject.id}
                              onSelect={() => {
                                form.setValue("subject", subject.id!);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  subject.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {subject.name}
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

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("grades.date")}</FormLabel>
              <br />
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "max-w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {date ? (
                        format(date, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date (optional)</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      {...field}
                      mode="single"
                      selected={date}
                      onSelect={(value) => {
                        setDate(value);
                        field.onChange(value);
                      }}
                      initialFocus
                    />
                    <div className="p-3 border-t border-border">
                      <TimePicker
                        {...field}
                        setDate={(value) => {
                          setDate(value);
                          field.onChange(value);
                        }}
                        date={date}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
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
