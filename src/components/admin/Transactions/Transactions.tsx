import type { ColumnDef } from "@tanstack/react-table";
import { toPng } from "html-to-image";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
import toaster from "react-hot-toast";

import CopyToClipboard from "@/components/lib/CopyToClipboard";
import MaskString from "@/components/lib/MaskString/MaskString";
import { Pagination } from "@/components/lib/Pagination";
import { DownloadIcon } from "@/components/lib/Svg";
import { useGetAllTransactionQuery } from "@/services/admin/transaction";
import { standardDate } from "@/utils/standardDate";

import { DataTable } from "../services/DataTable";
import styles from "./Transactions.module.scss";

export type Payment = {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  amount: string;
  action: string;
  paymentMethod: string;
  image: string;
};

const TransactionsHistory = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const pageLimit = 10;
  const { data: transactionHistory, isSuccess: isTransactionHistorySuccess } =
    useGetAllTransactionQuery({ pageLimit, currentPage });
  const data =
    isTransactionHistorySuccess &&
    transactionHistory.result.map((res: any) => {
      return {
        amount: res?.amount,
        action: res?.purpose,
        id: res?.id,
        status: res?.status,
        createdAt: res?.createdAt.split("T")[0],
        paymentMethod: res?.nature,
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
        toaster.error(err);
      });
  }, [ref]);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: () => (
        <div className="font-dmSansMedium text-sm">Transaction ID</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex gap-1 font-dmSansRegular text-sm text-[#101828]`}
          >
            {MaskString(value.id)}
            <CopyToClipboard text={value.id} />
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => <div className="font-dmSansMedium text-sm">Action</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer font-dmSansRegular text-sm capitalize text-[#101828]`}
            onClick={() => router.push(`/admin/transactions/${value.id}`)}
          >
            {value.action}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="font-dmSansMedium text-sm">Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        const status = row.getValue("status");
        return (
          <div
            className={`w-fit cursor-pointer rounded-3xl px-3 py-1 text-center font-dmSansRegular text-sm text-[#101828] ${
              status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
            onClick={() => router.push(`/admin/transactions/${value.id}`)}
          >
            {value.status}
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="font-dmSansMedium text-sm">Amount</div>,
      cell: ({ row }) => {
        const value = row.original;
        const amount = parseInt(row.getValue("amount"), 10).toLocaleString();
        return (
          <div
            className="cursor-pointer font-dmSansRegular text-sm text-[#101828]"
            onClick={() => router.push(`/admin/transactions/${value.id}`)}
          >
            ₦{amount}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="font-dmSansMedium text-sm">Date</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer font-dmSansRegular text-sm text-[#101828]`}
            onClick={() => router.push(`/admin/transactions/${value.id}`)}
          >
            {standardDate(value.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: () => (
        <div className="font-dmSansMedium text-sm">Payment Type</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={` cursor-pointer font-dmSansRegular text-sm text-[#101828]`}
            onClick={() => router.push(`/admin/transactions/${value.id}`)}
          >
            {value.paymentMethod === "credit" ? "Deposit" : "Booking"}
          </div>
        );
      },
    },
    {
      id: "download",
      cell: () => {
        return (
          <div
            className={`cursor-pointer font-dmSansRegular text-[20px] text-[#F04438]`}
            onClick={() => onButtonClick()}
          >
            <DownloadIcon />
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
