"use client"
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, Trash } from "lucide-react";
import createTranslation from 'next-translate/createTranslation';
 
import { SubjectNameRow } from "@/components/cards/allGrades/subject-name-row";
import { Button } from "@/components/ui/button";
import { Grade } from "@/db/schema";
import appGlobals from "@/lib/app.globals";
import { deleteGradeToast } from "@/lib/toasts";
import { getDateOrDateTime, round } from "@/lib/utils";


export function columns(refresh: Function): ColumnDef<Grade>[] {
  const { t, lang } = createTranslation('common');

  return [
    {
      accessorKey: "subject_fk",
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
        const original = row.original
        return <SubjectNameRow row={original} />
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
        let value: number = row.original.value!;
        value = round(value, appGlobals.gradeDecimals);

        if(true) {
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
        let weight: number = row.original.weight!;

        return (
          <p className="ml-4">{weight}</p>
        )
      }
    },
    {
      id: "date",
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
        let date = getDateOrDateTime(row.original.date!);

        return (
          <p className="ml-4">{date}</p>
        )
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const grade = row.original
        // const gradeInfo = grade.getGradeInformation()
      
        return (
          <>
          <Button
          variant="ghost"
          className="h-8 w-8 p-0" 
          // onClick={() => {
          //   navigator.clipboard.writeText(gradeInfo);
          //   copySuccessToast(gradeInfo);
          // }}
          >
            <span className="sr-only">{t("actions.copy.prompt")}</span>
            <Copy className="h-4 w-4" />
          </Button>

          <Button
          variant="ghost"
          className="h-8 w-8 p-0" 
          onClick={() => {
            let gradeCopy = grade;
            // grade.delete();
            deleteGradeToast(gradeCopy, refresh);
            refresh();
          }}
          >
            <span className="sr-only">{t("actions.delete.prompt")}</span>
            <Trash className="h-4 w-4" />
          </Button>
          </>
        )
      },
    },
  ]

}