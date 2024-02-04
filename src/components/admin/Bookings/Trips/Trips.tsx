import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import React, { useState } from "react";

import { Pagination } from "@/components/lib/Pagination";
import { SubtractDate } from "@/components/lib/SubtractDate/SubtractDate";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import { useGetAllBookingQuery } from "@/services/admin/transaction";
import type { AdminBookingProps } from "@/types";
import { standardDate } from "@/utils/standardDate";

import { DataTable } from "../../services/DataTable";
import FormCanvas from "../FormCanvas";
import { CardModal } from "./cardModal";
import styles from "./Trips.module.scss";

export type Payment = {
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

const Trips = () => {
  const [tripsList, setTripsList] = useState<AdminBookingProps[]>([]);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;
  const { data, isSuccess, isError, error } = useGetAllBookingQuery({
    pageLimit,
    currentPage,
  });
  useSuccessHandler({
    isSuccess,
    dependencies: [data],
    showToast: false,
    successFunction: () => {
      setTripsList(data?.result);
    },
  });
  useErrorHandler({
    isError,
    error,
  });
  const tripData = tripsList.map((res) => {
    return {
      name: res?.user?.profile?.fullName,
      amount: res?.cost,
      email: res?.user?.email,
      trip: res?.outing?.name,
      type: res?.outing?.type,
      tripType: res?.outingSubType,
      destination: `${res?.outing?.outingDestination?.city}, ${res?.outing?.outingDestination?.country}`,
      checkout: res?.checkout,
      participant: res?.bookingParticipant,
      numberOfTickets:
        res?.bookingParticipantCount &&
        res.bookingParticipantCount.numberOfAdults +
          res.bookingParticipantCount.numberOfChildren +
          res.bookingParticipantCount.numberOfInfants,
      numberOfPeopleSharing: res?.numberOfPeopleSharing,
      paymentDeadline: `${SubtractDate(
        res?.bookingDate?.startDate,
        res?.outing?.deadlineGap
      )}`,
      addon: res?.bookingAddon,
      extraGroupDuration:
        res?.outing?.outingChargePlan?.extraDurationGroupCostPerDay,
      id: res?.id,
      extraDuration: res?.outing?.outingChargePlan?.extraDurationCostPerDay,
      status: res?.status,
      tripDate: `${standardDate(res?.bookingDate?.startDate)} to ${standardDate(
        res?.bookingDate?.endDate
      )}`,
      image:
        res?.user?.profile?.avatarUrl ||
        "/assets/images/icons/profile_avatar.jpeg",
    };
  });

  const handleCardClick = (value: any) => {
    setSelectedCard(value);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: () => <div className="font-dmSansMedium text-sm">Name</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
            onClick={() => handleCardClick(value)}
          >
            <Image
              src={value.image}
              alt={`${value.name}`}
              width={50}
              height={44}
              className="h-[44px] w-[50px] rounded-2xl"
            />
            <span>{value.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="font-dmSansMedium text-sm">Email Address</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer text-[14px] font-medium text-[#101828]`}
            onClick={() => handleCardClick(value)}
          >
            {value.email}
          </div>
        );
      },
    },
    {
      accessorKey: "trip",
      header: () => (
        <div className="font-dmSansMedium text-sm">Outing Name</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={` cursor-pointer text-[14px] font-medium text-[#101828]`}
            onClick={() => handleCardClick(value)}
          >
            {value.trip}
          </div>
        );
      },
    },
    {
      accessorKey: "tripDate",
      header: () => <div className="font-dmSansMedium text-sm">Trip Date</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={` cursor-pointer text-[14px] font-medium text-[#101828]`}
            onClick={() => handleCardClick(value)}
          >
            {value.tripDate}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => <div className="font-dmSansMedium text-sm">Type</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={` cursor-pointer font-dmSansRegular text-[16px] capitalize text-[#101828]`}
            onClick={() => handleCardClick(value)}
          >
            {value.type === "tour" ? "trip" : "event"}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="font-dmSansMedium text-sm">Amount</div>,
      cell: ({ row }) => {
        const amount = parseInt(row.getValue("amount"), 10).toLocaleString();
        return (
          <div className="cursor-pointer text-[14px] font-medium text-[#101828]">
            ₦{amount}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="font-dmSansMedium text-sm">Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium text-[#101828] ${
              value.status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
            onClick={() => handleCardClick(value)}
          >
            {value.status}
          </div>
        );
      },
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.card_body}>
          <DataTable columns={columns} data={tripData} />
        </div>
        {selectedCard && (
          <FormCanvas onClose={handleCloseModal} title="Outing Details">
            <CardModal cardDetails={selectedCard} onClose={handleCloseModal} />
          </FormCanvas>
        )}
        {/* {selectedCard && (
          <CardModal cardDetails={selectedCard} onClose={handleCloseModal} />
        )} */}
        {isSuccess && (
          <Pagination
            className="pagination-bar my-8"
            currentPage={currentPage}
            totalCount={data?.totalElements}
            pageLimit={pageLimit}
            onPageChange={(v) => setCurrentPage(v)}
          />
        )}
      </div>
    </div>
  );
};

export default Trips;
