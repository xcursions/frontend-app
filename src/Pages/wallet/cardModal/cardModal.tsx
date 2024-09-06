"use client";

import { useRouter } from "next/navigation";

import {
  formatDatesRange,
  formatedDate,
} from "@/components/lib/FormatWeekRange/FormatWeekRage";
import Heading from "@/components/lib/Heading/Heading";
import SemiCircleProgress from "@/components/lib/SemiCircleProgress/SemiCircleProgress";
import Text from "@/components/lib/Text/Text";
import type UpcomingPaymentProps from "@/types/UpcomingPaymentProps";

type Props = {
  cardDetails: UpcomingPaymentProps;
  onClose: any;
};
export function CardModal({ cardDetails, onClose }: Props) {
  const router = useRouter();
  const percentagePaid =
    (parseFloat(cardDetails.amountSaved) * 100) /
    (parseFloat(cardDetails.amountSaved) +
      parseFloat(cardDetails.remainingAmountToBeCharged));
  const totalAmount =
    parseFloat(cardDetails.amountSaved) +
    parseFloat(cardDetails.remainingAmountToBeCharged);
  const amountDue =
    parseFloat(cardDetails.remainingAmountToBeCharged) /
    cardDetails.remainingTrials;

  return (
    <>
      {cardDetails.outing ? (
        <div>
          <div
            className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
            onClick={onClose}
          ></div>
          <div className="fixed right-0 top-0 z-[32] flex w-full items-center justify-center lg:w-[418px]">
            <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
              <div className="flex justify-between">
                <Heading className="text-[18px] text-[#101828]">
                  Payment History
                </Heading>
                <p
                  className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                  onClick={onClose}
                >
                  X
                </p>
              </div>
              {/* Display card details here using cardDetails */}
              <SemiCircleProgress progress={percentagePaid} />
              <div className=" mt-0 items-center text-center">
                <Text className="text-[12px] text-[#98A2B3]">Total Amount</Text>
                <Text className="font-dmSansBold text-[24px] text-[#101828]">
                  ₦{totalAmount.toLocaleString()}
                </Text>
              </div>

              <div className="flex justify-around rounded-[24px] bg-[#E4E7EC] p-[15px]">
                <div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <circle cx="6" cy="6" r="6" fill="#41C588" />
                    </svg>
                    <Text>Amount Paid</Text>
                  </div>

                  <Text className="text-center text-[14px] text-[#101828]">
                    ₦{parseFloat(cardDetails.amountSaved)}
                  </Text>
                </div>
                <div>
                  <Text>Amount Remaining</Text>
                  <Text className="text-[14px] text-[#101828]">
                    ₦{parseFloat(cardDetails.remainingAmountToBeCharged)}
                  </Text>
                </div>
              </div>
              <Text className="mt-[10px] rounded-xl bg-[#FFECEB] p-2 text-[12px] text-[#475467]">
                Next Payment:{" "}
                <span className=" font-dmSansBold">
                  ₦{Math.ceil(amountDue).toLocaleString()}
                </span>
                <span className="rounded-3xl  p-3 text-[#F04438]">
                  {formatedDate(cardDetails.nextChargeDate)}
                </span>
              </Text>
              <div className="mt-3">
                <Text className="text-[14px] text-[#101828]">About Trip</Text>
                <div className="mt-2 flex gap-3">
                  {cardDetails.outing
                    ? cardDetails.outing?.outingGallery
                        .slice(0, 2)
                        .map((res) => (
                          <img
                            src={res.image}
                            alt={res.id}
                            key={res.id}
                            className="h-[120px] w-[150px] rounded-2xl"
                          />
                        ))
                    : null}
                </div>
                <div className="mt-2 flex justify-between">
                  <Text className="font-dmSansBold text-[18px] text-[#101828]">
                    {cardDetails?.outing?.name ?? ""}
                  </Text>
                  <Text className="text-[13px]  text-[#475467]">
                    {formatDatesRange(
                      cardDetails.booking?.bookingDate.startDate,
                      cardDetails.booking?.bookingDate.endDate
                    )}
                  </Text>
                </div>
                <span
                  className="mt-3 cursor-pointer font-dmSansRegular text-xs text-[#0A83FF] underline"
                  onClick={() =>
                    router.push(
                      `/${
                        cardDetails?.outing?.type === "tour"
                          ? `trips/africa`
                          : "events"
                      }/${cardDetails.outing.slug}`
                    )
                  }
                >
                  Read more about trip
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
