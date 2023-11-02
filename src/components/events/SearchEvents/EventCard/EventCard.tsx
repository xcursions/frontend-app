import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import Button from "@/components/lib/Button";
import Text from "@/components/lib/Text";
import type { OutingProps } from "@/types";

import styles from "./EventCard.module.scss";

type Props = {
  post: OutingProps;
};
const EventCard = ({ post }: Props) => {
  const formatedDate = (date: string) => {
    const dob = new Date(date);
    const dobArr = dob.toDateString().split(" ");
    return `${dobArr[1]} ${dobArr[2]}`;
  };
  const formatedDate2 = (date: string) => {
    const dob = new Date(date);
    const dobArr = dob.toDateString().split(" ");
    return `${dobArr[1]} ${dobArr[2]}`;
  };
  return (
    <div className={styles.card_container}>
      <div className={styles.card_image}>
        <img
          className={styles.pics}
          src={post.outingGallery?.[0]?.image}
          alt="santorini greece"
        />
        <div className="absolute right-1 top-1 mr-2 mt-2 rounded-full bg-white p-2">
          <AiOutlineHeart className="text-xl" />
        </div>
        <div className={styles.imagetextbody}>
          <div>
            <Text className={styles.imageheading}>
              {post.outingDestination.city}
            </Text>
            <Text className={styles.imagetext}>
              {formatedDate(post.outingDate[0].startDate)} -
              {formatedDate2(post.outingDate[0].endDate)}
            </Text>
          </div>
          <Button className="mx-2 rounded-2xl bg-white text-[#0A83FF]">
            {`₦${parseInt(
              post?.outingChargePlan?.costGroup,
              10
            ).toLocaleString()}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
