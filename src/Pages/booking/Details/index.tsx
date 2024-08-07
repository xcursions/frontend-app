/* eslint-disable no-nested-ternary */

import type { ColumnDef } from "@tanstack/react-table";
import { toPng } from "html-to-image";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
import toaster from "react-hot-toast";

import Button from "@/components/lib/Button";
import CopyToClipboard from "@/components/lib/CopyToClipboard";
import { formatedDate } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import MaskString from "@/components/lib/MaskString/MaskString";
import { ArrowIcon, DownloadIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
// import Addon from "@/components/trips/Addon/Addon";
import { DataTable } from "@/components/ui/data-table";
import type { AdminBookingProps } from "@/types";

type Props = {
  detailsData: AdminBookingProps;
};
export type Payment = {
  id: string;
  status: string;
  reference: string;
  createdAt: any;
  amount: string;
};
const BookedTripDetails = ({ detailsData }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    setLoading(true);
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Booking receipt.png";
        link.href = dataUrl;
        link.click();
        setLoading(false);
      })
      .catch((err) => {
        toaster.error(err);
        setLoading(false);
      });
  }, [ref]);
  const paymentData = detailsData?.bookingPayment.map((res) => {
    return {
      id: res.id,
      reference: res.referenceNumber || "",
      amount: res.amount,
      createdAt: res.createdAt.split("T")[0],
      status: res.status,
    };
  });
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: () => (
        <div className="text-[10px] font-semibold md:text-lg">Id</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className="flex max-w-[90px] gap-1 text-[10px] font-medium text-[#101828] ">
            {MaskString(value.id)}
            <CopyToClipboard text={value.id} />
          </div>
        );
      },
    },
    {
      accessorKey: "reference",
      header: () => (
        <div className="text-[10px] font-semibold md:text-lg">Reference</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className="flex max-w-[90px] gap-1 text-[10px] font-medium text-[#101828]">
            {value.reference}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => (
        <div className="text-[10px] font-semibold md:text-lg">Amount</div>
      ),
      cell: ({ row }) => {
        const amount = parseInt(row.getValue("amount"), 10).toLocaleString();
        return (
          <div className="flex max-w-[90px] gap-1 text-[10px] font-medium text-[#101828]">
            ₦{amount}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="text-[10px] font-semibold md:text-lg">Date</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className="flex max-w-[90px] gap-1 text-[10px] font-medium text-[#101828] ">
            {value.createdAt}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="text-[10px] font-semibold md:text-lg">Status</div>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        const value = row.original;
        return (
          <div
            className={`w-fit rounded-3xl px-3 py-1 text-center text-[10px] font-medium text-[#101828] lg:text-[14px] ${
              status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            {value.status}
          </div>
        );
      },
    },
  ];
  return (
    <div className="mx-[20px] w-full bg-[#F9FAFB] pb-[80px] pr-10  pt-10 text-[#101828] xl:mx-[50px]">
      <div className="mx-auto mt-[25px] flex w-full justify-between xl:mt-[40px]">
        <div className="flex items-center gap-2">
          <span onClick={router.back} className="cursor-pointer">
            <ArrowIcon />
          </span>
          <Text className=" font-dmSansBold text-sm font-bold lg:text-xl">
            Trip Details
          </Text>
        </div>
        <Button
          className="flex max-h-[35px] items-center gap-1 rounded-[100px] text-[10px] lg:text-xs"
          onClick={() => setIsOpen(true)}
        >
          <DownloadIcon variants="white" /> Download Receipt
        </Button>
      </div>
      <div>
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
              ₦{parseFloat(detailsData?.cost).toLocaleString()}
            </Text>
          </div>
        </div>
        {/** Details Section */}
        <div className=" w-full bg-[#ffffff]">
          <div className=" p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              Details
            </Text>
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
                  {detailsData?.bookingParticipantCount?.numberOfAdults} Adult,
                  {detailsData?.bookingParticipantCount?.numberOfChildren}{" "}
                  Children,
                  {detailsData?.bookingParticipantCount?.numberOfInfants} Infant
                </Text>
              </div>
              {/* <div>
                <Text className="text-sm">Payment Status</Text>
                <Text
                  className={`w-fit rounded-3xl px-4 py-2 font-dmSansBold text-sm font-bold capitalize ${
                    detailsData?.status === "pending" ||
                    detailsData?.status === "initiated"
                      ? "bg-[#FFF5EB] text-[#FF860A]"
                      : "bg-[#E6FAF0] text-[#12B76A]"
                  }`}
                >
                  {detailsData?.status}
                </Text>
              </div> */}
              <div>
                <Text className="text-sm">Booking Status</Text>
                <Text
                  className={`w-fit rounded-3xl px-4 py-2 font-dmSansBold text-sm font-bold capitalize ${
                    detailsData?.status === "pending" ||
                    detailsData?.status === "initiated"
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
                  {detailsData?.outing?.outingDestination?.city ||
                    "Location not available"}
                </Text>
              </div>
            </div>
          </div>
        </div>
        {/** Total People Going Emails */}
        <div className="my-[15px] w-full bg-[#ffffff] xl:my-[25px]">
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
        <div className="my-[15px] w-full bg-[#ffffff] xl:my-[25px]">
          <div className="p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              Payment Info
            </Text>
            <div className="mt-[24px] grid grid-cols-2 gap-5  lg:grid-cols-3 lg:gap-9">
              <div>
                <Text className="text-sm">Total Amount</Text>
                <Text className="font-dmSansBold text-sm font-bold capitalize">
                  ₦
                  {detailsData?.status === "initiated"
                    ? "0"
                    : parseFloat(detailsData?.cost).toLocaleString() || ""}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Amount Paid So far</Text>
                <Text className="font-dmSansBold text-sm font-bold capitalize">
                  ₦
                  {detailsData?.savingPlan
                    ? parseFloat(
                        detailsData?.savingPlan?.amountSaved
                      ).toLocaleString()
                    : detailsData?.status === "initiated"
                    ? "0"
                    : parseFloat(detailsData?.cost).toLocaleString()}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Payment Plan</Text>
                <Text className="font-dmSansBold text-sm font-bold capitalize">
                  {detailsData?.checkout?.paymentMethod || ""}
                </Text>
              </div>
            </div>
          </div>
        </div>
        {/** Payment History */}
        <div className="my-[15px] w-full bg-[#ffffff] xl:my-[25px]">
          <div className="p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              Booking Payment History
            </Text>
            <DataTable columns={columns} data={paymentData} />
          </div>
        </div>
        {/** Itineraries */}
        {/* <div className="my-[15px] w-full bg-[#ffffff] xl:my-[25px]">
          <div className="p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              Itineraries
            </Text>
            <div className="mt-[24px] grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-9">
              {detailsData?.bookingAddon.length > 0 ? (
                detailsData?.bookingAddon.map((res) => (
                  <div key={res.id}>
                    <Addon {...res.outingAddon} />
                  </div>
                ))
              ) : (
                <Text className="font-dmSansBold text-sm font-bold capitalize">
                  No Itinerary added
                </Text>
              )}
            </div>
          </div>
        </div> */}
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
                    Basic Info
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
                        Name
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                          display: "grid",
                          gridTemplateColumns: "1, 1fr",
                        }}
                      >
                        {detailsData?.bookingParticipant.map((res) => (
                          <span key={res.id}>{res.name}</span>
                        ))}
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
                        Email Address
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                          display: "grid",
                          gridTemplateColumns: "1, 1fr",
                        }}
                      >
                        {detailsData?.bookingParticipant.map((res) => (
                          <span key={res.id}>{res.email}</span>
                        ))}
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
                        Number of People Going
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        {detailsData?.bookingParticipantCount?.numberOfAdults}{" "}
                        Adult,
                        {
                          detailsData?.bookingParticipantCount?.numberOfChildren
                        }{" "}
                        Children,
                        {
                          detailsData?.bookingParticipantCount?.numberOfInfants
                        }{" "}
                        Infant
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
                    Trip Details{" "}
                    <span style={{ color: "#98A2B3" }}>
                      (
                      {detailsData?.outingSubType === "group"
                        ? "Group Trip"
                        : "Private Trip"}
                      )
                    </span>{" "}
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
                        Departure Date
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        {formatedDate(detailsData?.bookingDate?.startDate)}
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
                        Return Date
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        {formatedDate(detailsData?.bookingDate?.endDate)}
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
                        Itineraries
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                        }}
                      >
                        {detailsData?.bookingAddon.map((res) => (
                          <div key={res.id}>{res?.outingAddon?.name},</div>
                        ))}
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
                    Payment Info
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
                        ₦
                        {detailsData?.status === "initiated"
                          ? "0"
                          : parseFloat(detailsData?.cost).toLocaleString() ||
                            ""}
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
                        Amount Paid So far
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                          width: "fit-content",
                        }}
                      >
                        ₦
                        {detailsData?.savingPlan
                          ? parseFloat(
                              detailsData?.savingPlan?.amountSaved
                            ).toLocaleString()
                          : detailsData?.status === "initiated"
                          ? "0"
                          : parseFloat(detailsData?.cost).toLocaleString()}
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
                        Plan
                      </h2>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: "9px",
                          fontWeight: "400",
                          width: "fit-content",
                        }}
                      >
                        {detailsData?.checkout?.paymentMethod || ""}
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

export default BookedTripDetails;
