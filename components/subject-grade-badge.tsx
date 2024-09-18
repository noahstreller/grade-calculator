"use client";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { truncateText } from "@/lib/utils";
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
        {averageGrade === weightedAmount
          ? averageGrade === 0
            ? t.rich("subjects.badge-noweight-empty", {
                b: () => <b>{weightedAmount}</b>,
              })
            : t.rich("subjects.badge-noweight-not-empty", {
                weightedAmount: () => <b>{weightedAmount}</b>,
                gradeSum: () => <b>{gradeSum}</b>,
                count: averageGrade,
              })
          : t.rich("subjects.badge-weight-not-empty", {
              averageGrade: () => <b>{averageGrade}</b>,
              weightedAmount: () => <b>{weightedAmount}</b>,
              gradeSum: () => <b>{gradeSum}</b>,
              count: averageGrade,
            })}
      </PopoverContent>
    </Popover>
  );
};
