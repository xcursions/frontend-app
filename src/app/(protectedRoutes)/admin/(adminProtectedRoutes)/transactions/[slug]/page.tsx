"use client";

import { notFound } from "next/navigation";
import React from "react";

import Details from "@/components/admin/Transactions/Details";
import { useGetTransactionByIdQuery } from "@/services/admin/transaction";

const TransactionDetails = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data, isSuccess } = useGetTransactionByIdQuery(slug);
  if (isSuccess && !data) {
    notFound();
  }
  return <>{isSuccess && <Details detailsData={data} />}</>;
};
export default TransactionDetails;
