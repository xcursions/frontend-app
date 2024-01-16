/* eslint-disable no-nested-ternary */
import { type FC, useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { FileUploader } from "react-drag-drop-files";
import { FiUploadCloud } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

import Loader from "../Loader/Loader";
import type FileUploadProps from "./FileUploadProps";

const FileUpload: FC<FileUploadProps> = ({
  multiple,
  handleChange,
  name,
  urls,
  removeFileHandler,
  isRemovingFile,
  files,
  classname,
}) => {
  const [isRemovingId, setIsRemovingId] = useState<string>("");
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (urls) setExistingImageUrls(urls);
  }, [urls]);

  const handleFilesChange = (fileList: FileList) => {
    const newFiles: File[] = [];
    for (let i = 0; i < fileList.length; i += 1) {
      if (fileList?.[i]) newFiles.push(fileList[i] as File);
    }
    if (handleChange) handleChange(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    if (handleChange) handleChange(newFiles);
  };

  const removeExistingImageUrl = (itemToRemove: string) => {
    if (isRemovingFile) return;

    setIsRemovingId(itemToRemove);
    if (removeFileHandler) {
      removeFileHandler(itemToRemove, () => setIsRemovingId(""));
    } else {
      const newUrls = existingImageUrls.filter((img) => img !== itemToRemove);
      setExistingImageUrls(newUrls);
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center space-y-1 rounded-md border border-gray-300 bg-gray-100 px-3 py-5 text-center text-[10px]">
        <div className="flex w-full flex-wrap items-center gap-5">
          {existingImageUrls.length
            ? existingImageUrls.map((item, index) => (
                <figure
                  className="relative h-20 w-20 rounded-md bg-gray-200"
                  key={index}
                >
                  <img
                    src={item}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeExistingImageUrl(item);
                    }}
                    className="absolute  -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-lg"
                  >
                    <MdCancel />
                  </button>
                  {isRemovingFile && isRemovingId === item && (
                    <div className="absolute left-0 top-0 z-50 grid h-full w-full place-items-center bg-black/50">
                      <Loader text="" />
                    </div>
                  )}
                </figure>
              ))
            : null}
          {files.length
            ? files.map((item, index) => (
                <figure
                  className={
                    classname
                      ? `${classname} relative rounded-md bg-gray-200`
                      : "relative h-20 w-20 rounded-md bg-gray-200"
                  }
                  key={index}
                >
                  <img
                    src={URL.createObjectURL(item)}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="absolute -right-3  -top-2 flex h-5 w-5  items-center justify-center rounded-full bg-white shadow-lg"
                  >
                    <MdCancel />
                  </button>
                </figure>
              ))
            : null}
          {existingImageUrls.length || files.length ? (
            <FileUploader
              multiple={multiple}
              handleChange={handleFilesChange}
              name={name}
            >
              <figure className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-8 border-[#F9FAFB] bg-[#F2F4F7]">
                <FiUploadCloud className="text-xl" />
              </figure>
              {/* <span className="font-semibold text-[#6941C6]">Upload more</span> */}
            </FileUploader>
          ) : null}
        </div>
        {!existingImageUrls.length && !files.length ? (
          <FileUploader
            multiple={multiple}
            handleChange={handleFilesChange}
            name={name}
          >
            <figure className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-8 border-[#F9FAFB] bg-[#F2F4F7]">
              <FiUploadCloud className="text-xl" />
            </figure>
            <span className="cursor-pointer font-semibold text-[#6941C6]">
              Click to upload
            </span>
            <span>or drag and drop images</span>
            <p className="cursor-pointer text-[#667085]">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </FileUploader>
        ) : null}
      </div>
    </>
  );
};

export default FileUpload;
