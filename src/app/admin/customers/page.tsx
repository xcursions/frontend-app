"use client";

import React from "react";
import { AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import { LuCalendarX2 } from "react-icons/lu";

import AllCustomers from "@/components/admin/Customers/Customers";
import Layout from "@/components/admin/layout/Layout";
import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";

const Customers = () => {
  return (
    <Layout>
      <div className="flex justify-between px-[50px] pt-[40px]">
        <div className=" items-center">
          <Heading className=" text-2xl text-[#101828]">Customers</Heading>
        </div>
        <div className=" flex h-[38px] gap-3">
          <Text className=" flex items-center gap-2 rounded-3xl bg-[#ffffff] px-3 py-1">
            <LuCalendarX2 />
            Referrals
            <span className="flex items-center gap-2 py-1">
              <AiOutlineDown />
            </span>
          </Text>
          <Text className=" flex items-center gap-2 rounded-3xl bg-[#ffffff] px-3 py-1">
            <LuCalendarX2 />
            Date{" "}
            <span className="flex items-center gap-2 py-1">
              Monthly
              <AiOutlineDown />
            </span>
          </Text>
          <Button className=" flex items-center gap-2 rounded-[100px] text-[14px]">
            <AiOutlinePlus className="text-[20px]" /> New Customer
          </Button>
        </div>
      </div>
      <AllCustomers />
    </Layout>
  );
};

export default Customers;
