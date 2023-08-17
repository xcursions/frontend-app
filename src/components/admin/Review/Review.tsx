import Image from "next/image";
import React from "react";

import Heading from "@/components/lib/Heading/Heading";
import Rating from "@/components/lib/Rating/Rating";
import Text from "@/components/lib/Text/Text";
import TimeDifference from "@/components/lib/TimeDifference/TimeDifference";
import type IReview from "@/types/Review";

interface Props {
  detailsData: IReview;
}
const Review = ({ detailsData }: Props) => {
  return (
    <div className="rounded-lg bg-[#F9FAFB] p-[24px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={
              detailsData?.user?.profile?.avatarUrl ||
              "/assets/images/icons/profile_avatar.png"
            }
            width={50}
            height={50}
            alt={detailsData?.user.profile.fullName}
            className="rounded-full "
          />
          <Heading type="h3" className="text-[18px]">
            {detailsData?.user.profile.fullName}
          </Heading>
        </div>
        <Rating rating={detailsData?.rating} />
      </div>
      <div className="m-[16px]">
        <Text className="rounded-2xl border bg-[#ffffff] px-3 py-2 text-[14px] text-[#344054]">
          {detailsData?.comment}
        </Text>
      </div>
      <div className="m-[16px]">
        <TimeDifference createdAt={detailsData?.createdAt} />
      </div>
    </div>
  );
};

export default Review;
