"use client"
import Grade from "@/lib/entities/grade";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCheck, Copy } from "lucide-react";
import createTranslation from 'next-translate/createTranslation';
 
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


export function columns(): ColumnDef<Grade>[] {
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
            accessorKey: "weight",
            header: ({ column }) => {
                return (
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    {t('grades.weight')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            }
        },
        {
            accessorKey: "value",
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

                if(Grade.doesGradePass(row.getValue("value"))) {
                    return (
                        <span className="text-green-400">{row.getValue("value")}</span>
                    )
                }
                return (
                    <span className="text-red-400">{row.getValue("value")}</span>
                )
            }
        },
        {
            accessorKey: "date",
            header: t('grades.date'),
            cell: ({ row }) => {
                return new Date(row.getValue("date")).toLocaleString(lang);
            }
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const grade = row.original
                const gradeInfo = grade.getGradeInformation()
            
                return (
                    <Button
                    
                    variant="outline"
                    className="h-8 w-8 p-0" 
                    onClick={() => {
                        navigator.clipboard.writeText(gradeInfo);
                        toast(t("actions.copy.success"), {
                            description: gradeInfo,
                            action: {
                              label: <CheckCheck className="h-5 w-5" />,
                              onClick: () => void 0,
                            },
                          })
                    }}
                    >
                        <span className="sr-only">Open menu</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                )
            },
        },
    ]

}