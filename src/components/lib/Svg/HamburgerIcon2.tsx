import type { Iconprops } from "./IconProps.type";

export const HamburgerIcon: React.FC<Iconprops> = ({
  className,
  color = "#ffffff",
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 10H17.5M2.5 5H17.5M2.5 15H17.5"
        stroke={color}
        className={className}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
