import React from "react";

import Header from "@/components/aboutUs/Header";
import Main from "@/components/aboutUs/Main";
import Footer from "@/components/public/Footer/Footer";
import Subscription from "@/components/public/Subscription/Subscription";
import TopNavBar from "@/components/public/TopNavBar";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <TopNavBar />
        <Header />
        <Main />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default page;
