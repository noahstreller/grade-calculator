"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import createTranslation from "next-translate/createTranslation";

import { SubjectNameRow } from "@/components/cards/allSubjects/subject-name-row";
import { Button } from "@/components/ui/button";
import appGlobals from "@/lib/app.globals";
import { round } from "@/lib/utils";
import { Average } from "@/types/types";

export function columns(setSubjectToDelete: any): ColumnDef<Average>[] {
  const { t, lang } = createTranslation("common");

  return [
    {
      accessorKey: "subjectId",
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
        const original = row.original;
        return <SubjectNameRow row={original} />;
      }
      // cell: ({ row }) => {
      //   let subject: Subject = catchProblem(await getSubjectById(row.original.subjectId));
      //   let truncated: boolean = truncateText(subject.name!, 20).truncated;
      //   let truncatedSubject: string = truncateText(subject.name!, 20).text;

      //   if (truncated) {
      //     return (
      //       <TooltipProvider>
      //         <Tooltip>
      //           <TooltipTrigger className="ml-4 text-left">
      //             {truncatedSubject}
      //           </TooltipTrigger>
      //           <TooltipContent>
      //             <p>{subject.name}</p>
      //           </TooltipContent>
      //         </Tooltip>
      //       </TooltipProvider>
      //     );
      //   }
      //   return <p className="ml-4">{subject.name}</p>;
      // },
    },
    {
      accessorKey: "gradeAverage",
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
        let subject: string = row.getValue("subject");
        let value: number = row.getValue("gradeAverage");
        value = round(value, appGlobals.gradeDecimals);

        // if (Subjects.doesSubjectPass(subject)) {
        //   return <p className="text-green-400 ml-4">{value}</p>;
        // }
        // if (Subjects.doesSubjectFail(subject)) {
        //   return <p className="text-red-400 ml-4">{value}</p>;
        // }
        return <p className="text-red-400 ml-4">{value}</p>;

        return <p className="text-gray-600 ml-4">{t("grades.notfound")}</p>;
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
