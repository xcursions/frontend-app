import React from "react";

import Header from "@/components/blog/Header";
import Footer from "@/components/public/Footer";
import Navbar from "@/components/public/Navbar";
import Subscription from "@/components/public/Subscription";

const Blog = () => {
  return (
    <div>
      <div>
        <Navbar text={"white"} logo={"white"} />
        <Header />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
