import React from "react";

import Header from "@/components/public/LandingPage/Header/Header";
import WhyChooseUs from "@/components/public/LandingPage/WhyChooseUs/WhyChooseUs";
import Navbar from "@/components/public/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
        <Header />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default Home;
