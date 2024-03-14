import { useEffect } from "react";

export const useOutsideHook = (refs, toggleVisibility) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        refs.every(
          (ref) =>
            ref.current &&
            !ref.current.contains(event.target) &&
            !event.target.closest(".MuiDateCalendar-root")
        )
      ) {
        toggleVisibility();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, toggleVisibility]);
};
