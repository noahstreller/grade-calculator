import { getDateOrDateTimeLong } from "@/lib/utils";
import { CookieIcon } from "lucide-react";

export const Maintenance = ({
  maintenance,
}: {
  maintenance?: MaintenanceType;
}) => {
  return (
    <div className="w-screen">
      <div className="w-10/12 m-auto fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
        <div className="items-center gap-24 flex flex-col">
          <div className="items-start gap-4 flex flex-col">
            <h2 className="text-4xl font-bold tracking-tight text-muted-foreground sm:text-6xl">
              No
            </h2>
            <h1 className="text-6xl font-bold tracking-tight text-white-900 sm:text-8xl">
              Grade
              <br />
              Calculator
            </h1>
            <h2 className="text-4xl font-bold tracking-tight text-muted-foreground sm:text-6xl">
              Today
            </h2>
          </div>
          <p className="text-sm sm:text-lg text-muted-foreground font-mono text-center">
            {maintenance?.message ?? "Fixing some bugs, we will be back soon!"}
            <br />
            <br />
            This might take a moment. Here is a cookie for now
            <CookieIcon className="size-4 inline ml-2" />
            <br />
            <br />
            {maintenance?.until && (
              <>
                Please check back:{" "}
                <span className="text-foreground">
                  {getDateOrDateTimeLong(maintenance.until)}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export type MaintenanceType = {
  maintenance: boolean;
  until?: Date;
  message?: string;
};
