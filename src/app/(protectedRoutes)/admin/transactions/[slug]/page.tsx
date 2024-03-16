"use client";

import { notFound } from "next/navigation";
import React from "react";

import Layout from "@/components/admin/layout/Layout";
import Details from "@/components/admin/Transactions/Details";
import { useGetTransactionByIdQuery } from "@/services/admin/transaction";

const TransactionDetails = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data, isSuccess } = useGetTransactionByIdQuery(slug);
  if (isSuccess && !data) {
    notFound();
  }
  return <Layout>{isSuccess && <Details detailsData={data} />}</Layout>;
};
export default TransactionDetails;
