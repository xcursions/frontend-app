"use client";

import { notFound } from "next/navigation";
import React from "react";

import Details from "@/components/admin/Customers/Details";
import Layout from "@/components/admin/layout/Layout";
import { useGetSingleCustomerQuery } from "@/services/admin/users";

const CustomerDetails = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data, isSuccess } = useGetSingleCustomerQuery(slug);
  if (isSuccess && !data) {
    notFound();
  }
  return <Layout>{isSuccess && <Details detailsData={data} />}</Layout>;
};
export default CustomerDetails;
