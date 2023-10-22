"use client";

import { MdOutlineCancel } from "react-icons/md";

import Heading from "@/components/lib/Heading/Heading";
// import SemiCircleProgress from "@/components/lib/SemiCircleProgress/SemiCircleProgress";
import Text from "@/components/lib/Text/Text";

type Payment = {
  id: string;
  name: string;
  email: string;
  trip: string;
  type: string;
  tripType: string;
  destination: string;
  checkout: any;
  participant: any;
  paymentDeadline: string;
  numberOfTickets: string | number | null;
  numberOfPeopleSharing: number;
  addon: any;
  //   duration: string;
  extraDuration: string;
  extraGroupDuration: string;
  tripDate: string;
  status: any;
  amount: string;
  image: string;
};
type Props = {
  cardDetails: Payment;
  onClose: any;
};
export function CardModal({ cardDetails, onClose }: Props) {
  return (
    <div>
      <div
        className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
        onClick={onClose}
      ></div>
      <div className="fixed right-2 top-2 z-[32] flex w-full items-center justify-center lg:w-[700px]">
        <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
          <div className="flex justify-between">
            <Heading className="text-[18px] text-[#101828]">
              Outing Details
            </Heading>
            <p
              className="cursor-pointer font-dmSansBold text-3xl text-[#98A2B3]"
              onClick={onClose}
            >
              <MdOutlineCancel />
            </p>
          </div>
          <Heading className="text-center">Customer Booking Details</Heading>
          <div className="my-5 grid grid-cols-2 gap-3">
            <Text className=" font-dmSansBold text-lg">
              Customer Name:{" "}
              <span className=" font-dmSansRegular">{cardDetails?.name}</span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Customer Email:{" "}
              <span className=" font-dmSansRegular">{cardDetails?.email}</span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Number of Tickets:{" "}
              <span className=" font-dmSansRegular">
                {cardDetails?.numberOfTickets}
              </span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Number of People sharing:{" "}
              <span className=" font-dmSansRegular">
                {cardDetails?.numberOfPeopleSharing}
              </span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Outing Name:{" "}
              <span className=" font-dmSansRegular">{cardDetails?.trip}</span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Destination:{" "}
              <span className=" font-dmSansRegular">
                {cardDetails?.destination}
              </span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Outing Type:{" "}
              <span className=" font-dmSansRegular capitalize">
                {cardDetails?.tripType},{" "}
                {cardDetails?.type === "tour" ? "trip" : "event"}
              </span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Outing Duration:{" "}
              <span className=" font-dmSansRegular">
                {cardDetails?.tripDate}
              </span>
            </Text>
          </div>
          <Text className=" flex flex-row gap-3 font-dmSansBold text-lg">
            Addon included:{" "}
            {cardDetails.addon.map((res: any) => (
              <span key={res?.id}>
                <span className=" font-dmSansRegular capitalize">
                  {res?.outingAddon?.name}
                </span>
              </span>
            ))}
          </Text>
          <Text className=" flex flex-col gap-3 overflow-auto font-dmSansBold text-lg">
            Outing Participants:{" "}
            {cardDetails?.participant.map((res: any) => (
              <span key={res?.id} className="flex justify-between">
                <span className=" w-full font-dmSansRegular ">
                  Name: {res?.name}
                </span>
                <span className=" w-full font-dmSansRegular ">
                  Email: {res?.email}
                </span>
              </span>
            ))}
          </Text>
          <Heading className=" text-center ">Payment Details</Heading>
          <div className="my-5 grid grid-cols-2 gap-3">
            <Text className=" font-dmSansBold text-lg">
              Payment Status:{" "}
              <span className=" font-dmSansRegular">{cardDetails?.status}</span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Payment Plan:{" "}
              <span className=" font-dmSansRegular">
                {cardDetails?.checkout?.paymentMethod}
              </span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Payment Method:{" "}
              <span className=" font-dmSansRegular">
                {cardDetails?.checkout?.channel}
              </span>
            </Text>
            <Text className=" font-dmSansBold text-lg">
              Amount Paid:{" "}
              <span className=" font-dmSansRegular">
                ₦{parseFloat(cardDetails?.amount).toLocaleString()}
              </span>
            </Text>
          </div>
          <div className="mt-3">
            <Heading className="text-center">Additional Information</Heading>
            <Text className=" font-dmSansBold text-lg">
              Extra Duration Price:{" "}
              <span className=" font-dmSansRegular">
                Group: ₦
                {parseFloat(cardDetails.extraGroupDuration).toLocaleString() ||
                  "none"}
                , Private: ₦{" "}
                {parseFloat(cardDetails.extraDuration).toLocaleString() ||
                  "none"}
              </span>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
