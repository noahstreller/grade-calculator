"use client";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { truncateText } from "@/lib/utils";

export const GradeWeightBadge = ({
  weight,
  className,
  hideOne = true,
}: {
  weight: number;
  className?: string;
  hideOne?: boolean;
}) => {
  const truncatedWeight = truncateText(weight.toString(), 5);
  return (
    !hideOne ||
    (weight != 1 && (
      <Popover>
        <PopoverTrigger className={className}>
          <Badge variant="secondary" className={className}>
            {truncatedWeight.truncated ? null : "×"} {truncatedWeight.text}
          </Badge>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          This grade is weighted <b>{weight}</b>
        </PopoverContent>
      </Popover>
    ))
  );
};
