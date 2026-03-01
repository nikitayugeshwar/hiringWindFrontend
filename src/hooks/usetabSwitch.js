import { useEffect, useState } from "react";

export const useTabSwitch = () => {
  const [violations, setViolations] = useState(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tab or minimized browser
        setViolations((prev) => prev + 1);
        alert("Warning: Switching tabs is not allowed!");
        // Add logic to pause exam here
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { violations, setViolations };
};
