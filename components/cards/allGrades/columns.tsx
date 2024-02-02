"use client"
import Grade from "@/lib/entities/grade";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCheck, Copy } from "lucide-react";
import createTranslation from 'next-translate/createTranslation';
 
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ReactNode } from "react";
import appGlobals from "@/lib/app.globals";
import { round, truncateText } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


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
                let value: number = row.getValue("value");
                value = round(value, appGlobals.gradeDecimals);

                if(Grade.doesGradePass(value)) {
                    return (
                        <p className="text-green-400 ml-4">{value}</p>
                    )
                }
                return (
                    <p className="text-red-400 ml-4">{value}</p>
                )
            }
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
            },
            cell: ({ row }) => {
                let weight: number = row.getValue("weight");

                return (
                    <p className="ml-4">{weight}</p>
                )
            }
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    {t('grades.date')}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                let date = new Date(row.getValue("date")).toLocaleString(lang);

                return (
                    <p className="ml-4">{date}</p>
                )
            }
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const grade = row.original
                const gradeInfo = grade.getGradeInformation()
            
                return (
                    <Button
                    
                    variant="ghost"
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
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                )
            },
        },
    ]

}