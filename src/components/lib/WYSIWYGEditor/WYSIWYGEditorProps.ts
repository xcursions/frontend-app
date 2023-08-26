import type { EditorProps } from "react-draft-wysiwyg";

export default interface WYSIWYGEditorProps extends EditorProps {
  label?: string;
  error?: boolean;
  helperText?: string;
  containerClass?: string;
  onEditorStateChange?: any;
}
