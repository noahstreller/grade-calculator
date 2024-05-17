import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function CardBoard({
  children,
  row,
  column = true,
  className = "",
}: {
  children: ReactNode;
  row?: boolean;
  className?: string;
  column?: boolean;
}) {
  const cardboardClasses =
    "flex items-start justify-center gap-5 [&>*]:w-full [&>*]:max-w-[90vw] max-w-[95vw]";

  if (row) {
    return (
      <div className={cn(cardboardClasses, "flex-row", className)}>
        {children}
      </div>
    );
  }
  if (column) {
    return (
      <div className={cn(cardboardClasses, "flex-col", className)}>
        {children}
      </div>
    );
  }
  return <div className={cn(cardboardClasses, className)}>{children}</div>;
}
