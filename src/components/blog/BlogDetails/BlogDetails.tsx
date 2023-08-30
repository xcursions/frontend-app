import Image from "next/image";
import React from "react";

import { formatedDate } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import Heading from "@/components/lib/Heading";
import Text from "@/components/lib/Text/Text";
import type BlogProps from "@/types/BlogProps";

import styles from "./Header.module.scss";

type Props = {
  detailsData: BlogProps;
};
const BlogDetails = ({ detailsData }: Props) => {
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
    </div>
  );
};

export default BlogDetails;
