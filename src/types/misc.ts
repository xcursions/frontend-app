import type { ChangeEvent } from "react";

export type UploadAvatarProp = {
  onFileSelectHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
};
