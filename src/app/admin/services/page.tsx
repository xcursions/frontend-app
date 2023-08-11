"use client";

import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

import Layout from "@/components/admin/layout/Layout";
// import type { Payment } from "@/components/admin/services/Colums";
// import { columns } from "@/components/admin/services/Colums";
// import { DataTable } from "@/components/admin/services/DataTable";
import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading";
import Text from "@/components/lib/Text";

// async function getData(): Promise<Payment[]> {
//   const result = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/outing/outings?type=tour`
//   )
//     .then((res) => res.json())
//     .then((data) => data.result)
//     .catch((err) => console.log(err));
//   return result.map((res: Payment) => {
//     return {
//       id: res.id,
//       name: res.name,
//       price: parseFloat(res.price),
//       viewBy: 200,
//       createdAt: res.createdAt.split("T")[0],
//       bookedBy: res.id,
//     };
//   });
// }
const page = () => {
  // const data = await getData();
  return (
    <Layout>
      <div className="mx-[50px] mt-[40px]">
        <div>
          <Heading type="h2" className="mb-[20px]">
            Service
          </Heading>
          <div className="flex gap-7">
            <Text>Trip</Text>
            <Text>Event</Text>
            <Text>Blog</Text>
          </div>
          <div className="mt-10 flex justify-between rounded-xl bg-[#FFFFFF] px-[12px] pt-10">
            <Heading type="h3">All Trips</Heading>
            <div className="flex items-center gap-4">
              <div className="flex gap-3 rounded-3xl border p-1 text-[12px]">
                <Text className="cursor-pointer rounded-3xl bg-[#EBF5FF] p-1 text-[#0A83FF]">
                  Private Trip
                </Text>
                <Text className="cursor-pointer rounded-3xl p-1">
                  Group Trip
                </Text>
              </div>
              <div>
                <Text>Date</Text>
              </div>
              <Button className="flex items-center gap-2 rounded-3xl text-[14px]">
                <AiOutlinePlus /> New Trip
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <DataTable columns={columns} data={data} /> */}
    </Layout>
  );
};

export default page;
