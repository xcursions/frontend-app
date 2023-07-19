import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import Text from "@/components/lib/Text/Text";

import styles from "./TripCard.module.scss";

// type Props = {
//   post: {
//     url: string;
//     location: string;
//     price: string;
//   };
// };
const TripCard = ({ post }: any) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_image}>
        <img
          className={styles.pics}
          src={post.outingGallery?.[0]?.image}
          alt={post.name}
        />
        <div className="absolute right-1 top-1 mr-2 mt-2 rounded-full bg-white p-2">
          <AiOutlineHeart className="text-xl" />
        </div>
        <div>
          <Text className="font-dmSansRegular text-[16px] font-normal text-[#1D2838]">
            {post.name}
          </Text>
          <Text className="font-dmSansBold text-[16px] text-[#101828]">
            {`₦${Math.floor(post.price)}`}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
