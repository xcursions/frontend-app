"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import type { ChangeEvent } from "react";
import React, { useState } from "react";

import Button from "@/components/lib/Button/Button";
import CopyToClipboard from "@/components/lib/CopyToClipboard";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import MaskString from "@/components/lib/MaskString/MaskString";
import Select from "@/components/lib/Select";
// import { DownloadIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import { DataTable } from "@/components/ui/data-table";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import { useGetBookingHistoryQuery } from "@/services/user";
import { useCreateFlightBookingMutation } from "@/services/user/savingPlan";
import type { AdminBookingProps } from "@/types";
import { standardDate } from "@/utils/standardDate";

import styles from "./booking.module.scss";

const initialState = {
  numOfAdults: "0",
  numOfChildren: "0",
  numOfInfants: "0",
  type: "round-trip",
  class: "",
  travelFrom: "",
  travelTo: "",
  departureDate: "",
  arrivalDate: "",
};

const price = [
  { value: "0", label: 0 },
  { value: "1", label: 1 },
  { value: "2", label: 2 },
  { value: "3", label: 3 },
  { value: "4", label: 4 },
  { value: "5", label: 5 },
];
const flightClass = [
  { value: "economy", label: " Economy" },
  { value: "premium-economy", label: " Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First" },
];
export type Payment = {
  id: string;
  status: string;
  type: string;
  createdAt: any;
  bookingStatus: string;
  outingId: string;
};

