"use client";

import React from "react";

import WalletTransactionDetails from "@/Pages/wallet/Details";
import { useGetTransactionsByIdQuery } from "@/services/user";

type RouteParams = {
  slug: string;
};

const TransactionDetails = ({ params }: { params: RouteParams }) => {
  const { slug } = params;
  const { data: transactionData, isSuccess: isTransactionSuccess } =
    useGetTransactionsByIdQuery(slug);
  return (
    <div className="bg-[#F9FAFB]">
      {isTransactionSuccess && (
        <WalletTransactionDetails detailsData={transactionData} />
      )}
    </div>
  );
};

export default TransactionDetails;
