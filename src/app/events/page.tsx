import React from "react";

import Header from "@/components/events/Header/Header";
import SearchEvents from "@/components/events/SearchEvents";
import Footer from "@/components/public/Footer/Footer";
import Navbar2 from "@/components/public/Navbar2";
import Subscription from "@/components/public/Subscription/Subscription";

const events = () => {
  return (
    <div className="bg-[#ffffff]">
      <Navbar2 />
      <Header />
      <SearchEvents />
      <Subscription />
      <Footer />
    </div>
  );
};

export default events;
