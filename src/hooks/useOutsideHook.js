import { useEffect } from "react";

export const useOutsideHook = (ref, toggleVisibility, ignoreSelectors = []) => {
  useEffect(() => {
    function handleClickOutside(event) {
      const isInsideIgnoredElement = ignoreSelectors.some((selector) =>
        event.target.closest(selector)
      );

      if (isInsideIgnoredElement) {
        return;
      }

      if (
        ref.current &&
        !ref.current.contains(event.target)
        // !event.target.closest(".MuiDateCalendar-root")
      ) {
        toggleVisibility(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, toggleVisibility]);
};
