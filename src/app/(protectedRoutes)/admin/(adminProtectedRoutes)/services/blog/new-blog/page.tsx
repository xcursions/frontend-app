"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import type { MultiValue } from "react-select";

import Button from "@/components/lib/Button/Button";
import FileUpload from "@/components/lib/FileUpload";
import Input from "@/components/lib/Input/Input";
import MultiSelect from "@/components/lib/MultiSelect";
import type { Option } from "@/components/lib/MultiSelect/MultiSelectConfig";
import TextArea from "@/components/lib/TextArea/TextArea";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import {
  useCreateBlogImageMutation,
  useCreateBlogPostMutation,
  useCreateBlogTagsMutation,
  useGetBlogTagsQuery,
} from "@/services/admin";

import styles from "./blog.module.scss";

const initialState = {
  title: "",
  bio: "",
  description: "",
  featured: false,
  categoryIds: [""],
};
const QuillEditor = dynamic(() => import("@/components/lib/QuillEditor"), {
  ssr: false,
});

const Page = () => {
  const router = useRouter();
  const [editorState, setEditorState] = useState("");
  const [isEditorValid, setIsEditorValid] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const [tagName, setTagName] = useState("");
  const [tag, setTag] = useState<MultiValue<Option>>([]);
  const [file, setFile] = useState<File[]>([]);
  const [
    createTag,
    {
      isSuccess: isTagSuccess,
      isError: isTagError,
      error: tagError,
      isLoading: isTagLoading,
    },
  ] = useCreateBlogTagsMutation();
  const [createBlog, { isSuccess, isError, error, isLoading, data }] =
    useCreateBlogPostMutation();
  const { data: tagData } = useGetBlogTagsQuery();
  const [
    uploadImage,
    {
      isSuccess: imageSuccess,
      isError: isImageError,
      error: imageError,
      isLoading: isImageLoading,
    },
  ] = useCreateBlogImageMutation();
  useEffect(() => {
    const nameArray = tag.map((item) => item.value);
    setPayload({ ...payload, categoryIds: nameArray });
  }, [tag]);
  useErrorHandler({
    isError,
    error,
  });
  useErrorHandler({
    isError: isImageError,
    error: imageError,
  });
  useErrorHandler({
    isError: isTagError,
    error: tagError,
  });
  useSuccessHandler({
    isSuccess: isTagSuccess,
    successFunction: () => {
      setTagName("");
    },
    toastMessage: "Tag Created Successfully",
  });
  useSuccessHandler({
    isSuccess: imageSuccess,
    successFunction: () => {
      router.push("/admin/services");
    },
    toastMessage: "Blog Image Created",
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
                query: data.id,
                data: formData,
              });
              setFile([]);
            }
          }
        }
        // formData.append("image", file as File);
        // formData.append("type", "image");
        // uploadImage({
        //   query: data.id,
        //   data: formData,
        // });
        // setFile(null);
      }
    },
    toastMessage: "Blog Created Successfully",
  });
  const handleSubmit = () => {
    if (isEditorValid && editorState !== "<p><br></p>") {
      createBlog({
        ...payload,
        content: editorState,
      });
    }
  };
  return (
    <>
      <div className="mx-[40px] mt-[40px]">
        <div className="flex justify-between">
          <div
            className="flex h-[38px] w-fit cursor-pointer items-center gap-2 rounded-3xl border px-[15px] text-[14px] font-semibold"
            onClick={router.back}
          >
            <AiOutlineArrowLeft className="font-dmSansBold text-xl" /> Back
          </div>
          <Button
            className="flex items-center gap-2 rounded-3xl"
            onClick={handleSubmit}
            loading={isLoading || isImageLoading}
          >
            <ImCheckmark className="ml-1 text-lg text-[#ffffff]" /> Publish Post
          </Button>
        </div>
        <div className={styles.top_container}>
          <div className={styles.title_container}>
            <TextArea
              placeholder="Enter the blog title"
              label="Title"
              value={payload.title}
              className="w-full"
              onChange={(e) =>
                setPayload({ ...payload, title: e.target.value })
              }
            />
            <TextArea
              placeholder="Enter Meta Description"
              label="Meta Description for SEO"
              value={payload.description}
              className="w-full"
              onChange={(e) =>
                setPayload({ ...payload, description: e.target.value })
              }
            />
            <div>
              <MultiSelect
                label="Tag"
                options={tagData?.result.map((res: { id: any; name: any }) => ({
                  value: res.id,
                  label: res.name,
                }))}
                value={tag}
                onChange={(event) => setTag(event)}
              />
              <p className="text-[12px] text-[#475467]">Suggested Tags: </p>
            </div>
            <div>
              <TextArea
                label="About Author"
                value={payload.bio}
                onChange={(e) =>
                  setPayload({ ...payload, bio: e.target.value })
                }
              />
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
              The featured banner image is what appears with the article’s
              tittle.
            </p>
          </div>
        </div>
        <div className="mt-[32px]">
          <QuillEditor
            label="Content"
            containerClass={"overflow-y-auto overflow-x-auto"}
            value={editorState}
            onEditorChange={(value) => setEditorState(value)}
            setIsEditorValid={setIsEditorValid}
          />
        </div>
        <div className="mt-[60px] flex max-w-xs flex-col gap-4">
          <h2 className="text-2xl font-bold">Create Blog Category/Tags</h2>
          <Input
            label="Tag Name"
            placeholder="Create New Tag Name"
            value={tagName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTagName(e.target.value)
            }
          />
          <Button
            className="w-full rounded-3xl"
            onClick={() => createTag({ name: tagName })}
            loading={isTagLoading}
          >
            Create Tag
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
