import React from "react";

import PrivacyPolicy from "@/components/privacyPolicy/PrivacyPolicy";
import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <Navbar text={"black"} logo={"black"} />
        <PrivacyPolicy />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default page;
