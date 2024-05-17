"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Button from "@/components/lib/Button";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import { useGetAllBlogQuery } from "@/services/public";
import type BlogProps from "@/types/BlogProps";

const OurBlog = () => {
  const [blogData, setBlogData] = useState<BlogProps[]>([]);
  const { data: blogDetails, isSuccess: blogSuccess } = useGetAllBlogQuery({
    pageLimit: 4,
    currentPage: 1,
    search: "",
  });
  useSuccessHandler({
    isSuccess: blogSuccess,
    showToast: false,
    dependencies: [blogDetails],
    successFunction: () => {
      if (blogDetails.result.length > 0) {
        setBlogData(blogDetails.result);
      }
    },
  });
  return (
    <>
      {blogDetails?.result?.length > 0 ? (
        <div className="xcursion_availableTrips_wrapper mb-10">
          <div className="xcursion_availableTrips_header">
            <div>
              <h3>Our Blog</h3>
              <p>
                Discover trendy travel news, insights, and everything else you
                need to know about travel and tours
              </p>
            </div>
            <div className="button">
              <Link href={"/blog"}>
                <Button className="rounded-[1000px]">View all</Button>
              </Link>
            </div>
          </div>
          <div className="mx-3 mt-5 grid grid-cols-1 gap-3 object-fill sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogData.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}`}>
                <div>
                  <Image
                    width={350}
                    height={273}
                    alt={blog.title}
                    src={blog.blogFeaturedImage.image}
                    className="h-[273px] w-full rounded-xl object-cover"
                  />
                  <p className="txt-10 fw-700 mt-2 break-words uppercase text-[#667084]">
                    {blog.categories.length > 0
                      ? blog?.categories[0]?.name
                      : null}{" "}
                    <span> • {blog.readTimeInMinute} MINS Read</span>
                  </p>
                  <h4 className="txt-18 fw-700 txt-truncate">{blog.title}</h4>
                </div>
              </Link>
            ))}
          </div>
          <div className=" mt-2 flex items-center justify-center md:hidden">
            <Link href={"/blog"}>
              <Button className="rounded-[1000px]">View all</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OurBlog;
