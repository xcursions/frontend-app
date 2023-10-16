"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { toPng } from "html-to-image";
import Image from "next/image";
import Link from "next/link";
import type { ChangeEvent } from "react";
import React, { useCallback, useRef, useState } from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import Select from "@/components/lib/Select";
import Text from "@/components/lib/Text";
import { DataTable } from "@/components/ui/data-table";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import { useGetBookingHistoryQuery } from "@/services/user";
import { useCreateFlightBookingMutation } from "@/services/user/savingPlan";

import styles from "./booking.module.scss";
// import { columns } from "./services/Colums";

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
  // amount: string;
  type: string;
  createdAt: any;
  bookingStatus: string;
};

const Booking = () => {
  const ref = useRef<HTMLDivElement>(null);
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
    bookingHistory.result.map((res: any) => {
      return {
        id: res.id,
        type: res.outing.type,
        status: res.status,
        createdAt: res.createdAt.split("T")[0],
        bookingStatus: res.status,
      };
    });

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "receipt.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-lg font-semibold">Booking Id</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className="max-w-[90px] truncate text-[14px] font-medium text-[#101828]">
            {value.id}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => <div className="text-lg font-semibold">Type</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={`text-[14px] font-medium text-[#101828]`}>
            {value.type}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-lg font-semibold">Payment Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status");
        const value = row.original;
        return (
          <div
            className={`w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium text-[#101828] ${
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
    {
      accessorKey: "createdAt",
      header: () => <div className="text-lg font-semibold">Date</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={`text-[14px] font-medium text-[#101828]`}>
            {value.createdAt}
          </div>
        );
      },
    },
    {
      accessorKey: "bookingStatus",
      header: () => <div className="text-lg font-semibold">Booking Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("bookingStatus");
        const value = row.original;
        return (
          <div
            className={`w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium text-[#101828] ${
              status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            {value.bookingStatus}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: () => {
        return (
          <div
            className={`cursor-pointer text-[20px] font-medium text-[#F04438]`}
            onClick={() => onButtonClick()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#clip0_2943_82477)">
                <path
                  d="M3.33337 14.167V15.8337C3.33337 16.2757 3.50897 16.6996 3.82153 17.0122C4.13409 17.3247 4.55801 17.5003 5.00004 17.5003H15C15.4421 17.5003 15.866 17.3247 16.1786 17.0122C16.4911 16.6996 16.6667 16.2757 16.6667 15.8337V14.167"
                  stroke="#0A83FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.83337 9.16699L10 13.3337L14.1667 9.16699"
                  stroke="#0A83FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 3.33301V13.333"
                  stroke="#0A83FF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2943_82477">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        );
      },
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Heading className="pl-[24px] pt-[40px] font-dmSansBold text-[24px] text-[#101828] lg:pl-[40px]">
          Bookings
        </Heading>
        <Text className="pl-[24px] text-[14px] text-[#667084] lg:pl-[40px] lg:text-[16px]">
          Welcome back to your dashboard
        </Text>
        <div className={styles.card_container}>
          <div className={`${styles.card} lg:ml-[40px]`}>
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
        <div className="mt-[48px] lg:ml-[40px] lg:mt-[40px]">
          <div className="flex justify-between pr-5">
            <Heading type="h3">Booking History</Heading>
            <Link href="/user/booking/history">
              <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
                view all
              </Text>
            </Link>
          </div>
        </div>
        <div>
          <div className="bg-[#ffffff]" ref={ref}>
            <DataTable columns={columns} data={data} />
          </div>
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
