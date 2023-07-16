import React from "react";

import Layout from "@/components/admin/layout/Layout";
import type { Payment } from "@/components/admin/services/Colums";
import { columns } from "@/components/admin/services/Colums";
import { DataTable } from "@/components/admin/services/DataTable";

async function getData(): Promise<Payment[]> {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/outing/outings?type=tour`
  )
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => console.log(err));
  return result.map((res: Payment) => {
    return {
      id: res.id,
      name: res.name,
      price: parseFloat(res.price),
      viewBy: 200,
      createdAt: res.createdAt.split("T")[0],
      bookedBy: res.id,
    };
  });
}
const page = async () => {
  const data = await getData();
  return (
    <Layout>
      <div>Service</div>
      <DataTable columns={columns} data={data} />
    </Layout>
  );
};

export default page;
