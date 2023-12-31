/* eslint-disable import/no-extraneous-dependencies */

"use client";

import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { notFound, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineArrowLeft, AiOutlineUpload } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { RiDeleteBinLine } from "react-icons/ri";
import type { MultiValue } from "react-select";

import Layout from "@/components/admin/layout/Layout";
import Button from "@/components/lib/Button/Button";
import Input from "@/components/lib/Input/Input";
import MultiSelect from "@/components/lib/MultiSelect";
import type { Option } from "@/components/lib/MultiSelect/MultiSelectConfig";
import TextArea from "@/components/lib/TextArea";
import WYSIWYGEditor from "@/components/lib/WYSIWYGEditor/WYSIWYGEditor";
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
  bio: "",
  categoryIds: [""],
};
const setEditorWithData = (
  setState: (editor: EditorState) => void,
  htmlString?: string
) => {
  if (htmlString) {
    const blocksFromHTML = convertFromHTML(htmlString);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    setState(EditorState.createWithContent(state));
  }
};
// const setMultiInputData = (
//   setState: (value: MultiValue<Option>) => void,
//   countryData: any[],
//   data?: string[]
// ) => {
//   if (data) {
//     setState(
//       data.map((item) =>
//         countryData.find((country: { value: string }) => country.value === item)
//       )
//     );
//   }
// };
const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data: detailsData, isSuccess: detailsDataSuccess } =
    useGetSingleBlogPostQuery(`/${slug}`);
  if (detailsDataSuccess && !detailsData) {
    notFound();
  }
  const router = useRouter();
  const [article, setArticle] = useState(EditorState.createEmpty());
  const [payload, setPayload] = useState(initialState);
  const [showImage, setShowImage] = useState(false);
  const [tag, setTag] = useState<MultiValue<Option>>([]);
  const [file, setFile] = useState<File | null>(null);
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
        featured: detailsData?.featured,
        bio: detailsData?.bio,
      });
      setEditorWithData(setArticle, detailsData?.content);
      //   setMultiInputData(
      //     tagData?.result.map((res: { id: any; name: any }) => ({
      //       value: res.id,
      //       label: res.name,
      //     })),
      //     detailsData.categories.map((res: { id: any; name: any }) => ({
      //       value: res.id,
      //       label: res.name,
      //     }))
      //   );
    }
  }, [detailsDataSuccess]);
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
        formData.append("image", file as File);
        formData.append("type", "image");
        uploadImage({
          query: data.id,
          id: detailsData.blogFeaturedImage.id,
          data: formData,
        });
        setFile(null);
      }
    },
    toastMessage: "Blog Created Successfully",
  });
  const handleSubmit = () => {
    updateBlog({
      query: detailsData.id,
      data: {
        ...payload,
        content: draftToHtml(convertToRaw(article.getCurrentContent())),
      },
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
                      detailsDataSuccess && detailsData.blogFeaturedImage.image
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
                <div>
                  {file ? (
                    <figure>
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="h-[244px] w-[529px] rounded-[16px]"
                      />
                    </figure>
                  ) : (
                    <div
                      className=" items-center text-center"
                      {...getRootProps()}
                    >
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
      </div>
    </Layout>
  );
};

export default Page;
