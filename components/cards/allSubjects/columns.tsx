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

                if(Subjects.doesSubjectPass(row.getValue("subject"))) {
                    return (
                        <span className="text-green-400">{row.getValue("gradeAverage")}</span>
                    )
                }
                if(Subjects.doesSubjectFail(row.getValue("subject"))) {
                    return (
                        <span className="text-red-400">{row.getValue("gradeAverage")}</span>
                    )
                }
                return (
                    <span className="text-gray-600">{t("grades.notfound")}</span>
                )
            }
        },
    ]

}