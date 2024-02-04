"use client";

import Button from "@/components/lib/Button";
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
      <div className=" px-[3rem]">
        <Heading className="text-center text-[20px]">
          Customer Booking Details
        </Heading>
        <div className="my-5 grid grid-cols-2 gap-3">
          <Text className=" font-dmSansBold text-sm">
            Customer Name:{" "}
            <span className=" font-dmSansRegular">{cardDetails?.name}</span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Customer Email:{" "}
            <span className=" font-dmSansRegular">{cardDetails?.email}</span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Number of Tickets:{" "}
            <span className=" font-dmSansRegular">
              {cardDetails?.numberOfTickets}
            </span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Number of People sharing:{" "}
            <span className=" font-dmSansRegular">
              {cardDetails?.numberOfPeopleSharing}
            </span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Outing Name:{" "}
            <span className=" font-dmSansRegular">{cardDetails?.trip}</span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Destination:{" "}
            <span className=" font-dmSansRegular">
              {cardDetails?.destination}
            </span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Outing Type:{" "}
            <span className=" font-dmSansRegular capitalize">
              {cardDetails?.tripType},{" "}
              {cardDetails?.type === "tour" ? "trip" : "event"}
            </span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Outing Duration:{" "}
            <span className=" font-dmSansRegular">{cardDetails?.tripDate}</span>
          </Text>
        </div>
        <Text className=" flex flex-row gap-3 font-dmSansBold text-sm">
          Addon included:{" "}
          {cardDetails.addon.map((res: any) => (
            <span key={res?.id}>
              <span className=" font-dmSansRegular capitalize">
                {res?.outingAddon?.name}
              </span>
            </span>
          ))}
        </Text>
        <Text className=" flex flex-col gap-3 overflow-auto font-dmSansBold text-sm">
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
        <Heading className=" mt-5 text-center text-[20px]">
          Payment Details
        </Heading>
        <div className="my-5 grid grid-cols-2 gap-3">
          <Text className=" font-dmSansBold text-sm">
            Payment Status:{" "}
            <span className=" font-dmSansRegular">{cardDetails?.status}</span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Payment Plan:{" "}
            <span className=" font-dmSansRegular">
              {cardDetails?.checkout?.paymentMethod}
            </span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Payment Method:{" "}
            <span className=" font-dmSansRegular">
              {cardDetails?.checkout?.channel}
            </span>
          </Text>
          <Text className=" font-dmSansBold text-sm">
            Amount Paid:{" "}
            <span className=" font-dmSansRegular">
              ₦{parseFloat(cardDetails?.amount).toLocaleString()}
            </span>
          </Text>
        </div>
        <div className="mt-3">
          <Heading className="mt-5 text-center text-[20px]">
            Additional Information
          </Heading>
          <Text className=" font-dmSansBold text-sm">
            Extra Duration Price:{" "}
            <span className=" font-dmSansRegular">
              Group: ₦
              {parseFloat(cardDetails.extraGroupDuration).toLocaleString() ||
                "none"}
              , Private: ₦{" "}
              {parseFloat(cardDetails.extraDuration).toLocaleString() || "none"}
            </span>
          </Text>
        </div>
        <Button onClick={onClose} className="mt-3 w-[50%]">
          Close
        </Button>
      </div>
    </div>
  );
}
