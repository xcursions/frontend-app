import React from "react";

import Header from "@/components/blog/Header";
import Footer from "@/components/public/Footer";
import Navbar2 from "@/components/public/Navbar2";
import Subscription from "@/components/public/Subscription";

const Blog = () => {
  return (
    <div>
      <div>
        <Navbar2 />
        <Header />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
