import { useEffect, useRef } from "react";

/**
 * Attach to a wrapper element to close dropdowns/menus when the user clicks
 * elsewhere or presses Escape.
 */
export const useClickOutside = (onClose, active = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active) return;

    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, active]);

  return ref;
};
