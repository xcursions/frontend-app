/* eslint-disable no-nested-ternary */
import { toPng } from "html-to-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
import toaster from "react-hot-toast";

import Button from "@/components/lib/Button";
import CopyToClipboard from "@/components/lib/CopyToClipboard";
import {
  formatedDate,
  formatTimeInWAT,
} from "@/components/lib/FormatWeekRange/FormatWeekRage";
import MaskString from "@/components/lib/MaskString/MaskString";
import { ArrowIcon, DownloadIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import type TransactionProps from "@/types/TransactionProps";

type Props = {
  detailsData: TransactionProps;
};

const WalletTransactionDetails = ({ detailsData }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const nature = detailsData?.nature;
  const outing = detailsData?.outing;
  let textToShow = "";
  if (nature === "debit") {
    textToShow = outing ? "Trips" : "Withdraw";
  } else {
    textToShow = "Funded Wallet";
  }
  const renderedText =
    textToShow === "Trips" ? (
      <Link
        href={
          detailsData.checkout
            ? `/user/booking/${detailsData?.outing?.id}/${detailsData?.checkout?.bookingId}`
            : "/user/wallet"
        }
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
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    setLoading(true);
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Transaction receipt.png";
        link.href = dataUrl;
        link.click();
        setLoading(false);
      })
      .catch((err) => {
        toaster.error(err);
        setLoading(false);
      });
  }, [ref]);
  return (
    <div className="mx-[20px] bg-[#F9FAFB] pb-[80px] pr-10 pt-10 text-[#101828] xl:mx-[50px]">
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
          onClick={() => setIsOpen(true)}
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
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"></div>
          <div className="fixed inset-0 inset-x-[20px]  z-[32] flex items-center justify-center lg:inset-x-[30px]">
            <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
              <div className="flex justify-between">
                <Button
                  className="flex max-h-[35px] items-center gap-1 rounded-[100px] text-[12px]"
                  onClick={() => onButtonClick()}
                  loading={loading}
                >
                  <DownloadIcon variants="white" /> Save Receipt
                </Button>
                <p
                  className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                  onClick={() => setIsOpen(false)}
                >
                  X
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  margin: "0 auto",
                  padding: "20px 20px",
                  // maxWidth: "590px",
                }}
                ref={ref}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "40px",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dterurfze/image/upload/v1700774161/website-images/logo_gvgvt3.png"
                    alt="logo"
                    style={{ height: "17px", width: "76px" }}
                  />
                  <p
                    style={{
                      color: "#667084",
                      fontSize: "9px",
                      fontWeight: "500",
                    }}
                  >
                    Issued on: {formatedDate(new Date())}
                  </p>
                </div>
                <div style={{ marginTop: "40px" }}>
                  <h2
                    style={{
                      color: "#101828",
                      fontWeight: "700",
                      fontSize: "12px",
                    }}
                  >
                    Details
                  </h2>
                  <hr style={{ color: "#F2F4F7" }} />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Transaction ID
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        {detailsData?.id}
                      </p>
                    </div>
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Date
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        {formatedDate(detailsData?.createdAt)}
                      </p>
                    </div>
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Time
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        {formatTimeInWAT(detailsData?.createdAt)}
                      </p>
                    </div>
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Services
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        {renderedText}
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "40px" }}>
                  <h2
                    style={{
                      color: "#101828",
                      fontWeight: "700",
                      fontSize: "12px",
                    }}
                  >
                    Cost Information
                  </h2>
                  <hr style={{ color: "#F2F4F7" }} />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Total Amount
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        ₦{parseFloat(detailsData?.amount).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Tax
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        ₦0
                      </p>
                    </div>
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Discounts or Promotions Applied
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        ₦0
                      </p>
                    </div>
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Status
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                        className={`w-fit rounded-3xl px-4 py-2 font-dmSansBold text-sm font-bold capitalize ${
                          detailsData?.status === "pending"
                            ? "bg-[#FFF5EB] text-[#FF860A]"
                            : "bg-[#E6FAF0] text-[#12B76A]"
                        }`}
                      >
                        {detailsData?.status}
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "40px" }}>
                  <h2
                    style={{
                      color: "#101828",
                      fontWeight: "700",
                      fontSize: "12px",
                    }}
                  >
                    Payment Information
                  </h2>
                  <hr style={{ color: "#F2F4F7" }} />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Payment Method
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        {detailsData?.checkout
                          ? detailsData?.checkout?.channel
                          : "Not Available"}
                      </p>
                    </div>
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Cardholder Name
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                          width: "fit-content",
                        }}
                      >
                        Not Available
                      </p>
                    </div>
                    <div>
                      <h2
                        style={{
                          color: "#101828",
                          fontWeight: "700",
                          fontSize: "12px",
                        }}
                      >
                        Card Type
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                          width: "fit-content",
                        }}
                      >
                        Not Available
                      </p>
                    </div>
                  </div>
                </div>
                <footer
                  style={{
                    textAlign: "center",
                    paddingTop: "50px",
                    color: "#667084",
                    fontSize: "10px",
                  }}
                >
                  Note: Your Receipt is automatically generated
                </footer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletTransactionDetails;
