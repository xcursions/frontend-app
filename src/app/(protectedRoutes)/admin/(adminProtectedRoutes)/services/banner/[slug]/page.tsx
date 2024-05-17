"use client";

import dynamic from "next/dynamic";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

import Button from "@/components/lib/Button";
import FileUpload from "@/components/lib/FileUpload";
import Input from "@/components/lib/Input";
import TextArea from "@/components/lib/TextArea";
import { Switch } from "@/components/ui/switch";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import {
  useCreateBannerImageMutation,
  useDeleteBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
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

const Banner = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data: detailsData, isSuccess: detailsDataSuccess } =
    useGetSingleBannerQuery(slug);
  if (detailsDataSuccess && !detailsData) {
    notFound();
  }
  const [file, setFile] = useState<File[]>([]);
  const [editorState, setEditorState] = useState("");
  const [isEditorValid, setIsEditorValid] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [payload, setPayload] = useState(initialState);

  const router = useRouter();
  const [updateBanner, { isSuccess, isError, error, isLoading, data }] =
    useUpdateBannerMutation();
  const [deleteBanner, { isSuccess: deleteBannerSuccess }] =
    useDeleteBannerMutation();
  const [
    uploadImage,
    {
      isSuccess: imageSuccess,
      isError: isImageError,
      error: imageError,
      isLoading: isImageLoading,
    },
  ] = useCreateBannerImageMutation();

  useEffect(() => {
    if (detailsDataSuccess) {
      setPayload({
        ...payload,
        title: detailsData?.title,
        status: detailsData?.status,
        ctaLink: detailsData?.ctaLink,
      });
      setEditorState(detailsData?.description);
    }
  }, [detailsDataSuccess, detailsData]);

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
    isSuccess: deleteBannerSuccess,
    successFunction: () => {
      router.push("/admin/services");
    },
    toastMessage: "Blog Post Deleted",
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
      updateBanner({
        id: detailsData.id,
        data: {
          ...payload,
          description: editorState,
        },
      });
    }
  };
  const toggleStatus = () => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      status: prevPayload.status === "published" ? "unpublished" : "published",
    }));
  };
  console.log(detailsData);
  return (
    <div className="mx-[40px] mt-[40px]">
      <div className="flex justify-between">
        <div
          className="flex h-[38px] w-fit cursor-pointer items-center gap-2 rounded-3xl border px-[15px] text-[14px] font-semibold"
          onClick={router.back}
        >
          <AiOutlineArrowLeft className="font-dmSansBold text-xl" /> Back
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-3xl text-red-600"
            onClick={() => deleteBanner(detailsData?.id)}
          >
            <RiDeleteBinLine className="ml-1 text-lg" />
            Delete
          </Button>
          <Button
            className=" rounded-3xl"
            onClick={handleSubmit}
            loading={isLoading || isImageLoading}
          >
            Update Banner
          </Button>
        </div>
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
            {!showImage && detailsDataSuccess && (
              <div className=" relative inline-block">
                <img
                  src={detailsDataSuccess && detailsData?.imageUrl}
                  alt=""
                  className="block h-[244px] w-[529px] rounded-[16px] object-cover"
                />
                <button
                  className="absolute right-0 top-0 cursor-pointer rounded-full bg-white px-2 text-xl"
                  onClick={() => setShowImage(!showImage)}
                >
                  X
                </button>
              </div>
            )}
            {showImage && (
              <FileUpload
                multiple={true}
                name="file"
                files={file}
                handleChange={(files: File[]) => {
                  setFile(files);
                }}
                classname={"h-[210px] w-full"}
              />
            )}
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
