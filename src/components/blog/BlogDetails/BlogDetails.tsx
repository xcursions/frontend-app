import Image from "next/image";
import Link from "next/link";
import React from "react";

import { formatedDate } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import Heading from "@/components/lib/Heading";
import Text from "@/components/lib/Text/Text";
import { useGetRelatedBlogByCategoryQuery } from "@/services/public";
import type BlogProps from "@/types/BlogProps";

import styles from "./Header.module.scss";

type Props = {
  detailsData: BlogProps;
};
const BlogDetails = ({ detailsData }: Props) => {
  const { data, isSuccess } = useGetRelatedBlogByCategoryQuery(
    detailsData?.categories[0].id
  );
  return (
    <div className={styles.header_wrapper}>
      <div className={`${styles.header}`}>
        <div className={styles.header_content__wrap}>
          <Text className={styles.lead_date_txt}>
            {formatedDate(detailsData.createdAt)}
          </Text>
          <Heading type="h1" className={styles.lead_header_txt}>
            {detailsData.title}
          </Heading>
          <div className={styles.lead_sub_txt}>
            <div className="mt-[13px] flex justify-center  gap-[8px]">
              {detailsData.categories.map((info) => (
                <span
                  key={info.id}
                  className="max-w-[350px] rounded-[8px] bg-[#475467] px-2 py-1 text-[12px] text-[#ffffff]"
                >
                  {info.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.background_container}>
        <div className={styles.featured_blog}>
          <Image
            width={800}
            height={415}
            src={detailsData.blogFeaturedImage.image}
            alt="featured blog"
            className={styles.image}
          />
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: detailsData.content }}
        className={styles.text_content}
      />
      <div className="mx-auto mt-[50px] max-w-[820px] rounded-[28px] bg-[#FFFFFF]">
        <div className="flex gap-5 p-[24px] lg:px-[60px] lg:py-[40px]">
          <Image
            width={100}
            height={100}
            src={"/assets/images/icons/profile_avatar.png"}
            alt="author"
            className="h-[40px] w-[40px] lg:h-[100px] lg:w-[100px]"
          />
          <div>
            <p className="text-[16px] text-[#0A83FF]">About Author</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-[30px] mt-[100px] max-w-[1140px]">
        <Heading type="h3" className="text-center">
          Related Articles
        </Heading>
        <div className="flex flex-wrap gap-[35px]">
          {isSuccess &&
            data.posts.map((res: BlogProps) => (
              <div
                key={res.id}
                className="mt-[50px] max-w-[350px] cursor-pointer"
              >
                <Link href={`/blog/${res.id}`}>
                  <Image
                    width={348}
                    height={223}
                    src={res.blogFeaturedImage.image}
                    alt="featured blog"
                    className="h-[223px] w-[348px] rounded-[24px]"
                  />
                </Link>
                <Text className="mt-[20px]  items-center font-dmSansRegular text-[14px] text-[#0A83FF] lg:text-[16px] ">
                  {formatedDate(res.createdAt)}
                </Text>
                <Link href={`/blog/${res.id}`}>
                  <Heading
                    type="h3"
                    className="max-w-[350px] cursor-pointer font-dmSansBold text-[18px] lg:text-[21px]"
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
      </div>
    </div>
  );
};

export default BlogDetails;
