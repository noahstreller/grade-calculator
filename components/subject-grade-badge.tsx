"use client";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getStringForAmount, truncateText } from "@/lib/utils";
import { AverageWithSubject } from "@/types/types";
import { useTranslations } from "next-intl";

export const SubjectGradeBadge = ({
  average,
  className,
  hideText = false,
}: {
  average: AverageWithSubject;
  className?: string;
  hideText?: boolean;
}) => {
  const t = useTranslations();
  const averageGrade = average.average?.gradeAmount ?? 0;
  const gradeSum = average.average?.gradeWeightedSum ?? 0;
  const weightedAmount = average.average?.gradeWeightedAmount ?? 0;
  const truncatedGrade = truncateText(averageGrade.toString(), 3).text;
  return (
    <Popover>
      <PopoverTrigger className={className}>
        <Badge variant="secondary" className={className}>
          {`${truncatedGrade} ${
            hideText
              ? ""
              : t("grades.grades", { count: average.average?.gradeAmount })
          }`}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-fit max-w-96 text-wrap">
        {averageGrade === weightedAmount ? (
          averageGrade === 0 ? (
            <>
              This subject contains <b>{weightedAmount}</b> grades
            </>
          ) : (
            <>
              This subject contains <b>{weightedAmount}</b>{" "}
              {getStringForAmount(averageGrade, "grade", "grades")} with a grade
              sum of <b>{gradeSum}</b>
            </>
          )
        ) : (
          <>
            This subject contains <b>{averageGrade}</b>{" "}
            {getStringForAmount(averageGrade, "grade", "grades")} with a total
            weight of <b>{weightedAmount}</b> and a grade sum of{" "}
            <b>{gradeSum}</b>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
