"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Button from "@/components/lib/Button/Button";
import { formatedDate } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";
import { Pagination } from "@/components/lib/Pagination";
import Text from "@/components/lib/Text/Text";
import { useSuccessHandler } from "@/hooks";
import { useGetAllBlogQuery, useGetFeaturedBlogQuery } from "@/services/public";
import type BlogProps from "@/types/BlogProps";

import styles from "./Header.module.scss";

const Header = () => {
  const [featuredPost, setFeaturedPost] = useState<BlogProps>();
  const [blogData, setBlogData] = useState<BlogProps[]>([]);
  const [payload, setPayload] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 9;
  const { data: featuredBlog, isSuccess: isFeaturedSuccess } =
    useGetFeaturedBlogQuery();
  const { data: blogDetails, isSuccess: blogSuccess } = useGetAllBlogQuery({
    pageLimit,
    currentPage,
    search,
  });
  useSuccessHandler({
    isSuccess: isFeaturedSuccess,
    showToast: false,
    successFunction: () => {
      if (featuredBlog.result.length > 0) {
        setFeaturedPost(featuredBlog.result[0]);
      }
    },
  });
  useSuccessHandler({
    isSuccess: blogSuccess,
    showToast: false,
    dependencies: [blogDetails],
    successFunction: () => {
      if (blogDetails.result.length > 0) {
        setBlogData(blogDetails.result);
      }
    },
  });
  const handleSearch = () => {
    setSearch(payload);
  };
  return (
    <>
      <div className={styles.header_wrapper}>
        <div className={`${styles.header}`}>
          <div className={styles.header_content__wrap}>
            <Heading type="h2" className={styles.lead_title_txt}>
              Blog
            </Heading>
            <Heading type="h1" className={styles.lead_header_txt}>
              Xcursions Travel Chronicles
            </Heading>
            <Text className={styles.lead_sub_txt}>
              Embark on epic journeys through our blog and fuel your wanderlust.
            </Text>
            <div className={styles.header_input__container}>
              <Input
                placeholder="search for topics"
                value={payload}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPayload(e.target.value)
                }
                className={styles.input}
              />
              <Button className={styles.button} onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.background_container}>
          {isFeaturedSuccess && featuredPost && (
            <div className={styles.featured_blog}>
              <Image
                width={800}
                height={415}
                src={featuredPost.blogFeaturedImage.image}
                alt="featured blog"
                className={styles.image}
              />
              <Text className="mt-[30px] items-center font-dmSansRegular text-[16px] text-[#0A83FF] ">
                {formatedDate(featuredPost.createdAt)}
              </Text>
              <Link href={`/blog/${featuredPost.slug}`}>
                <Heading
                  type="h3"
                  className="cursor-pointer font-dmSansBold text-[21px] lg:text-[24px]"
                >
                  {featuredPost.title}
                </Heading>
              </Link>
              <div
                dangerouslySetInnerHTML={{ __html: featuredPost.content }}
                className={styles.text_content}
              />
              <div className="mt-[8px] flex gap-[8px]">
                {featuredPost.categories.map((res) => (
                  <span
                    key={res.id}
                    className="rounded-2xl bg-[#F2F4F7] px-2 py-1 text-[#475467]"
                  >
                    {res.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" mx-[3%] my-[50px]">
        <div className=" mx-auto max-w-[1440px]">
          <div className={styles.card_container}>
            {blogData.map((res) => (
              <div key={res.id} className="flex cursor-pointer flex-col">
                <Link href={`/blog/${res.slug}`}>
                  <Image
                    width={800}
                    height={415}
                    src={res?.blogFeaturedImage?.image}
                    alt="featured blog"
                    className={styles.image}
                  />
                </Link>
                <Text className="mt-[20px]  items-center font-dmSansRegular text-[14px] text-[#0A83FF] lg:text-[16px] ">
                  {formatedDate(res.createdAt)}
                </Text>
                <Link href={`/blog/${res.slug}`}>
                  <Heading
                    type="h3"
                    className="max-w-[350px] cursor-pointer font-dmSansBold text-[18px]"
                  >
                    {res.title}
                  </Heading>
                </Link>
                <div className="mt-[10px] flex gap-[8px]">
                  {res.categories.map((info) => (
                    <span
                      key={info.id}
                      className="max-w-[350px] rounded-[8px] bg-[#F2F4F7] px-2 py-1 text-[12px] text-[#475467]"
                    >
                      {info.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {blogSuccess && blogDetails && (
            <Pagination
              className="pagination-bar my-8"
              currentPage={currentPage}
              totalCount={blogDetails?.totalElements}
              pageLimit={pageLimit}
              onPageChange={(v) => setCurrentPage(v)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
