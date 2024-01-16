export default interface FileUploadProps {
  multiple?: boolean;
  handleChange?: (files: File[]) => void;
  name?: string;
  urls?: string[];
  removeFileHandler?: (fileUrl: string, callback?: () => void) => void;
  isRemovingFile?: boolean;
  files: File[];
  classname?: string;
}
