import { useEffect, useState } from "react";

export const useTabSwitch = () => {
  const [violations, setViolations] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tab or minimized the browser. The count is surfaced in
        // the interview header and session panel rather than a blocking alert,
        // which would also interrupt the recording.
        setViolations((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { violations, setViolations };
};
