import React from "react";

import Footer from "@/components/public/Footer/Footer";
import Navbar2 from "@/components/public/Navbar2";
import Subscription from "@/components/public/Subscription/Subscription";
import Header from "@/components/trips/Header/Header";
import SearchTrips from "@/components/trips/SearchTrips/SearchTrips";

const trips = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <Navbar2 />
        <Header />
        <SearchTrips />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default trips;
