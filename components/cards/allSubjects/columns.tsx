"use client"
import Grade from "@/lib/entities/grade"
import { ColumnDef } from "@tanstack/react-table"
import createTranslation from 'next-translate/createTranslation';
import { ArrowUpDown, CheckCheck, Copy, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import Subjects from "@/lib/entities/subject";
import appGlobals from "@/lib/app.globals";
import { round, truncateText } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export function columns(): ColumnDef<GradeAverage>[] {
    const { t, lang } = createTranslation('common');

    return [
        {
            accessorKey: "subject",
            header: ({ column }) => {
                return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t('grades.subject')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
                )
            },
            cell: ({ row }) => {
                let subject: string = row.getValue("subject");
                let truncated: boolean = truncateText(subject, 20).truncated;
                let truncatedSubject: string = truncateText(subject, 20).text;

                if(truncated) {
                    return (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="ml-4">{truncatedSubject}</TooltipTrigger>
                                <TooltipContent>
                                    <p>{subject}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                }
                return (
                    <span>{subject}</span>
                )
            }
        },
        {
            accessorKey: "gradeAverage",
            header: ({ column }) => {
                return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t('grades.grade')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
                )
            },
            cell: ({ row }) => {
                let subject: string = row.getValue("subject");
                let value: number = row.getValue("gradeAverage");
                value = round(value, appGlobals.gradeDecimals);

                if(Subjects.doesSubjectPass(subject)) {
                    return (
                        <p className="text-green-400 ml-4">{value}</p>
                    )
                }
                if(Subjects.doesSubjectFail(subject)) {
                    return (
                        <p className="text-red-400 ml-4">{value}</p>
                    )
                }
                return (
                    <p className="text-gray-600 ml-4">{t("grades.notfound")}</p>
                )
            }
        },
    ]

}