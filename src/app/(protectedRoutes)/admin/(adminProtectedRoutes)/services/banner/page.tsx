"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import Button from "@/components/lib/Button";
import FileUpload from "@/components/lib/FileUpload";
import Input from "@/components/lib/Input";
import TextArea from "@/components/lib/TextArea";
import { Switch } from "@/components/ui/switch";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import {
  useCreateBannerImageMutation,
  useCreateBannerMutation,
} from "@/services/admin";

import styles from "./banner.module.scss";

const QuillEditor = dynamic(() => import("@/components/lib/QuillEditor"), {
  ssr: false,
});
const initialState = {
  title: "",
  ctaLink: "",
  status: "unpublished",
};

const Banner = () => {
  const [file, setFile] = useState<File[]>([]);
  const [editorState, setEditorState] = useState("");
  const [isEditorValid, setIsEditorValid] = useState(false);
  const [payload, setPayload] = useState(initialState);

  const router = useRouter();
  const [createBanner, { isSuccess, isError, error, isLoading, data }] =
    useCreateBannerMutation();
  const [
    uploadImage,
    {
      isSuccess: imageSuccess,
      isError: isImageError,
      error: imageError,
      isLoading: isImageLoading,
    },
  ] = useCreateBannerImageMutation();

  useErrorHandler({
    isError,
    error,
  });
  useErrorHandler({
    isError: isImageError,
    error: imageError,
  });

  useSuccessHandler({
    isSuccess: imageSuccess,
    successFunction: () => {
      router.push("/admin/services");
    },
    toastMessage: "Banner Image Added",
  });
  useSuccessHandler({
    isSuccess,
    successFunction: () => {
      setPayload(initialState);
      if (file && data) {
        const formData = new FormData();
        if (file.length > 0) {
          for (let i = 0; i < file.length; i += 1) {
            if (file[i]) {
              formData.append("image", file[i] as File);
              formData.append("type", "image");
              uploadImage({
                id: data.id,
                data: formData,
              });
              setFile([]);
            }
          }
        }
      }
    },
    toastMessage: "Blog Created Successfully",
  });
  const handleSubmit = () => {
    if (isEditorValid && editorState !== "<p><br></p>") {
      createBanner({
        ...payload,
        description: editorState,
      });
    }
  };
  const toggleStatus = () => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      status: prevPayload.status === "published" ? "unpublished" : "published",
    }));
  };
  return (
    <div className="mx-[40px] mt-[40px]">
      <div className="flex justify-between">
        <div
          className="flex h-[38px] w-fit cursor-pointer items-center gap-2 rounded-3xl border px-[15px] text-[14px] font-semibold"
          onClick={router.back}
        >
          <AiOutlineArrowLeft className="font-dmSansBold text-xl" /> Back
        </div>
        <Button
          className=" rounded-3xl"
          onClick={handleSubmit}
          loading={isLoading || isImageLoading}
        >
          Save
        </Button>
      </div>
      <div className={styles.top_container}>
        <div className={styles.title_container}>
          <TextArea
            placeholder="Enter the banner title"
            label="Title"
            value={payload.title}
            className="w-full"
            onChange={(e) => setPayload({ ...payload, title: e.target.value })}
          />
          <div className=" flex items-center justify-between gap-3">
            <Input
              label="Link"
              placeholder="https://example.com"
              value={payload.ctaLink}
              onChange={(e) =>
                setPayload({ ...payload, ctaLink: e.target.value })
              }
            />
            <div className="flex items-center justify-center gap-2">
              <p className=" txt-14 text-gray-500">Publish Banner</p>
              <Switch
                checked={payload.status === "published"}
                onCheckedChange={toggleStatus}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.image_container}>
            <FileUpload
              multiple={true}
              name="file"
              files={file}
              handleChange={(files: File[]) => {
                setFile(files);
              }}
              classname={"h-[210px] w-full"}
            />
          </div>
          <p className="mt-1 text-[12px] text-[#8D8D8D]">
            The featured banner image is what appears with the article’s tittle.
          </p>
        </div>
      </div>
      <div className="my-[32px]">
        <QuillEditor
          label="Content"
          containerClass={"overflow-y-auto overflow-x-auto"}
          value={editorState}
          onEditorChange={(value) => setEditorState(value)}
          setIsEditorValid={setIsEditorValid}
        />
      </div>
    </div>
  );
};

export default Banner;
