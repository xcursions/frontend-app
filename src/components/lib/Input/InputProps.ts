import type { ReactNode } from "react";

export default interface InputProps extends React.HTMLProps<HTMLInputElement> {
  startIcon?: boolean;
  endIcon?: ReactNode;
  label?: string;
  error?: boolean;
  helperText?: string;
  wrapperClass?: string;
  containerClass?: string;
}
