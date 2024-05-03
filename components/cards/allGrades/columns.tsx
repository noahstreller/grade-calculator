"use client"
import { ColumnDef } from "@tanstack/react-table";
import createTranslation from 'next-translate/createTranslation';
 
import { ColoredGrade } from "@/components/colored-grade";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GradeWithSubject } from "@/db/schema";
import { deleteGradeByGrade } from "@/lib/services/grade-service";
import { deleteGradeToast } from "@/lib/toasts";
import { getDateOrDateTime, truncateText } from "@/lib/utils";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { isMobile } from "react-device-detect";


export function columns(refresh: Function, setGradeToEdit: Function): ColumnDef<GradeWithSubject>[] {
  const { t, lang } = createTranslation('common');

  return [
    {
      id: "subjectName",
      accessorKey: "subjects.name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("grades.subject")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        let subject: string = row.original.subjects.name!;
        let truncated: boolean = truncateText(
          subject,
          isMobile ? 20 : 40
        ).truncated;
        let truncatedSubject: string = truncateText(
          subject,
          isMobile ? 20 : 40
        ).text;

        if (truncated) {
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-left ml-2">
                  {truncatedSubject}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{subject}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        }
        return <p className="ml-2">{subject}</p>;
      },
    },
    {
      accessorKey: "grades.value",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("grades.grade")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        let value: number = row.original.grades.value!;
        return <ColoredGrade grade={value} />
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
            {t("grades.weight")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        let weight: number = row.original.grades.weight!;

        return <p className="ml-4">{weight}</p>;
      },
    },
    {
      id: "date",
      sortingFn: "datetime",
      accessorKey: "grades.date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("grades.date")}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        let date = getDateOrDateTime(row.original.grades.date!);

        return <p className="ml-4">{date}</p>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const grade = row.original;

        return (
          <>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => {
                  setGradeToEdit(grade.grades);
                }}
              >
                <span className="sr-only">{t("actions.copy.prompt")}</span>
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => {
                let gradeCopy = grade.grades;
                deleteGradeByGrade(grade.grades);
                deleteGradeToast(gradeCopy, grade.subjects.name ?? "", refresh);
                refresh();
              }}
            >
              <span className="sr-only">{t("actions.delete.prompt")}</span>
              <Trash className="h-4 w-4" />
            </Button>
          </>
        );
      },
    },
  ];

}