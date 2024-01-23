import { useEffect } from "react";

const useTrapFocus = (ref, active, onActive, focusIndex = 0) => {
  useEffect(() => {
    if (!ref.current) return;
    if (active) {
      const Element = ref.current;
      // 所有可聚焦的元素
      const focusableElements = Element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // 有可聚焦的元素時，聚焦指定元素
      if (focusableElements.length > 0) {
        focusIndex !== "last" ? focusableElements[focusIndex].focus() : lastElement.focus();
      }

      const handleTabKey = (event) => {
        if (event.keyCode === 9) {
          // Shift+Tab: 目前聚焦元素為第一個可聚焦的元素時，Focus 最後一個可聚焦元素
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
            // Tab: 目前聚焦元素為最後一個可聚焦元素時，Focus 第一個可聚焦元素
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };
      const handleEscKey = (event) => event.keyCode === 27 && onActive();

      document.body.classList.add("overflow-hidden");
      Element.addEventListener("keydown", handleTabKey);
      Element.addEventListener("keydown", handleEscKey);
      return () => {
        document.body.classList.remove("overflow-hidden");
        Element.removeEventListener("keydown", handleTabKey);
        Element.removeEventListener("keydown", handleEscKey);
      };
    }
  }, [ref, active, onActive, focusIndex]);
};

export default useTrapFocus;
