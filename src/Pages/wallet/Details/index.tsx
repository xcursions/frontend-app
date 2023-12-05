import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import Button from "@/components/lib/Button";
import CopyToClipboard from "@/components/lib/CopyToClipboard";
import {
  formatedDate,
  formatTimeInWAT,
} from "@/components/lib/FormatWeekRange/FormatWeekRage";
import MaskString from "@/components/lib/MaskString/MaskString";
import { ArrowIcon, DownloadIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import { useLazyGenerateTransactionReceiptQuery } from "@/services/user";
import type TransactionProps from "@/types/TransactionProps";

type Props = {
  detailsData: TransactionProps;
};

const WalletTransactionDetails = ({ detailsData }: Props) => {
  const router = useRouter();
  const nature = detailsData?.nature;
  const outing = detailsData?.outing;
  const [
    downloadReceipt,
    { data: receiptData, isSuccess, isError, error, isLoading },
  ] = useLazyGenerateTransactionReceiptQuery();
  useErrorHandler({ isError, error });
  useSuccessHandler({
    isSuccess,
    showToast: false,
    successFunction: () => {
      console.log(receiptData);
    },
  });
  const handleDownload = () => {
    downloadReceipt(detailsData?.id);
  };
  let textToShow = "";
  if (nature === "debit") {
    textToShow = outing ? "Trips" : "Withdraw";
  } else {
    textToShow = "Funded Wallet";
  }
  const renderedText =
    textToShow === "Trips" ? (
      <Link
        href={`/user/booking/${detailsData?.outing?.id}/${detailsData?.checkout?.bookingId}`}
      >
        <Text className="flex gap-2 font-dmSansBold text-sm font-bold capitalize">
          {textToShow}{" "}
          <span className=" text-[#0A83FF] underline">View Details</span>
        </Text>
      </Link>
    ) : (
      <Text className="font-dmSansBold text-sm font-bold capitalize">
        {textToShow}
      </Text>
    );
  return (
    <div className="mx-[20px] bg-[#F9FAFB] pb-[80px] text-[#101828] xl:mx-[50px]">
      <div className="my-[25px] flex justify-between xl:my-[40px]">
        <div className="flex items-center gap-2">
          <span onClick={router.back} className="cursor-pointer">
            <ArrowIcon />
          </span>
          <Text className=" font-dmSansBold text-xl font-bold">
            Transaction Details
          </Text>
        </div>
        <Button
          className="flex max-h-[35px] items-center gap-1 rounded-[100px] text-[12px]"
          loading={isLoading}
          onClick={handleDownload}
        >
          <DownloadIcon variants="white" /> Download Receipt
        </Button>
      </div>
      {/** Details Section */}
      <div className="max-h-[350px] w-full max-w-[875px] bg-[#ffffff]">
        <div className="p-[24px]">
          <Text className="font-dmSansBold text-[16px] font-bold">Details</Text>
          <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
            <div>
              <Text className="text-sm">Transaction ID</Text>
              <Text className="flex gap-2 font-dmSansBold text-sm font-bold">
                {MaskString(detailsData?.id)}
                <CopyToClipboard text={detailsData?.id} />
              </Text>
            </div>
            <div>
              <Text className="text-sm">Date</Text>
              <Text className="font-dmSansBold text-sm font-bold">
                {formatedDate(detailsData?.createdAt)}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Time</Text>
              <Text className="font-dmSansBold text-sm font-bold capitalize">
                {formatTimeInWAT(detailsData?.createdAt)}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Services</Text>
              {renderedText}
            </div>
          </div>
        </div>
      </div>
      {/** Cost Section */}
      <div className="my-[15px] w-full max-w-[875px] bg-[#ffffff] xl:my-[25px]">
        <div className="p-[24px]">
          <Text className="font-dmSansBold text-[16px] font-bold">
            Cost Information
          </Text>
          <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
            <div>
              <Text className="text-sm">Total Amount</Text>
              <Text className="font-dmSansBold text-sm font-bold">
                ₦{parseFloat(detailsData?.amount).toLocaleString()}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Tax</Text>
              <Text className="font-dmSansBold text-sm font-bold">₦0</Text>
            </div>
            <div>
              <Text className="text-sm">Discounts or Promotions Applied</Text>
              <Text className="font-dmSansBold text-sm font-bold">₦0</Text>
            </div>
            <div>
              <Text className="text-sm">Status</Text>
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
          </div>
        </div>
      </div>
      {/** Payment Information Section */}
      <div className="my-[15px] w-full max-w-[875px] bg-[#ffffff] xl:my-[25px]">
        <div className="p-[24px]">
          <Text className="font-dmSansBold text-[16px] font-bold">
            Payment Information
          </Text>
          <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
            <div>
              <Text className="text-sm">Payment Method</Text>
              <Text className="font-dmSansBold text-sm font-bold capitalize">
                {detailsData?.checkout
                  ? detailsData?.checkout?.channel
                  : "Not Available"}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Cardholder Name</Text>
              <Text className="font-dmSansBold text-sm font-bold">
                {detailsData?.user?.profile?.fullName || "Not Available"}
              </Text>
            </div>
            <div>
              <Text className="text-sm">Card Type</Text>
              <Text className="font-dmSansBold text-sm font-bold">
                Not Available
              </Text>
            </div>
            <div>
              <Text className="text-sm">Last 4 Digits of Card</Text>
              <Text className="font-dmSansBold text-sm font-bold">
                Not Available
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTransactionDetails;
