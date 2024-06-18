import React from "react";

import PrivacyPolicy from "@/components/privacyPolicy/PrivacyPolicy";
import Footer from "@/components/public/Footer/Footer";
import Subscription from "@/components/public/Subscription/Subscription";
import TopNavBar from "@/components/public/TopNavBar";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <TopNavBar />
        <PrivacyPolicy />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default page;
