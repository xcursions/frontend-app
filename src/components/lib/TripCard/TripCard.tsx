import React from "react";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";

import Text from "@/components/lib/Text/Text";
import type OutingProps from "@/types/OutingProps";

import styles from "./TripCard.module.scss";

type Props = {
  post: OutingProps;
  liked?: any;
};
const TripCard = ({ post, liked }: Props) => {
  const featuredImage = post.outingGallery.find(
    (item: { featured: any }) => item.featured
  );
  const price = () => {
    if (post?.subType === "group") {
      return post?.outingChargePlan?.costGroup;
    }
    return post?.outingChargePlan?.cost;
  };
  return (
    <div className={styles.card_container}>
      <div className={styles.card_image}>
        <img
          className={styles.pics}
          src={
            (featuredImage && featuredImage.image) ||
            post.outingGallery?.[0]?.image
          }
          alt={post.name}
        />
        <div className="absolute right-1 top-1 mr-2 mt-2 rounded-full bg-white p-2">
          {liked ? <MdFavorite /> : <GrFavorite />}
        </div>
        <div>
          <Text className="text-center font-dmSansRegular text-[14px] font-normal text-[#1D2838]">
            {post.name}
          </Text>
          <Text className="text-center text-[14px] text-[#0A83FF]">{`₦${parseInt(
            price(),
            10
          ).toLocaleString()}`}</Text>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
