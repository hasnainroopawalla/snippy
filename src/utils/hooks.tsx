import * as React from "react";
import { getMsUntilNextMinute } from "./date";

const ONE_MINUTE_IN_MS = 60000;

/**
 * A hook that triggers an update at the exact minute.
 * Returns a "token" that can be used as a dependency to trigger re-renders.
 */
export const useMinuteTick = () => {
  const [val, setVal] = React.useState<number>(0);

  React.useEffect(() => {
    const update = () => setVal(prev => 1 - prev);

    const msUntilNextMinute = getMsUntilNextMinute();

    const timeout = setTimeout(() => {
      // update the state at the first minute tick.
      update();
      const interval = setInterval(() => {
        // update the state at every subsequent (exact) minute tick.
        update();
      }, ONE_MINUTE_IN_MS);

      return () => clearInterval(interval);
    }, msUntilNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  return val;
};
