import React from "react";

import Footer from "@/components/public/Footer/Footer";
import Subscription from "@/components/public/Subscription/Subscription";
import TopNavBar from "@/components/public/TopNavBar";
import Header from "@/components/trips/Header/Header";
import Location from "@/components/trips/Location/Location";

const trips = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <TopNavBar />
        <Header />
        <Location />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default trips;
