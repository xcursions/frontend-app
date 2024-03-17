import React from "react";

import Header from "@/components/aboutUs/Header";
import Main from "@/components/aboutUs/Main";
import Footer from "@/components/public/Footer/Footer";
import Navbar2 from "@/components/public/Navbar2";
import Subscription from "@/components/public/Subscription/Subscription";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <Navbar2 />
        <Header />
        <Main />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default page;
