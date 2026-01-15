import React from "react";

import TermsConditions from "@/components/privacyPolicy/TermsConditions";
import Footer from "@/components/public/Footer/Footer";
import Subscription from "@/components/public/Subscription/Subscription";
import TopNavBar from "@/components/public/TopNavBar";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <TopNavBar />
        <TermsConditions />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default page;
