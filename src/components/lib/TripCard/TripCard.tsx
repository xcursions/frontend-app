import React from "react";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";

import Text from "@/components/lib/Text/Text";
import type OutingProps from "@/types/OutingProps";

import styles from "./TripCard.module.scss";

type Props = {
  post: OutingProps;
  liked: any;
};
const TripCard = ({ post, liked }: Props) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_image}>
        <img
          className={styles.pics}
          src={post.outingGallery?.[0]?.image}
          alt={post.name}
        />
        <div className="absolute right-1 top-1 mr-2 mt-2 rounded-full bg-white p-2">
          {liked ? <MdFavorite /> : <GrFavorite />}
        </div>
        <div>
          <Text className="font-dmSansRegular text-[16px] font-normal text-[#1D2838]">
            {post.name}
          </Text>
          <Text className="font-dmSansBold text-[16px] text-[#101828]">
            {`₦${parseInt(
              post?.outingChargePlan?.singleOccupancyAmount,
              10
            ).toLocaleString()}`}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
