import { useEffect, useState } from "react";

type Options = {
  updateInterval?: number;
};

export default function useNow(options?: Options): Date {
  const { updateInterval } = options || {};

  // Get the initial time (static value at mount)
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    // If no updateInterval is provided, return the static value
    if (!updateInterval) {
      return;
    }

    // Set up an interval to update the time periodically
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, updateInterval);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [updateInterval]);

  // Return the current time (either static or updated after intervals)
  return now;
}
