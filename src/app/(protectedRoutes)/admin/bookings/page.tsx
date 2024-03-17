"use client";

import React from "react";

import AllBookings from "@/components/admin/Bookings";
import Layout from "@/components/admin/layout/Layout";
import Heading from "@/components/lib/Heading/Heading";

const Bookings = () => {
  return (
    <Layout>
      <div className="flex justify-between px-[50px] pt-[40px]">
        <div className=" items-center">
          <Heading className=" text-2xl text-[#101828]">Bookings</Heading>
        </div>
      </div>
      <AllBookings />
    </Layout>
  );
};

export default Bookings;
