import React from "react";

import Header from "@/components/blog/Header";
import Footer from "@/components/public/Footer";
import Subscription from "@/components/public/Subscription";
import TopNavBar from "@/components/public/TopNavBar";

const Blog = () => {
  return (
    <div>
      <div>
        <TopNavBar />
        <Header />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
