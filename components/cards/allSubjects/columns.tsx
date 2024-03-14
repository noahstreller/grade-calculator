"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash } from "lucide-react";
import createTranslation from 'next-translate/createTranslation';
 
import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import appGlobals from "@/lib/app.globals";
import { GradeAverage } from "@/lib/entities/gradeAverage";
import Subjects from "@/lib/entities/subject";
import { round, truncateText } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { isMobile } from "react-device-detect";


export function columns(setSubjectToDelete: any): ColumnDef<GradeAverage>[] {
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
                                <TooltipTrigger className="ml-4 text-left">{truncatedSubject}</TooltipTrigger>
                                <TooltipContent>
                                    <p>{subject}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )
                }
                return (
                    <p className="ml-4">{subject}</p>
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
        {
            id: "actions",
            cell: ({ row }) => {
                let gradeAverage: GradeAverage = row.original;
                let isDesktop: boolean = !isMobile

                if (isDesktop) {
                    return (
                        <DialogTrigger asChild>
                          <Button onClick={()=>setSubjectToDelete(gradeAverage.subject)} className="h-8 w-8 p-0" variant="ghost"><Trash className="h-4 w-4" /></Button>
                        </DialogTrigger>
                    );
                    }
                
                return (
                    <DrawerTrigger asChild>
                        <Button onClick={()=>setSubjectToDelete(gradeAverage.subject)} className="h-8 w-8 p-0" variant="ghost"><Trash className="h-4 w-4" /></Button>
                    </DrawerTrigger>
                    
                );
            },
        },
    ]

}