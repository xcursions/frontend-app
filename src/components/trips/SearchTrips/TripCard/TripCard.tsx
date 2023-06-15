import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import Text from "@/components/lib/Text/Text";

import styles from "./TripCard.module.scss";

type Props = {
  post: {
    url: string;
    location: string;
    price: string;
  };
};
const TripCard = ({ post }: Props) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.card_image}>
        <img className={styles.pics} src={post.url} alt="santorini greece" />
        <div className="absolute right-1 top-1 rounded-full bg-white p-2">
          <AiOutlineHeart className="text-xl" />
        </div>
        <div>
          <Text>{post.location}</Text>
          <Text className="text-[16px] text-[#0A83FF]">{post.price}</Text>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
