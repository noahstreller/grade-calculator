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
import { round } from "@/lib/utils";


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
                        <span className="text-green-400">{value}</span>
                    )
                }
                if(Subjects.doesSubjectFail(subject)) {
                    return (
                        <span className="text-red-400">{value}</span>
                    )
                }
                return (
                    <span className="text-gray-600">{t("grades.notfound")}</span>
                )
            }
        },
    ]

}