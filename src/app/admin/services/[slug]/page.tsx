import { notFound } from "next/navigation";
import React, { use } from "react";

import Layout from "@/components/admin/layout/Layout";
import OutingDetails from "@/components/admin/OutingDetails/OutingDetails";

async function getOutingData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/outing/outings/${slug}`,
    { cache: "default" }
  );
  if (!res.ok) return undefined;
  const data = await res.json();
  return data;
}
const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = use(getOutingData(slug));
  if (!data) {
    notFound();
  }
  return (
    <Layout>
      <OutingDetails detailsData={data} />
    </Layout>
  );
};

export default Page;