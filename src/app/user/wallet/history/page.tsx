"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { Pagination } from "@/components/lib/Pagination";
import { DataTable } from "@/components/ui/data-table";
import { useLazyGetTransactionsQuery } from "@/services/user";
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
    transactionHistory.result.map((res: any) => {
      return {
        amount: res.transaction.amount,
        status: res.transaction.status,
        id: res.transaction.id,
        createdAt: res.transaction.createdAt.split("T")[0],
        paymentChannel: res.paymentChannel,
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
