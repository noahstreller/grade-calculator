"use client";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const truncatedWeight = truncateText(weight.toString(), 3);
  return (
    !hideOne ||
    (weight != 1 && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className={className}>
            <Badge variant="secondary" className={className}>
              {truncatedWeight.truncated ? null : "×"} {truncatedWeight.text}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Weight</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ))
  );
};
