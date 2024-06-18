import React from "react";

import Header from "@/components/events/Header/Header";
import SearchEvents from "@/components/events/SearchEvents";
import Footer from "@/components/public/Footer/Footer";
import Subscription from "@/components/public/Subscription/Subscription";
import TopNavBar from "@/components/public/TopNavBar";

const events = () => {
  return (
    <>
      <TopNavBar />

      <div className="bg-[#ffffff]">
        <Header />
        <SearchEvents />
        <Subscription />
        <Footer />
      </div>
    </>
  );
};

export default events;
