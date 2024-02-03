"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { string, z } from "zod"

import { cn, truncateText } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useTranslation from "next-translate/useTranslation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Grade from "@/lib/entities/grade"

export function ComboboxForm({subjectSet, refresh} : {subjectSet: Set<string>, refresh: Function}) {
    const { t, lang } = useTranslation('common');

    const initial: string[] = [];

    const [subjects, setSubjects] = useState(initial);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        subjectSet.forEach(subj => {
            setSubjects(subjects => [...subjects, subj])
        });
    }, [subjectSet]);
    
    const FormSchema = z.object({
        subject: z.string({
            required_error: t("errors.required"),
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        new Grade(3, data.subject);
        toast(t("grades.add-success"));
        refresh();
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Subject</FormLabel>
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
                        ? truncateText(subjects.find((subject) => subject === field.value) ?? "", 20).text
                        : "Select subject"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search subject..." />
                        <CommandEmpty>No subject found.</CommandEmpty>
                        <CommandGroup>
                        {subjects.map((subject) => (
                            <CommandItem
                            value={subject}
                            key={subject}
                            onSelect={() => {
                                form.setValue("subject", subject);
                                setOpen(false)
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
                        ))}
                        </CommandGroup>
                    </Command>
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit">Submit</Button>
        </form>
        </Form>
    )
}
