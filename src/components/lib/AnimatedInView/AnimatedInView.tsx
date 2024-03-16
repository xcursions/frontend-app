"use client";

import { useEffect, useRef } from "react";

interface AnimatedInViewProps {
  children: React.ReactNode;
  className?: string;
  element?: string;
}

/**
 * AnimatedInView is a reusable React component that triggers
 * animations in its child elements when they come into view.
 *
 * @component
 * @example
 * // Wrap animated child elements in AnimatedInView component
 * <AnimatedInView>
 *   <div className="animated-element">Element 1</div>
 *   <div className="animated-element">Element 2</div>
 *   // Add more animated child elements as needed
 * </AnimatedInView>
 *
 * @param {AnimatedInViewProps} props - The props for the AnimatedInView component.
 * @returns {JSX.Element} - The AnimatedInView component.
 */
export const AnimatedInView: React.FC<AnimatedInViewProps> = ({
  children,
  className,
  element = "div",
}: AnimatedInViewProps): JSX.Element => {
  const containerRef = useRef<HTMLElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("cod_animate");
        } else {
          // Optionally, you can handle elements going out of view
          // entry.target.classList.remove("cod_animate");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (containerRef.current) {
      const elements = containerRef.current.children;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      Array.from(elements).forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }
  }, []);
  const Comp = element as unknown as React.ElementType;
  return (
    <Comp ref={containerRef} className={className}>
      {children}
    </Comp>
  );
};
