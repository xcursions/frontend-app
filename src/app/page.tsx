import React from "react";

// import Faq from "@/components/public/Faq/Faq";
import Footer from "@/components/public/Footer";
import AvailableEvents from "@/components/public/LandingPage/AvailableEvents/AvailableEvents";
import AvailableTrips from "@/components/public/LandingPage/AvailableTrips";
import CardSlider from "@/components/public/LandingPage/CardSlider/CardSlider";
import HowItWorks from "@/components/public/LandingPage/HowItWorks";
import { ImageSlider } from "@/components/public/LandingPage/ImageSlider/ImageSlider";
import OurBlog from "@/components/public/LandingPage/OurBlog/OurBlog";
import Search from "@/components/public/LandingPage/Search";
// import Testimonies from "@/components/public/LandingPage/Testimonies/Testimonies";
// import TopDestinations from "@/components/public/LandingPage/TopDestinations/TopDestinations";
import WhyChooseUs from "@/components/public/LandingPage/WhyChooseUs/WhyChooseUs";
import Navbar2 from "@/components/public/Navbar2";
// import Subscription from "@/components/public/Subscription";

const Home = () => {
  return (
    <main className="cod_page cod_homePage">
      <Navbar2 />
      <ImageSlider />
      <Search />
      <CardSlider />
      <WhyChooseUs />
      <HowItWorks />
      <AvailableTrips />
      <AvailableEvents />
      <OurBlog />
      {/* {/* <TopDestinations />
      <Testimonies />
      <div className="bg-[#ffffff]">
        <Faq />
        <Subscription />
      </div> */}
      <Footer />
    </main>
  );
};

export default Home;
