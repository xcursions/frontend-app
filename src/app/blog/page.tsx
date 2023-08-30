import React from "react";

import Header from "@/components/blog/Header";
import Navbar from "@/components/public/Navbar";

const Blog = () => {
  return (
    <div>
      <div>
        <Navbar text={"white"} logo={"white"} />
        <Header />
      </div>
    </div>
  );
};

export default Blog;
