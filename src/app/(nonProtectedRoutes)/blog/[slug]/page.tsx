import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import BlogDetails from "@/components/blog/BlogDetails/BlogDetails";
import Footer from "@/components/public/Footer/Footer";
import Subscription from "@/components/public/Subscription/Subscription";
import TopNavBar from "@/components/public/TopNavBar";
// import { useGetSingleBlogQuery } from "@/services/public";

async function getBlogData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/posts/${slug}`,
    { cache: "no-cache" }
  );
  if (!res.ok) return notFound();
  const data = await res.json();
  return data;
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  // fetch data
  const product = await getBlogData(params.slug);
  // const product = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/outing/outings/${id}`
  // ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${product.title}`,
    description: `${product?.description || ""}`,
    openGraph: {
      title: `${product.title}`,
      description: `${product?.description || ""}`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`,
      images: [
        {
          url: `${product.blogFeaturedImage.image}`,
          width: 800,
          height: 600,
          alt: `${product.title}`,
        },
        ...previousImages,
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    keywords: [
      "Excursions",
      "Travel",
      "Events",
      "Tourists",
      "Amazing locations",
      "Vacation",
      `${product.title}`,
      `${product?.description}`,
    ],
    twitter: {
      card: "summary_large_image",
      title: `${product.title} with Xcursions the number 1 travel and tourism company`,
      description: `${product?.description || ""} `,
      siteId: "",
      creator: "@xcursionsdotng",
      creatorId: "",
      images: [
        {
          url: `${product.blogFeaturedImage.image}`,
          width: 800,
          height: 600,
          alt: `${product.title}`,
        },
      ],
    },
  };
}

const Blog = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await getBlogData(slug);
  return (
    <div>
      <div className="bg-[#F9FAFB]">
        <TopNavBar />
        {data && <BlogDetails detailsData={data} />}
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
