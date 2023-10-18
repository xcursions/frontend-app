"use client";

import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { LuCalendarX2 } from "react-icons/lu";

import TransactionDashboard from "@/components/admin/Dashboard";
import Layout from "@/components/admin/layout/Layout";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";
import { useAppSelector } from "@/hooks";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <Layout>
      <div className="flex justify-between px-[50px] pt-[40px]">
        <div>
          <Heading>
            Hello,{" "}
            {user?.profile?.username || user?.profile.fullName.split(" ")[0]}
            🏝️
          </Heading>
          <Text className="text-[#667084]">Welcome back to your dashboard</Text>
        </div>
        <div>
          <Text className="mt-7 flex items-center gap-2 rounded-3xl bg-[#ffffff] px-3 py-1">
            <LuCalendarX2 />
            Date{" "}
            <span className="flex items-center gap-2 rounded-3xl bg-[#F2F4F7] px-2 py-1">
              Monthly
              <AiOutlineDown />
            </span>
          </Text>
        </div>
      </div>
      <TransactionDashboard />
    </Layout>
  );
};

export default Dashboard;
