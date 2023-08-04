import React from "react";

import Form from "@/components/contactUs/Form";
import Header from "@/components/contactUs/Header";
import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";

const page = () => {
  return (
    <div className="bg-[#ffffff]">
      <div>
        <Navbar text={"black"} logo={"black"} />
        <Header />
        <Form />
        {/* <Map /> */}
        <div
          style={{
            backgroundImage: "url('/assets/images/contact/contact_map.png')",
          }}
        >
          <img
            src="/assets/images/contact/contact_map.png"
            alt="map"
            className="relative w-screen"
          />
          <Subscription />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
