/* eslint-disable import/no-extraneous-dependencies */

"use client";

import {
  //   ContentState,
  //   convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import type { MultiValue } from "react-select";

import Layout from "@/components/admin/layout/Layout";
import Button from "@/components/lib/Button/Button";
import Input from "@/components/lib/Input/Input";
import MultiSelect from "@/components/lib/MultiSelect";
import type { Option } from "@/components/lib/MultiSelect/MultiSelectConfig";
import WYSIWYGEditor from "@/components/lib/WYSIWYGEditor/WYSIWYGEditor";
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
  featured: false,
  categoryIds: [""],
};

const Page = () => {
  const router = useRouter();
  const [article, setArticle] = useState(EditorState.createEmpty());
  const [payload, setPayload] = useState(initialState);
  const [tagName, setTagName] = useState("");
  const [tag, setTag] = useState<MultiValue<Option>>([]);
  const [file, setFile] = useState<File | null>(null);
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
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles) {
      const newFile = acceptedFiles[0];

      if (newFile) {
        setFile(newFile);
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });
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
        formData.append("image", file as File);
        formData.append("type", "image");
        uploadImage({
          query: data.id,
          data: formData,
        });
        setFile(null);
      }
    },
    toastMessage: "Blog Created Successfully",
  });
  const handleSubmit = () => {
    createBlog({
      ...payload,
      content: draftToHtml(convertToRaw(article.getCurrentContent())),
    });
  };

  return (
    <Layout>
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
            <Input
              placeholder="Enter the blog title"
              label="Title"
              value={payload.title}
              className="w-full"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPayload({ ...payload, title: e.target.value })
              }
            />
            <div>
              <MultiSelect
                options={tagData?.result.map((res: { id: any; name: any }) => ({
                  value: res.id,
                  label: res.name,
                }))}
                value={tag}
                onChange={(event) => setTag(event)}
              />
              <p className="text-[12px] text-[#475467]">Suggested Tags: </p>
            </div>
          </div>
          <div>
            <div className={styles.image_container}>
              {file ? (
                <figure>
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="h-[244px] w-[529px] rounded-[16px]"
                  />
                </figure>
              ) : (
                <div className=" items-center text-center" {...getRootProps()}>
                  <input
                    {...getInputProps()}
                    accept="image/*"
                    multiple={false}
                  />

                  <p className=" mb-[10px] cursor-pointer text-[24px] text-[#0A83FF]">
                    <AiOutlineUpload className=" mx-auto" />
                  </p>

                  {isDragActive ? (
                    <p className="font-dmSansBold">Drop your image here!</p>
                  ) : (
                    <>
                      <p className="text-[14px] font-semibold text-[#0A83FF]">
                        Upload Your Blog Photo
                      </p>
                      <p className="text-[12px] text-[#8D8D8D]">
                        Your photo must be greater than 5mb
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
            <p className="mt-1 text-[12px] text-[#8D8D8D]">
              The featured banner image is what appears with the article’s
              tittle.
            </p>
          </div>
        </div>
        <div className="mt-[32px] h-[456px]">
          <WYSIWYGEditor
            label="Article"
            containerClass="h-[453px] bg-[#ffffff] rounded-2xl"
            editorState={article}
            onEditorStateChange={setArticle}
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
    </Layout>
  );
};

export default Page;
