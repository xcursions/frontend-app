import type { ReactNode } from "react";
import type { ReactDropdownProps } from "react-dropdown";

export default interface InputProps extends ReactDropdownProps {
  startIcon?: ReactNode;
  label?: string;
  error?: boolean;
  helperText?: string;
  containerClass?: string;
  showArrow?: boolean;
}
