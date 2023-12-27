import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export default interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: boolean;
  icon?: string;
  endIcon?: ReactNode;
  register?: UseFormRegisterReturn<string>;
  label?: string;
  error?: boolean;
  errorMsg?: string;
  helperText?: string;
  wrapperClass?: string;
  containerClass?: string;
}
