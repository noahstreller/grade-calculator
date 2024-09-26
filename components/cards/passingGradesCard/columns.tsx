"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { ColoredGrade } from "@/components/colored-grade";
import { SubjectGradeBadge } from "@/components/subject-grade-badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, truncateText } from "@/lib/utils";
import { AverageWithSubject, Empty } from "@/types/types";
import { isMobile } from "react-device-detect";
export function columns(translations: any): ColumnDef<AverageWithSubject>[] {
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
            {translations.grades.subject}
            {column.getIsSorted() ? (
              column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-2 h-4 w-4" />
              )
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/50" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        let subject: string = row.original.subject.name || "";
        let isIrrelevant: boolean = row.original.subject.weight === 0;
        let truncated: boolean = truncateText(
          subject,
          isMobile ? 16 : 20
        ).truncated;
        let truncatedSubject: string = truncateText(
          subject,
          isMobile ? 16 : 20
        ).text;

        if (truncated) {
          return (
            <>
              <SubjectGradeBadge
                average={row.original}
                className="mr-1"
                hideText
              />
              <Popover>
                <PopoverTrigger
                  className={cn(
                    "text-left text-wrap break-words max-w-40",
                    isIrrelevant && "text-muted-foreground"
                  )}
                >
                  {truncatedSubject}
                </PopoverTrigger>
                <PopoverContent className="w-fit max-w-80 text-wrap break-words">
                  <p>{subject}</p>
                </PopoverContent>
              </Popover>
            </>
          );
        }
        return (
          <>
            <SubjectGradeBadge
              average={row.original}
              className="mr-1"
              hideText
            />
            <span className={isIrrelevant ? "text-muted-foreground" : ""}>
              {subject}
            </span>
          </>
        );
      },
    },
    {
      id: "grade",
      accessorKey: "average.gradeAverage",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {translations.grades.grade}
            {column.getIsSorted() ? (
              column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-2 h-4 w-4" />
              )
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground/50" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        let value: number | Empty = row.original.average?.gradeAverage;
        return <ColoredGrade grade={value} />;
      },
    },
  ];
}
