"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toaster from "react-hot-toast";
import { AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import { LuCalendarX2 } from "react-icons/lu";

import AllCustomers from "@/components/admin/Customers/Customers";
import Layout from "@/components/admin/layout/Layout";
import Button from "@/components/lib/Button";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";
import { useAppSelector } from "@/hooks";

const Customers = () => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user?.teamRole !== "customer" && user?.teamRole !== "none") {
      toaster.error("You do not have permission to visit this page");
      router.push("/admin/dashboard");
    }
  }, []);
  return (
    <Layout>
      <div className="flex justify-between px-[50px] pt-[40px]">
        <div className=" items-center">
          <Heading>Customers</Heading>
        </div>
        <div className=" flex gap-3">
          <Text className=" flex items-center gap-2 rounded-3xl bg-[#ffffff] px-3 py-1">
            <LuCalendarX2 />
            Date{" "}
            <span className="flex items-center gap-2 rounded-3xl bg-[#F2F4F7] px-2 py-1">
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
