"use client";

import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { LuCalendarX2 } from "react-icons/lu";

import Layout from "@/components/admin/layout/Layout";
import TransactionsHistory from "@/components/admin/Transactions";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";

const Transaction = () => {
  return (
    <Layout>
      <div className="flex justify-between px-[50px] pt-[40px]">
        <div className=" items-center">
          <Heading>Transactions History</Heading>
        </div>
        <div>
          <Text className=" flex items-center gap-2 rounded-3xl bg-[#ffffff] px-3 py-1">
            <LuCalendarX2 />
            Date{" "}
            <span className="flex items-center gap-2 rounded-3xl bg-[#F2F4F7] px-2 py-1">
              Monthly
              <AiOutlineDown />
            </span>
          </Text>
        </div>
      </div>
      <TransactionsHistory />
    </Layout>
  );
};

export default Transaction;
