"use client";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { truncateText } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const GradeWeightBadge = ({
  weight,
  className,
  hideOne = true,
}: {
  weight: number;
  className?: string;
  hideOne?: boolean;
}) => {
  const t = useTranslations();
  const truncatedWeight = truncateText(weight.toString(), 5);
  return (
    !hideOne ||
    (weight != 1 && (
      <Popover>
        <PopoverTrigger className={className}>
          <Badge variant="secondary" className={className}>
            {truncatedWeight.truncated ? null : t("generic.multiplication")}{" "}
            {truncatedWeight.text}
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          {t.rich("grades.badge-weight", {
            weight: () => <b>{weight}</b>,
          })}
        </PopoverContent>
      </Popover>
    ))
  );
};
