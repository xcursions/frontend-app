import React from "react";

import Form from "@/components/contactUs/Form";
import Header from "@/components/contactUs/Header";
import Footer from "@/components/public/Footer/Footer";
import Subscription from "@/components/public/Subscription/Subscription";
import TopNavBar from "@/components/public/TopNavBar";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <TopNavBar />
        <Header />
        <Form />
        {/* <Map /> */}
        <div
          style={{
            backgroundImage: "url('/assets/images/contact/contact_map.jpeg')",
          }}
        >
          <img
            src="/assets/images/contact/contact_map.jpeg"
            alt="map"
            className="relative mt-14 max-h-[550px] w-screen"
          />
          <Subscription />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
