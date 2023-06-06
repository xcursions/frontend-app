import match from "@/utils/match";

import styles from "./Heading.module.scss";
import type HeadingProps from "./HeadingProps";

const Heading = ({
  type = "h2",
  children,
  className,
  ...rest
}: HeadingProps<"h1" | "h2" | "h3">) => {
  const Component = type || "h2";

  const headingClassName = match(type, {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    default: "",
  });

  return (
    <Component className={`${headingClassName} ${className || ""}`} {...rest}>
      {children}
    </Component>
  );
};

export default Heading;
