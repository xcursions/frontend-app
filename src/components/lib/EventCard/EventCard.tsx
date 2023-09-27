import React from "react";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";

import type { OutingProps } from "@/types";

import Button from "../Button";
import Text from "../Text";
import styles from "./EventCard.module.scss";

type Props = {
  post: OutingProps;
  liked?: any;
};
const EventCard = ({ post, liked }: Props) => {
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
          src={post?.outingGallery?.[0]?.image}
          alt="santorini greece"
        />
        <div className="absolute right-1 top-1 mr-2 mt-2 rounded-full bg-white p-2">
          {liked ? <MdFavorite /> : <GrFavorite />}
        </div>
        <div className={styles.imagetextbody}>
          <div>
            <Text className={styles.imageheading}>
              {post?.outingDestination?.city || post?.name}
            </Text>
            {post?.outingDate && (
              <Text className={styles.imagetext}>
                {formatedDate(post?.outingDate[0]?.startDate)} -
                {formatedDate2(post?.outingDate[0]?.endDate)}
              </Text>
            )}
          </div>
          <Button className="mx-2 my-3 rounded-2xl bg-white text-[#0A83FF]">
            {`₦${parseInt(
              post?.outingChargePlan?.singleOccupancyAmount || post?.price,
              10
            ).toLocaleString()}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
