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
                                <TooltipTrigger>{truncatedSubject}</TooltipTrigger>
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
                let value: number = row.getValue("value");
                value = round(value, appGlobals.gradeDecimals);

                if(Grade.doesGradePass(value)) {
                    return (
                        <span className="text-green-400">{value}</span>
                    )
                }
                return (
                    <span className="text-red-400">{value}</span>
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