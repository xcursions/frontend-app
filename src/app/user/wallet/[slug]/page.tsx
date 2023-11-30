"use client";

import React from "react";

import WalletTransactionDetails from "@/Pages/wallet/Details";
import { useGetTransactionsByIdQuery } from "@/services/user";
import Layout from "@/ui-components/layout";

type RouteParams = {
  slug: string;
};

const TransactionDetails = ({ params }: { params: RouteParams }) => {
  const { slug } = params;
  const { data: transactionData, isSuccess: isTransactionSuccess } =
    useGetTransactionsByIdQuery(slug);
  return (
    <div className="bg-[#F9FAFB]">
      <Layout>
        {isTransactionSuccess && (
          <WalletTransactionDetails detailsData={transactionData} />
        )}
      </Layout>
    </div>
  );
};

export default TransactionDetails;
