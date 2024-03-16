"use client";

import { notFound } from "next/navigation";
import React from "react";

import Layout from "@/components/admin/layout/Layout";
import OutingDetails from "@/components/admin/OutingDetails/OutingDetails";
import { useGetOutingsQuery } from "@/services/admin";

// async function getOutingData(slug: string) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/outing/outings/${slug}`,
//     { cache: "default" }
//   );
//   if (!res.ok) return undefined;
//   const data = await res.json();
//   return data;
// }
const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  // const data = use(getOutingData(slug));
  const { data, isSuccess } = useGetOutingsQuery(`/${slug}`);
  if (isSuccess && !data) {
    notFound();
  }
  return <Layout>{isSuccess && <OutingDetails detailsData={data} />}</Layout>;
};

export default Page;
