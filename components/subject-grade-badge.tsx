"use client";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { truncateText } from "@/lib/utils";
import { AverageWithSubject } from "@/types/types";
import useTranslation from "next-translate/useTranslation";

export const SubjectGradeBadge = ({
  average,
  className,
  hideText = false,
}: {
  average: AverageWithSubject;
  className?: string;
  hideText?: boolean;
}) => {
  const { t } = useTranslation("common");
  const averageGrade = average.average?.gradeAmount ?? 0;
  const truncatedGrade = truncateText(averageGrade.toString(), 3).text;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className}>
          <Badge variant="secondary" className={className}>
            {`${truncatedGrade} ${
              hideText
                ? ""
                : t("grades.grades", { count: average.average?.gradeAmount })
            }`}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>Grade Count</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
