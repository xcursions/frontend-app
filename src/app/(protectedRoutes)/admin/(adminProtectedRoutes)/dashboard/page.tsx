"use client";

import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { LuCalendarX2 } from "react-icons/lu";

import TransactionDashboard from "@/components/admin/Dashboard";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";
import { useAppSelector } from "@/hooks";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <>
      <div className="flex items-center justify-between px-[50px] pt-[40px]">
        <div>
          <Heading className=" font-dmSansBold text-2xl">
            Hello,{" "}
            {user?.profile?.username || user?.profile.fullName.split(" ")[0]}
            🏝️
          </Heading>
          <Text className="text-[#667084]">Welcome back to your dashboard</Text>
        </div>
        <div>
          <Text className="flex h-[39px] items-center gap-2 rounded-3xl bg-[#ffffff] p-1">
            <LuCalendarX2 />
            Date{" "}
            <span className="flex items-center gap-2 rounded-3xl bg-[#F2F4F7] p-1">
              Monthly
              <AiOutlineDown />
            </span>
          </Text>
        </div>
      </div>
      <TransactionDashboard />
    </>
  );
};

export default Dashboard;
