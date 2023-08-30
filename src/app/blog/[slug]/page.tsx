"use client";

import { notFound } from "next/navigation";
import React from "react";

import BlogDetails from "@/components/blog/BlogDetails/BlogDetails";
import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";
import { useGetSingleBlogQuery } from "@/services/public";

const Blog = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const { data, isSuccess } = useGetSingleBlogQuery(slug);
  if (isSuccess && !data) {
    notFound();
  }
  return (
    <div>
      <div>
        <Navbar text={"white"} logo={"white"} />
        {isSuccess && <BlogDetails detailsData={data} />}
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
