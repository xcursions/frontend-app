"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { Pagination } from "@/components/lib/Pagination";
import { DataTable } from "@/components/ui/data-table";
import { useLazyGetTransactionsQuery } from "@/services/user";
import type TransactionProps from "@/types/TransactionProps";
import Layout from "@/ui-components/layout";

import { columns } from "./services/Colums";

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
          <div className="">
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
