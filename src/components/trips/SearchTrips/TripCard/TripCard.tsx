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
  const featuredImage = post.outingGallery.find(
    (item: { featured: any }) => item.featured
  );
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
        <div className="absolute right-1 top-1 rounded-full bg-white p-2">
          <AiOutlineHeart className="text-xl" />
        </div>
        <div>
          <Text>{post.name}</Text>
          <Text className="text-[16px] text-[#0A83FF]">{`₦${Math.floor(
            post.price
          )}`}</Text>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
