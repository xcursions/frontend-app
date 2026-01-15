"use client";

import React from "react";

import { useGetTransactionsByIdQuery } from "@/services/user";
import WalletTransactionDetails from "@/views/wallet/Details";

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
