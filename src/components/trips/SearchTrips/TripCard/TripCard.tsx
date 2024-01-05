import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import Text from "@/components/lib/Text/Text";
import type OutingProps from "@/types/OutingProps";

import styles from "./TripCard.module.scss";

type Props = {
  post: OutingProps;
};
const TripCard = ({ post }: Props) => {
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
        <Image
          className={styles.pics}
          width={290}
          height={300}
          src={
            (featuredImage && featuredImage.image) ||
            post.outingGallery?.[0]?.image
          }
          alt={post.name}
        />
        <div className="absolute right-1 top-1 rounded-full bg-white p-2">
          <AiOutlineHeart className="text-xl" />
        </div>
        <div>
          <Text>{post.name}</Text>
          <Text className="text-[16px] text-[#0A83FF]">{`₦${parseInt(
            price(),
            10
          ).toLocaleString()}`}</Text>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
