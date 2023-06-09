import React from "react";

import Faq from "@/components/public/Faq/Faq";
import Footer from "@/components/public/Footer";
import Header from "@/components/public/LandingPage/Header/Header";
import Testimonies from "@/components/public/LandingPage/Testimonies/Testimonies";
import TopDestinations from "@/components/public/LandingPage/TopDestinations/TopDestinations";
import WhyChooseUs from "@/components/public/LandingPage/WhyChooseUs/WhyChooseUs";
import Navbar from "@/components/public/Navbar/Navbar";
import Subscription from "@/components/public/Subscription";

const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
        <Header />
        <WhyChooseUs />
        <TopDestinations />
        <Testimonies />
        <Faq />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
