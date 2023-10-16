"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { toPng } from "html-to-image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { Pagination } from "@/components/lib/Pagination";
import { DataTable } from "@/components/ui/data-table";
import { useLazyGetTransactionsQuery } from "@/services/user";
import type TransactionProps from "@/types/TransactionProps";
import Layout from "@/ui-components/layout";

export type Payment = {
  id: string;
  status: string;
  amount: string;
  createdAt: any;
  nature: string;
};

const History = () => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;
  const [
    transactionQuery,
    { data: transactionHistory, isSuccess: transactionHistorySuccess },
  ] = useLazyGetTransactionsQuery();
  const data =
    transactionHistorySuccess &&
    transactionHistory.result.map((res: TransactionProps) => {
      return {
        amount: res.amount,
        status: res.status,
        id: res.id,
        createdAt: res.createdAt.split("T")[0],
        nature: res.nature,
      };
    });

  useEffect(() => {
    transactionQuery(`?limit=${pageLimit}&page=${currentPage}`);
  }, [currentPage, pageLimit]);

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
      header: () => (
        <div className="hidden text-lg font-semibold lg:block">
          Transaction Id
        </div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className="hidden max-w-[170px] truncate text-[14px] font-medium text-[#101828] lg:block">
            {value.id}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-lg font-semibold">Status</div>,
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
      accessorKey: "amount",
      header: () => <div className="text-lg font-semibold">Amount</div>,
      cell: ({ row }) => {
        const amount = parseInt(row.getValue("amount"), 10).toLocaleString();
        const nature = row.getValue("nature");
        return (
          <div className="text-[14px] font-medium text-[#101828]">
            {nature === "credit" ? "+" : "-"}₦{amount}
          </div>
        );
      },
    },
    {
      accessorKey: "nature",
      header: () => (
        <div className="hidden text-lg font-semibold lg:block">Type</div>
      ),
      cell: ({ row }) => {
        const payment = row.getValue("nature");
        const value = row.original;
        return (
          <div
            className={`hidden w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium lg:block ${
              payment === "credit"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            {value.nature}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="hidden text-lg font-semibold lg:block">Date</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`hidden text-[14px] font-medium text-[#101828] lg:block`}
          >
            {value.createdAt}
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
    <div className="overflow-x-hidden bg-[#ffffff]">
      <Layout>
        <div className="xl:mx-[40px]">
          <div className="mb-[32px] mt-[44px] flex items-center gap-3 font-dmSansBold text-[24px] font-bold">
            <p onClick={router.back} className="cursor-pointer">
              <AiOutlineArrowLeft />
            </p>
            <p>Transactions History</p>
          </div>
          <div className="bg-[#ffffff]" ref={ref}>
            <DataTable columns={columns} data={data} />
            {transactionHistorySuccess && (
              <Pagination
                className="pagination-bar my-8"
                currentPage={currentPage}
                totalCount={transactionHistory?.totalElements}
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
