import { useEffect, useMemo, useState } from "react";

import type { UseWindowSizeType, WindowSizeType } from "@/types";

/**
 * Custom hook for tracking window size and view conditions
 * @returns {UseWindowSizeType} Object containing window size and media query booleans.
 */
function useWindowSize(): UseWindowSizeType {
  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: undefined,
    height: undefined,
  });

  // Effect to handle window resize events and update window size state
  useEffect(() => {
    // Function to update window size based on the current inner dimensions
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener for window resize and invoke the handler
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the initial window size

    // Cleanup: remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures the effect runs only on mount and unmount

  const isDesktopView = useMemo(
    () => !!windowSize.width && windowSize.width > 1199,
    [windowSize]
  );
  const isTabletView = useMemo(
    () => !!windowSize.width && windowSize.width < 1200,
    [windowSize]
  );
  const isTabletMdView = useMemo(
    () => !!windowSize.width && windowSize.width < 930,
    [windowSize]
  );
  const isMobileView = useMemo(
    () => !!windowSize.width && windowSize.width < 769,
    [windowSize]
  );

  return {
    ...windowSize,
    isDesktopView,
    isTabletView,
    isTabletMdView,
    isMobileView,
  };
}

export { useWindowSize };
