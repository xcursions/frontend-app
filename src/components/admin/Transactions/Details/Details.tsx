"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import Button from "@/components/lib/Button";
import CopyToClipboard from "@/components/lib/CopyToClipboard";
import MaskString from "@/components/lib/MaskString/MaskString";
import { ArrowIcon, DownloadIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import { useGetSingleCustomerQuery } from "@/services/admin/users";
import { formatTimeWithTimeZone, standardDate } from "@/utils/standardDate";

const Details = ({ detailsData }: any) => {
  const router = useRouter();
  const { data: userData } = useGetSingleCustomerQuery(detailsData.userId);
  return (
    <div className=" mx-[50px] pb-[80px] text-[#101828]">
      <div className="mx-auto mt-[40px] flex w-full justify-between">
        <div className="flex items-center gap-2">
          <span onClick={router.back} className="cursor-pointer">
            <ArrowIcon />
          </span>
          <Text className=" font-dmSansBold  text-2xl">Trip Details</Text>
        </div>
        <div className="">
          <Button
            variant="outline"
            className="mx-auto flex h-[35px]  items-center justify-center gap-1 rounded-[100px] border-[#0A83FF] text-center text-xs"
            onClick={() => {}}
          >
            <DownloadIcon /> Download
          </Button>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <div className=" w-full bg-[#ffffff]">
          <div className=" p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              Details
            </Text>
            <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
              <div>
                <Text className="text-sm">Transaction ID</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  {MaskString(detailsData.id)}
                  <CopyToClipboard text={detailsData.id} />
                </Text>
              </div>
              <div>
                <Text className="text-sm">Date</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  {standardDate(detailsData?.createdAt)}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Time</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  {formatTimeWithTimeZone(detailsData.createdAt, "WAT")}
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full bg-[#ffffff]">
          <div className=" p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              Cost Information
            </Text>
            <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
              <div>
                <Text className="text-sm">Total Balance</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  ₦{parseInt(detailsData?.amount, 10).toLocaleString()}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Tax</Text>
                <Text className="font-dmSansBold text-sm font-bold">₦</Text>
              </div>
              <div>
                <Text className="text-sm">Discounts or Promotions Applied</Text>
                <Text className="font-dmSansBold text-sm font-bold">₦0</Text>
              </div>
              <div>
                <Text className="text-sm">Grand Total</Text>
                <Text className="font-dmSansBold text-sm font-bold text-[#0A83FF]">
                  ₦{parseInt(detailsData?.amount, 10).toLocaleString()}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Status</Text>
                <Text
                  className={`w-fit cursor-pointer rounded-3xl px-3 py-1 text-center font-dmSansRegular text-sm capitalize text-[#101828] ${
                    detailsData?.status === "successful"
                      ? "bg-[#E6FAF0] text-[#12B76A]"
                      : "bg-[#FFECEB] text-[#F04438]"
                  }`}
                >
                  {detailsData?.status}
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full bg-[#ffffff]">
          <div className=" p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              Payment Information
            </Text>
            <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
              <div>
                <Text className="text-sm">Payment Method</Text>
                <Text className="font-dmSansBold text-sm font-bold capitalize">
                  {detailsData?.deposit?.paymentChannel}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Cardholder Name</Text>
                <Text className="font-dmSansBold text-sm font-bold"></Text>
              </div>
              <div>
                <Text className="text-sm">Card Type</Text>
                <Text className="font-dmSansBold text-sm font-bold"></Text>
              </div>
              <div>
                <Text className="text-sm">Last 4 Digits of Card</Text>
                <Text className="font-dmSansBold text-sm font-bold"></Text>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full bg-[#ffffff]">
          <div className=" px-[24px] pt-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              User Details
            </Text>
          </div>
          <div className="mb-4 flex items-center gap-2 pl-[24px]">
            <Image
              src={
                userData?.profile?.avatarUrl ||
                "/assets/images/icons/profile_avatar.jpeg"
              }
              alt={userData?.profile?.fullName}
              width={64}
              height={64}
              className="mt-[24px] h-[64px] w-[64px] rounded-full"
            />
            <div>
              <Text className=" text-base font-bold">
                {userData?.profile?.fullName}
              </Text>
              <Text className="text-[14px]">{userData?.email}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
