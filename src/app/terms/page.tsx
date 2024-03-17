import React from "react";

import PrivacyPolicy from "@/components/privacyPolicy/PrivacyPolicy";
import Footer from "@/components/public/Footer/Footer";
import Navbar2 from "@/components/public/Navbar2";
import Subscription from "@/components/public/Subscription/Subscription";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <Navbar2 />
        <PrivacyPolicy />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default page;
