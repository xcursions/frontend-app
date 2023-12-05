import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import Button from "@/components/lib/Button";
import { formatedDate } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import { ArrowIcon, DownloadIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import Addon from "@/components/trips/Addon/Addon";
import type { AdminBookingProps } from "@/types";

type Props = {
  detailsData: AdminBookingProps;
};

const BookedTripDetails = ({ detailsData }: Props) => {
  const router = useRouter();
  return (
    <div className="mx-[20px] bg-[#F9FAFB] pb-[80px] text-[#101828] xl:mx-[50px]">
      <div className="mt-[25px] flex justify-between xl:mt-[40px]">
        <div className="flex items-center gap-2">
          <span onClick={router.back} className="cursor-pointer">
            <ArrowIcon />
          </span>
          <Text className=" font-dmSansBold text-xl font-bold">
            Trip Details
          </Text>
        </div>
        <Button className="flex max-h-[35px] items-center gap-1 rounded-[100px] text-[12px]">
          <DownloadIcon variants="white" /> Download Receipt
        </Button>
      </div>
      <div className="my-[25px] flex gap-2 xl:my-[45px]">
        <Image
          src={
            (detailsData?.outing?.outingGallery &&
              detailsData?.outing?.outingGallery[0].image) ||
            "/assets/images/trip/card2.png"
          }
          alt={detailsData?.outing?.name}
          width={68}
          height={68}
          className=" rounded-xl"
        />
        <div>
          <Text className=" font-dmSansBold text-[18px] font-bold">
            {detailsData?.outing?.name}
          </Text>
          <Text className=" font-dmSansBold text-[18px] font-bold text-[#0A83FF]">
            ₦{parseFloat(detailsData?.outing?.price).toLocaleString()}
          </Text>
        </div>
      </div>
      {/** Details Section */}
      <div className="max-h-[350px] w-full max-w-[875px] bg-[#ffffff]">
        <div className="p-[24px]">
          <Text className="font-dmSansBold text-[16px] font-bold">Details</Text>
          <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
            <div>
              <Text className="text-sm">Departure Date</Text>
              <Text className="font-dmSansBold text-sm font-bold">
                {formatedDate(detailsData?.bookingDate?.startDate)}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Return Date</Text>
              <Text className="font-dmSansBold text-sm font-bold">
                {formatedDate(detailsData?.bookingDate?.endDate)}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Trip Type</Text>
              <Text className="font-dmSansBold text-sm font-bold capitalize">
                {detailsData?.outingSubType} Trip
              </Text>
            </div>
            <div>
              <Text className="text-sm">Number of people going</Text>
              <Text className="font-dmSansBold text-sm font-bold capitalize">
                {detailsData?.bookingParticipantCount?.numberOfAdults}Adult,{" "}
                {detailsData?.bookingParticipantCount?.numberOfChildren}
                Children,{" "}
                {detailsData?.bookingParticipantCount?.numberOfInfants}
                Infant
              </Text>
            </div>
            <div>
              <Text className="text-sm">Payment Status</Text>
              <Text
                className={`w-fit rounded-3xl px-4 py-2 font-dmSansBold text-sm font-bold capitalize ${
                  detailsData?.status === "pending"
                    ? "bg-[#FFF5EB] text-[#FF860A]"
                    : "bg-[#E6FAF0] text-[#12B76A]"
                }`}
              >
                {detailsData?.status}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Booking Status</Text>
              <Text
                className={`w-fit rounded-3xl px-4 py-2 font-dmSansBold text-sm font-bold capitalize ${
                  detailsData?.status === "pending"
                    ? "bg-[#FFF5EB] text-[#FF860A]"
                    : "bg-[#E6FAF0] text-[#12B76A]"
                }`}
              >
                {detailsData?.status}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Location</Text>
              <Text className="font-dmSansBold text-sm font-bold capitalize">
                {detailsData?.outing?.outingDestination?.city || ""}
              </Text>
            </div>
          </div>
        </div>
      </div>
      {/** Total People Going Emails */}
      <div className="my-[15px] w-full max-w-[875px] bg-[#ffffff] xl:my-[25px]">
        <div className="p-[24px]">
          <Text className="font-dmSansBold text-[16px] font-bold">
            Total People Going
          </Text>
          <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
            {detailsData?.bookingParticipant.map((res) => (
              <div key={res.id}>
                <Text className="text-sm">{res.name}</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  {res.email}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/** Payment Info section */}
      <div className="my-[15px] w-full max-w-[875px] bg-[#ffffff] xl:my-[25px]">
        <div className="p-[24px]">
          <Text className="font-dmSansBold text-[16px] font-bold">
            Payment Info
          </Text>
          <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
            <div>
              <Text className="text-sm">Total Amount</Text>
              <Text className="font-dmSansBold text-sm font-bold capitalize">
                ₦{parseFloat(detailsData?.cost).toLocaleString() || ""}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Amount Paid So far</Text>
              <Text className="font-dmSansBold text-sm font-bold capitalize">
                {detailsData?.outing?.outingDestination?.city || ""}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Plan</Text>
              <Text className="font-dmSansBold text-sm font-bold capitalize">
                {detailsData?.checkout?.paymentMethod || ""}
              </Text>
            </div>
          </div>
        </div>
      </div>
      {/** Itineraries */}
      <div className="my-[15px] w-full  max-w-[875px] bg-[#ffffff] xl:my-[25px]">
        <div className="p-[24px]">
          <Text className="font-dmSansBold text-[16px] font-bold">
            Itineraries
          </Text>
          <div className="mt-[24px] grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-9">
            {detailsData?.bookingAddon.map((res) => (
              <div key={res.id}>
                <Addon {...res.outingAddon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedTripDetails;
