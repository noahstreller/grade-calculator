"use client"
import Grade from "@/lib/entities/grade"
import { ColumnDef } from "@tanstack/react-table"
import createTranslation from 'next-translate/createTranslation';
import { Copy, MoreHorizontal } from "lucide-react"
 
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


export function columns(): ColumnDef<Grade>[] {
    const { t, lang } = createTranslation('common');

    return [
        {
            accessorKey: "subject",
            header: t('grades.subject'),
        },
        {
            accessorKey: "weight",
            header: t('grades.weight'),
        },
        {
            accessorKey: "value",
            header: t('grades.grade'),
        },
        {
            accessorKey: "date",
            header: t('grades.date'),
            cell: ({ row }) => {
                return new Date(row.getValue("date")).toLocaleDateString(lang);
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
                              label: "Undo",
                              onClick: () => console.log("Undo"),
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