import type { ReactNode } from "react";

export default interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  label?: string;
  labelStyle?: string;
  error?: boolean;
  helperText?: string;
  wrapperClass?: string;
  containerClass?: string;
}
