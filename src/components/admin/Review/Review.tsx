import Image from "next/image";
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

import Heading from "@/components/lib/Heading/Heading";
import Rating from "@/components/lib/Rating/Rating";
import Text from "@/components/lib/Text/Text";
import TimeDifference from "@/components/lib/TimeDifference/TimeDifference";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import { useDeleteReviewMutation } from "@/services/admin";
import type IReview from "@/types/Review";

interface Props {
  detailsData: IReview;
  design?: boolean;
}
const Review = ({ detailsData, design }: Props) => {
  const [deleteReview, { isSuccess, isError, error }] =
    useDeleteReviewMutation();
  useErrorHandler({
    isError,
    error,
  });
  useSuccessHandler({
    isSuccess,
    toastMessage: "Review deleted successfully",
  });
  return (
    <div
      className={`${
        design ? "bg-[#ffffff]" : "bg-[#F9FAFB]"
      } rounded-lg  p-[24px]`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={
              detailsData?.user?.profile?.avatarUrl ||
              "/assets/images/icons/profile_avatar.jpeg"
            }
            width={50}
            height={50}
            alt={detailsData?.user.profile.fullName}
            className="h-[50px] w-[50px] rounded-full"
          />
          <Heading type="h3" className="text-[14px] lg:text-[18px]">
            {detailsData?.user.profile.fullName}
          </Heading>
        </div>
        <Rating rating={detailsData?.rating} />
      </div>
      <div className="m-[16px]">
        <Text
          className={`${
            !design && "border bg-[#ffffff]"
          } rounded-2xl  px-3 py-2 text-[12px] text-[#344054] lg:text-[14px]`}
        >
          {detailsData?.comment}
        </Text>
      </div>
      <div className={`m-[16px] flex justify-between ${design && "text-end"}`}>
        <TimeDifference createdAt={detailsData?.createdAt} />
        {!design && (
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-[#0A83FF]">Edit</span>
            <span
              className="flex cursor-pointer items-center gap-1 text-[14px] text-[#F04438]"
              onClick={() =>
                deleteReview({
                  query: detailsData.outingId,
                  id: detailsData.id,
                })
              }
            >
              <RiDeleteBinLine />
              Delete
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
