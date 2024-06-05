import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function CardBoard({
  children,
  row,
  className = "",
  reverse = false,
}: {
  children: ReactNode;
  row?: boolean;
  className?: string;
  reverse?: boolean;
}) {
  const column = !row;
  const cardboardClasses =
    "flex items-start justify-center gap-5 [&>*]:w-full [&>*]:max-w-[90vw] max-w-[95vw]";

  const orientation = () => {
    if (reverse) return column ? "flex-col-reverse" : "flex-row-reverse";
    return column ? "flex-col" : "flex-row";
  };

  return (
    <div className={cn(cardboardClasses, orientation(), className)}>
      {children}
    </div>
  );
}
