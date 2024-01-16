import type { Dispatch, SetStateAction } from "react";
import type { ReactQuillProps } from "react-quill";

export default interface QuilEditorProps extends ReactQuillProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  containerClass?: string;
  setIsEditorValid?: Dispatch<SetStateAction<boolean>>;
  onEditorChange: (value: string) => void | Dispatch<SetStateAction<string>>;
}
