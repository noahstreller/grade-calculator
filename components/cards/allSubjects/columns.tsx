"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import createTranslation from "next-translate/createTranslation";

import { ColoredGrade } from "@/components/colored-grade";
import { Button } from "@/components/ui/button";
import { AverageWithSubject, Empty } from "@/types/types";
;

export function columns(setSubjectToDelete: any): ColumnDef<AverageWithSubject>[] {
  const { t, lang } = createTranslation("common");

  return [
    {
      id: "subjectName",
      accessorKey: "subject.name",
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
      }
    },
    {
      accessorKey: "average.gradeAverage",
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

        let value: number | Empty = row.original.average?.gradeAverage;
        // value = round(value, appGlobals.gradeDecimals);
        return <ColoredGrade grade={value} />;
      },
    },
    {
      id: "actions",
      // cell: ({ row }) => {
      //   let gradeAverage: Average = row.original;
      //   let isDesktop: boolean = !isMobile;

      //   if (isDesktop) {
      //     return (
      //       <DialogTrigger asChild>
      //         <Button
      //           onClick={() => setSubjectToDelete(gradeAverage.subject)}
      //           className="h-8 w-8 p-0"
      //           variant="ghost"
      //         >
      //           <Trash className="h-4 w-4" />
      //         </Button>
      //       </DialogTrigger>
      //     );
      //   }

      //   return (
      //     <DrawerTrigger asChild>
      //       <Button
      //         onClick={() => setSubjectToDelete(gradeAverage.subject)}
      //         className="h-8 w-8 p-0"
      //         variant="ghost"
      //       >
      //         <Trash className="h-4 w-4" />
      //       </Button>
      //     </DrawerTrigger>
      //   );
      // },
    },
  ];
}
