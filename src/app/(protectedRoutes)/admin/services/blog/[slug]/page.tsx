"use client";

import dynamic from "next/dynamic";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { RiDeleteBinLine } from "react-icons/ri";
import type { MultiValue } from "react-select";

import Layout from "@/components/admin/layout/Layout";
import Button from "@/components/lib/Button/Button";
import FileUpload from "@/components/lib/FileUpload";
import MultiSelect from "@/components/lib/MultiSelect";
import type { Option } from "@/components/lib/MultiSelect/MultiSelectConfig";
import TextArea from "@/components/lib/TextArea";
import { Switch } from "@/components/ui/switch";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import {
  useDeleteBlogMutation,
  useGetBlogTagsQuery,
  useGetSingleBlogPostQuery,
  useUpdateBlogImageMutation,
  useUpdateBlogPostMutation,
} from "@/services/admin";

import styles from "./blog.module.scss";

const initialState = {
  title: "",
  featured: false,
  description: "",
  bio: "",
  categoryIds: [""],
};

const QuillEditor = dynamic(() => import("@/components/lib/QuillEditor"), {
  ssr: false,
});
const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data: detailsData, isSuccess: detailsDataSuccess } =
    useGetSingleBlogPostQuery(`/${slug}`);
  if (detailsDataSuccess && !detailsData) {
    notFound();
  }
  const router = useRouter();
  const [editorState, setEditorState] = useState("");
  const [isEditorValid, setIsEditorValid] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const [showImage, setShowImage] = useState(false);
  const [tag, setTag] = useState<MultiValue<Option>>([]);
  const [file, setFile] = useState<File[]>([]);
  const [updateBlog, { isSuccess, isError, error, isLoading, data }] =
    useUpdateBlogPostMutation();
  const { data: tagData } = useGetBlogTagsQuery();
  const [deleteBlog, { isSuccess: deleteBlogSuccess }] =
    useDeleteBlogMutation();
  useEffect(() => {
    if (detailsDataSuccess) {
      setPayload({
        ...payload,
        title: detailsData?.title,
        description: detailsData?.description,
        featured: detailsData?.featured,
        bio: detailsData?.bio,
      });
      setEditorState(detailsData?.content);
    }
  }, [detailsDataSuccess, detailsData]);
  const [
    uploadImage,
    {
      isSuccess: imageSuccess,
      isError: isImageError,
      error: imageError,
      isLoading: isImageLoading,
    },
  ] = useUpdateBlogImageMutation();
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
  useSuccessHandler({
    isSuccess: deleteBlogSuccess,
    successFunction: () => {
      router.push("/admin/services");
    },
    toastMessage: "Blog Post Deleted",
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
                id: detailsData.blogFeaturedImage.id,
                data: formData,
              });
              setFile([]);
            }
          }
        }
        // formData.append("image", file);
        // formData.append("type", "image");
        // uploadImage({
        //   query: data.id,
        //   id: detailsData.blogFeaturedImage.id,
        //   data: formData,
        // });
        // setFile(null);
      }
    },
    toastMessage: "Blog Created Successfully",
  });
  const handleSubmit = () => {
    console.log(isEditorValid);
    if (editorState !== "<p><br></p>") {
      updateBlog({
        query: detailsData.id,
        data: {
          ...payload,
          content: editorState,
        },
      });
    }
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-3xl"
              onClick={() => deleteBlog(detailsData?.id)}
            >
              <RiDeleteBinLine className="ml-1 text-lg" />
              Delete
            </Button>
            <Button
              className="flex items-center gap-2 rounded-3xl"
              onClick={handleSubmit}
              loading={isLoading || isImageLoading}
            >
              <ImCheckmark className="ml-1 text-lg text-[#ffffff]" /> Update
              Post
            </Button>
          </div>
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
                options={tagData?.result.map((res: { id: any; name: any }) => ({
                  value: res.id,
                  label: res.name,
                }))}
                value={tag}
                onChange={(event) => setTag(event)}
              />
              <p className="text-[12px] text-[#475467]">Suggested Tags: </p>
              <div>
                <TextArea
                  label="About Author"
                  value={payload.bio}
                  onChange={(e) =>
                    setPayload({ ...payload, bio: e.target.value })
                  }
                />
              </div>
              <div className="mx-[20px] pt-[24px]">
                <h2>Set Post as Featured Post</h2>
                <div className="mt-2 ">
                  <Switch
                    checked={payload.featured}
                    // @ts-ignore
                    value={payload.featured}
                    onCheckedChange={() =>
                      setPayload({ ...payload, featured: !payload.featured })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.image_container}>
              {!showImage && detailsDataSuccess && (
                <div className=" relative inline-block">
                  <img
                    src={
                      detailsDataSuccess &&
                      detailsData?.blogFeaturedImage?.image
                    }
                    alt=""
                    className="block h-[244px] w-[529px] rounded-[16px]"
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
              The featured banner image is what appears with the article’s
              tittle.
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
    </Layout>
  );
};

export default Page;
