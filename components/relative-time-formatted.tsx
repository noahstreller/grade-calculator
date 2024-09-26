"use client";
import useNow from "@/lib/hooks/useNow";
import { useFormatter } from "next-intl";

export const RelativeTimeFormatted = ({
  date1,
  date2,
  now,
}: {
  date1: Date;
  date2?: Date;
  now?: boolean;
}) => {
  const format = useFormatter();
  const currentNow = useNow({
    updateInterval: 1000 * 15,
  });

  if (date2) {
    return format.relativeTime(date1, date2);
  }

  if (now) {
    return format.relativeTime(date1, currentNow);
  }

  return format.relativeTime(date1);
};
