import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export function DetailRow({
  title,
  value,
  className,
}: {
  title: ReactNode;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-row justify-between items-center w-full py-2 border-b",
        className
      )}
    >
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-sm text-foreground font-bold">{value}</div>
    </div>
  );
}

export function DetailRowBoolean({
  title,
  value,
  className,
  variant = "true-false",
}: {
  title: ReactNode;
  value: boolean;
  className?: string;
  variant?: "true-false" | "yes-no";
}) {
  const t = useTranslations();
  return (
    <div
      className={cn(
        "flex flex-row justify-between items-center w-full py-2 border-b",
        className
      )}
    >
      <div className="text-sm text-muted-foreground">{title}</div>
      <div
        className={cn(
          "text-sm font-bold",
          value ? "text-green-400" : "text-red-400"
        )}
      >
        {value
          ? variant === "yes-no"
            ? t("generic.yes")
            : t("generic.true")
          : variant === "yes-no"
          ? t("generic.no")
          : t("generic.false")}
      </div>
    </div>
  );
}
