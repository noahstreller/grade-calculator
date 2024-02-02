"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import createTranslation from 'next-translate/createTranslation';
 
import { Button } from "@/components/ui/button";
import { GradeAverage } from "@/lib/entities/gradeAverage";
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
                let value: number = row.getValue("gradeAverage");
                value = round(value, appGlobals.gradeDecimals);

                return (
                    <span className="text-green-400">{value}</span>
                )
            }
        },
    ]

}