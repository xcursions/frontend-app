"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { Pagination } from "@/components/lib/Pagination";
import { DataTable } from "@/components/ui/data-table";
import { useLazyGetBookingHistoryQuery } from "@/services/user";
import Layout from "@/ui-components/layout";

import { columns } from "./services/Colums";

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
            <p>Booking History</p>
          </div>
          <div className="">
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
