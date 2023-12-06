"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import CopyToClipboard from "@/components/lib/CopyToClipboard";
import MaskString from "@/components/lib/MaskString/MaskString";
import { Pagination } from "@/components/lib/Pagination";
import { DownloadIcon } from "@/components/lib/Svg";
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

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-lg font-semibold">Transaction Id</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className="max-w-[170px] truncate text-[14px] font-medium text-[#101828]">
            <Link href={`/user/wallet/${value.id}`}>
              {MaskString(value.id)}
            </Link>
            <CopyToClipboard text={value.id} />
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
            <Link href={`/user/wallet/${value.id}`}>{value.status}</Link>
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
        const value = row.original;
        return (
          <div className="text-[14px] font-medium text-[#101828]">
            <Link href={`/user/wallet/${value.id}`}>
              {nature === "credit" ? "+" : "-"}₦{amount}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "nature",
      header: () => <div className="text-lg font-semibold">Type</div>,
      cell: ({ row }) => {
        const payment = row.getValue("nature");
        const value = row.original;
        return (
          <div
            className={` w-fit rounded-3xl px-3 py-1 text-center text-[14px] font-medium ${
              payment === "credit"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            <Link href={`/user/wallet/${value.id}`}>{value.nature}</Link>
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
            <Link href={`/user/wallet/${value.id}`}>{value.createdAt}</Link>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer text-[20px] font-medium text-[#F04438]`}
          >
            <Link href={`/user/wallet/${value.id}`}>
              {" "}
              <DownloadIcon />
            </Link>
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
          <div className="bg-[#ffffff]">
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
