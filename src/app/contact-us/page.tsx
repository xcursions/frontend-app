import React from "react";

import Form from "@/components/contactUs/Form";
import Header from "@/components/contactUs/Header";
import Footer from "@/components/public/Footer/Footer";
import Navbar2 from "@/components/public/Navbar2";
import Subscription from "@/components/public/Subscription/Subscription";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <Navbar2 />
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
