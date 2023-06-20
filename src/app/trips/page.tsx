import React from "react";

import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";
import Header from "@/components/trips/Header/Header";
import SearchTrips from "@/components/trips/SearchTrips/SearchTrips";

const trips = () => {
  return (
    <div>
      <div>
        <Navbar text={"black"} logo={"black"} />
        <Header />
        <SearchTrips />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default trips;
