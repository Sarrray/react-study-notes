import { useEffect } from "react";

const useScrollLock = (isLock: boolean): void => {
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    if (isLock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLock]);
};

export default useScrollLock;
