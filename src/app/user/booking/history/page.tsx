"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import CopyToClipboard from "@/components/lib/CopyToClipboard";
import MaskString from "@/components/lib/MaskString/MaskString";
import { Pagination } from "@/components/lib/Pagination";
import { ArrowIcon, DownloadIcon } from "@/components/lib/Svg";
import { DataTable } from "@/components/ui/data-table";
import { useLazyGetBookingHistoryQuery } from "@/services/user";
import Layout from "@/ui-components/layout";

export type Payment = {
  id: string;
  status: string;
  amount: string;
  type: string;
  createdAt: any;
  bookingStatus: string;
  outingId: string;
};

const History = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;
  const [
    transactionQuery,
    { data: bookingHistory, isSuccess: bookingHistorySuccess },
  ] = useLazyGetBookingHistoryQuery();
  const data =
    bookingHistorySuccess &&
    bookingHistory.result.map((res: any) => {
      return {
        id: res.id,
        type: res.outing.type,
        status: res.status,
        amount: res.cost,
        createdAt: res.createdAt.split("T")[0],
        bookingStatus: res.status,
        outingId: res.outingId,
      };
    });
  useEffect(() => {
    transactionQuery(`?limit=${pageLimit}&page=${currentPage}`);
  }, [currentPage, pageLimit]);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: () => <div className=" text-lg font-semibold">Booking Id</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className=" flex max-w-[90px] gap-1 text-[12px] font-medium text-[#101828]">
            <Link href={`/user/booking/${value.outingId}/${value.id}`}>
              {MaskString(value.id)}
            </Link>{" "}
            <CopyToClipboard text={value.id} />
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => (
        <div className="hidden text-lg font-semibold lg:flex">Type</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`hidden text-[14px] font-medium capitalize text-[#101828] lg:flex`}
          >
            <Link href={`/user/booking/${value.outingId}/${value.id}`}>
              {value.type}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="hidden text-lg font-semibold lg:flex">
          Payment Status
        </div>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        const value = row.original;
        return (
          <div
            className={`hidden w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium text-[#101828] lg:flex ${
              status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            <Link href={`/user/booking/${value.outingId}/${value.id}`}>
              {value.status}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-lg font-semibold">Amount</div>,
      cell: ({ row }) => {
        const value = row.original;
        const amount = parseInt(row.getValue("amount"), 10).toLocaleString();
        return (
          <div className="text-[12px] font-medium text-[#101828] lg:text-[14px]">
            <Link href={`/user/booking/${value.outingId}/${value.id}`}>
              ₦{amount}
            </Link>
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
          <div
            className={`text-[12px] font-medium text-[#101828] lg:text-[14px]`}
          >
            <Link href={`/user/booking/${value.outingId}/${value.id}`}>
              {value.createdAt}
            </Link>
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
            className={`w-fit rounded-3xl px-3 py-1 text-center text-[12px] font-medium text-[#101828] lg:text-[14px] ${
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
    {
      id: "actions",
      cell: () => {
        return (
          <div
            className={`cursor-pointer text-[20px] font-medium text-[#F04438]`}
            onClick={() => {}}
          >
            <DownloadIcon />
          </div>
        );
      },
    },
  ];
  return (
    <div className="overflow-x-hidden bg-[#ffffff]">
      <Layout>
        <div className="xl:mx-[40px]">
          <div className="mb-[32px] mt-[44px] flex items-center gap-3 font-dmSansBold text-[24px] font-bold">
            <p onClick={router.back} className="cursor-pointer">
              <ArrowIcon />
            </p>
            <p>Booking History</p>
          </div>
          <div className=" bg-[#ffffff]">
            <DataTable columns={columns} data={data} />
            {bookingHistorySuccess && (
              <Pagination
                className="pagination-bar my-8"
                currentPage={currentPage}
                totalCount={bookingHistory?.totalElements}
                pageLimit={pageLimit}
                onPageChange={(v) => setCurrentPage(v)}
              />
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default History;