const Booking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const { data: bookingHistory, isSuccess: bookingHistorySuccess } =
    useGetBookingHistoryQuery(`?limit=6`);
  const [
    bookFlight,
    {
      isError: isFlightError,
      error: flightError,
      isSuccess: isFlightSuccess,
      isLoading: flightLoading,
    },
  ] = useCreateFlightBookingMutation();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = () => {
    bookFlight(payload);
  };
  useSuccessHandler({
    isSuccess: isFlightSuccess,
    successFunction: () => {
      setIsOpen(false);
    },
    toastMessage: "Successful",
  });
  useErrorHandler({ isError: isFlightError, error: flightError });
  const data =
    bookingHistorySuccess &&
    bookingHistory.result.map((res: AdminBookingProps) => {
      return {
        id: res?.bookingDate?.bookingId,
        type: res?.outing?.type,
        status: res?.status,
        createdAt: res?.createdAt.split("T")[0],
        bookingStatus: res?.status,
        outingId: res?.outingId,
      };
    });
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-[16px] font-semibold">Booking Id</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className="flex max-w-[90px] gap-1 text-[12px] font-medium text-[#101828] hover:text-[16px]">
            <Link href={`/user/booking/${value.outingId}/${value.id}`}>
              {MaskString(value.id)}
            </Link>
            <CopyToClipboard text={value.id} />
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => <div className="text-[16px] font-semibold">Type</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`text-[14px] font-medium capitalize text-[#101828] hover:text-[16px]`}
          >
            <Link href={`/user/booking/${value.outingId}/${value.id}`}>
              {value.type === "tour" ? "Trip" : "Event"}
            </Link>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "status",
    //   header: () => (
    //     <div className="hidden text-lg font-semibold lg:flex">
    //       Payment Status
    //     </div>
    //   ),
    //   cell: ({ row }) => {
    //     const status = row.getValue("status");
    //     const value = row.original;
    //     return (
    //       <div
    //         className={`hidden w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium text-[#101828] lg:flex ${
    //           status === "successful"
    //             ? "bg-[#E6FAF0] text-[#12B76A]"
    //             : "bg-[#FFECEB] text-[#F04438]"
    //         }`}
    //       >
    //         <Link href={`/user/booking/${value.outingId}/${value.id}`}>
    //           {value.status}
    //         </Link>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-[16px] font-semibold">Date</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`text-[12px] font-medium text-[#101828] hover:text-[16px] lg:text-[14px]`}
          >
            <Link href={`/user/booking/${value.outingId}/${value.id}`}>
              {standardDate(value.createdAt)}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "bookingStatus",
      header: () => (
        <div className="text-[16px] font-semibold">Booking Status</div>
      ),
      cell: ({ row }) => {
        const status = row.getValue("bookingStatus");
        const value = row.original;
        return (
          <div
            className={`w-fit rounded-3xl px-3 py-1 text-center text-[12px] font-medium text-[#101828] hover:text-[16px] lg:text-[14px] ${
              status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            <Link href={`/user/booking/${value.outingId}/${value.id}`}>
              {value.bookingStatus}
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Heading className="pt-[40px] font-dmSansBold text-[24px] text-[#101828]">
          Bookings
        </Heading>
        <Text className="text-[14px] text-[#667084] lg:text-[16px]">
          Welcome back to your dashboard
        </Text>
        <div className={styles.card_container}>
          <div className={styles.card}>
            <div className="flex flex-row-reverse lg:flex-col">
              <Image
                src="/assets/images/dashboard/flight.png"
                width={150}
                height={150}
                alt="flight icon"
                className="mx-auto mt-[28px] max-w-[100px]"
              />
              <div className="mx-auto">
                <Text className="my-5 text-center font-dmSansMedium text-[18px] text-[#101828]">
                  Flights
                </Text>
                <Button
                  className="mb-5 rounded-3xl bg-black"
                  onClick={handleModal}
                >
                  Book Flight
                </Button>
              </div>
            </div>
          </div>
          <div className={`${styles.card}`}>
            <div className="flex flex-row-reverse lg:flex-col">
              <Image
                src="/assets/images/dashboard/trip.png"
                width={150}
                height={150}
                alt="flight icon"
                className="mx-auto mt-[28px] max-w-[100px] items-center"
              />
              <div className="mx-auto">
                <Text className="my-5 text-center font-dmSansMedium text-[18px] text-[#101828]">
                  Trips
                </Text>
                <Link href="/trips">
                  <Button className="mb-5 rounded-3xl bg-black">
                    Check Our Trips
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className={`${styles.card}`}>
            <div className="flex flex-row-reverse lg:flex-col">
              <Image
                src="/assets/images/dashboard/accomodation.png"
                width={150}
                height={150}
                alt="flight icon"
                className="mx-auto mt-[28px] max-w-[100px] items-center"
              />
              <div className="mx-auto">
                <Text className="my-5 text-center font-dmSansMedium text-[18px] text-[#101828]">
                  Accomodations
                </Text>
                <Button className="mb-5 rounded-3xl bg-black" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[48px] flex justify-between pr-5">
          <Heading type="h3">Booking History</Heading>
          <Link href="/user/booking/history">
            <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
              view all
            </Text>
          </Link>
        </div>
        <div className="bg-[#ffffff] pb-5">
          <DataTable columns={columns} data={data} />
        </div>
        {isOpen && (
          <div>
            <div
              className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
              onClick={handleModal}
            ></div>
            <div className={styles.modal}>
              <div className={styles.modal_content}>
                <div className="flex justify-between">
                  <Heading className="mx-auto" type="h3">
                    Book Your Flight
                  </Heading>
                  <p
                    className="cursor-pointer pr-4 font-dmSansBold text-[16px] text-[#98A2B3]"
                    onClick={handleModal}
                  >
                    X
                  </p>
                </div>
                <div className="mx-auto my-5 flex justify-center gap-3">
                  <p
                    className={`cursor-pointer rounded-lg border border-[#E4E7EC] p-2 text-xl ${
                      isRoundTrip
                        ? "bg-[#000000] text-[#ffffff]"
                        : " bg-[#ffffff] text-[#000000]"
                    }`}
                    onClick={() => {
                      setIsRoundTrip(true);
                      setPayload({ ...payload, type: "round-trip" });
                    }}
                  >
                    Round Trip
                  </p>
                  <p
                    className={`cursor-pointer rounded-lg border border-[#E4E7EC] p-2 text-xl ${
                      isRoundTrip
                        ? " bg-[#ffffff] text-[#000000]"
                        : "bg-[#000000] text-[#ffffff]"
                    }`}
                    onClick={() => {
                      setIsRoundTrip(false);
                      setPayload({ ...payload, type: "one-way" });
                    }}
                  >
                    One Way
                  </p>
                </div>
                <div className=" grid grid-cols-1 gap-[15px] md:grid-cols-2 lg:grid-cols-4">
                  <Input
                    type="text"
                    icon={"/assets/images/user/map-pin.png"}
                    label="Travel From"
                    value={payload.travelFrom}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setPayload({ ...payload, travelFrom: event.target.value })
                    }
                  />
                  <Input
                    type="text"
                    icon={"/assets/images/user/map-pin.png"}
                    label="Travel To"
                    value={payload.travelTo}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setPayload({ ...payload, travelTo: event.target.value })
                    }
                  />
                  <Input
                    type="date"
                    label="Departure Date"
                    value={payload.departureDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPayload({ ...payload, departureDate: e.target.value })
                    }
                  />
                  <Input
                    type="date"
                    label="Arrival Date"
                    value={payload.arrivalDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPayload({ ...payload, arrivalDate: e.target.value })
                    }
                  />
                  <Select
                    placeholder={"No of tickets"}
                    label="Adult"
                    startIcon={"/assets/images/user/user.png"}
                    value={payload.numOfAdults}
                    onChange={(event) =>
                      setPayload({ ...payload, numOfAdults: event.value })
                    }
                    options={price.map((option) => ({
                      value: option.value,
                      label: `${option.label} Adult`,
                    }))}
                    showArrow
                  />
                  <Select
                    placeholder={"No of tickets"}
                    label="Children"
                    startIcon={"/assets/images/user/user.png"}
                    value={payload.numOfChildren}
                    onChange={(event) =>
                      setPayload({ ...payload, numOfChildren: event.value })
                    }
                    options={price.map((option) => ({
                      value: option.value,
                      label: `${option.label} Child`,
                    }))}
                    showArrow
                  />
                  <Select
                    placeholder={"No of tickets"}
                    label="Infant"
                    startIcon={"/assets/images/user/user.png"}
                    value={payload.numOfInfants}
                    onChange={(event) =>
                      setPayload({ ...payload, numOfInfants: event.value })
                    }
                    options={price.map((option) => ({
                      value: option.value,
                      label: `${option.label} Infants`,
                    }))}
                    showArrow
                  />
                  <Select
                    placeholder={"Class"}
                    label="Select Class"
                    startIcon={"/assets/images/user/briefcase.png"}
                    value={payload.class}
                    onChange={(event) =>
                      setPayload({ ...payload, class: event.value })
                    }
                    options={flightClass.map((option) => ({
                      value: option.value,
                      label: `${option.label} Class`,
                    }))}
                    showArrow
                  />
                </div>
                <div className="mx-auto my-5 flex justify-center gap-3">
                  <Button
                    className=" w-full rounded-full lg:w-auto"
                    loading={flightLoading}
                    onClick={handleSubmit}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
