import React from "react";

import Header from "@/components/aboutUs/Header";
import Main from "@/components/aboutUs/Main";
import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <Navbar text={"black"} logo={"black"} />
        <Header />
        <Main />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default page;
