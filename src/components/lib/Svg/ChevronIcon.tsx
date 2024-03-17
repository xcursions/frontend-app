import type { FC } from "react";

import type { IconProps } from "./IconProps";

const ChevronIcon: FC<IconProps> = ({ className, color = "#4A3041" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      className={className}
      viewBox="0 0 17 16"
      fill="none"
    >
      <path
        d="M4.5 6L8.5 10L12.5 6"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronIcon;
