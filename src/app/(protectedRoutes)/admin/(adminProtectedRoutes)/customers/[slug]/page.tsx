"use client";

import { notFound } from "next/navigation";
import React from "react";

import Details from "@/components/admin/Customers/Details";
import { useGetSingleCustomerQuery } from "@/services/admin/users";

const CustomerDetails = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data, isSuccess } = useGetSingleCustomerQuery(slug);
  if (isSuccess && !data) {
    notFound();
  }
  return <>{isSuccess && <Details detailsData={data} />}</>;
};
export default CustomerDetails;
