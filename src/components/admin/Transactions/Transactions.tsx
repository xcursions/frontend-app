import type { ColumnDef } from "@tanstack/react-table";
import { toPng } from "html-to-image";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

import { Pagination } from "@/components/lib/Pagination";
import { useGetAllTransactionQuery } from "@/services/admin/transaction";

import { DataTable } from "../services/DataTable";
import styles from "./Transactions.module.scss";

export type Payment = {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  amount: string;
  paymentMethod: string;
  image: string;
};

const TransactionsHistory = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 10;
  const { data: transactionHistory, isSuccess: isTransactionHistorySuccess } =
    useGetAllTransactionQuery({ pageLimit, currentPage });
  const data =
    isTransactionHistorySuccess &&
    transactionHistory.result
      // .filter((item) => item.outing !== null)
      .map((res: any) => {
        return {
          name: res.user.email,
          amount: res.amount,
          id: res?.id,
          status: res.status,
          createdAt: res.createdAt.split("T")[0],
          paymentMethod: res.nature,
          image: "/assets/images/icons/profile_avatar.jpeg",
        };
      });

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-lg font-semibold">Name/Email</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer items-center gap-3 text-[14px] font-medium text-[#101828]`}
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
      accessorKey: "id",
      header: () => <div className="text-lg font-semibold">Transaction ID</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={`text-[14px] font-medium text-[#101828]`}>
            {value.id}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-lg font-semibold">Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        const status = row.getValue("status");
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
        return (
          <div className="text-[14px] font-medium text-[#101828]">
            ₦{amount}
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
          <div className={` text-[14px] font-medium text-[#101828]`}>
            {value.createdAt}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: () => <div className="text-lg font-semibold">Payment Type</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div className={` text-[14px] font-medium text-[#101828]`}>
            {value.paymentMethod === "credit" ? "Deposit" : "Booking"}
          </div>
        );
      },
    },
    {
      id: "delete",
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
        <div className={styles.card_body} ref={ref}>
          <DataTable columns={columns} data={data} />
        </div>
        {isTransactionHistorySuccess && (
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
  );
};

export default TransactionsHistory;