import React from "react";

import Header from "@/components/events/Header/Header";
import SearchEvents from "@/components/events/SearchEvents";
import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";

const events = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <Navbar text={"black"} logo={"black"} />
        <Header />
        <SearchEvents />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default events;
