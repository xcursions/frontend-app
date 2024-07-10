import type { Metadata, ResolvingMetadata } from "next";
import React from "react";

import Footer from "@/components/public/Footer/Footer";
import Subscription from "@/components/public/Subscription/Subscription";
import TopNavBar from "@/components/public/TopNavBar";
import Header from "@/components/trips/Header/Header";
import SearchTrips from "@/components/trips/SearchTrips/SearchTrips";

type Props = {
  params: { location: string };
};
const getImageSrc = (continent: string) => {
  switch (continent) {
    case "Africa":
      return "/assets/images/trip/africa.png"; // Replace with your actual image path
    case "Asia":
      return "/assets/images/trip/asia.png";
    case "Europe":
      return "/assets/images/trip/europe.png";
    case "North America":
      return "/assets/images/trip/north-america.png";
    case "South America":
      return "/assets/images/trip/south-america.png";
    case "Australia":
      return "/assets/images/trip/australia.png";
    case "Antarctica":
      return "/assets/images/trip/antartica.png";
    default:
      return "/images/default.jpg";
  }
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `Top exotic vacation location around ${params.location}`,
    description: `Book trips to exotic locations around ${params.location}, spend your vacation, holidays. Xcursions`,
    openGraph: {
      title: `Top exotic vacation location around ${params.location}`,
      description: `Book trips to exotic locations around ${params.location}, spend your vacation, holidays. Xcursions`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/trips/${params.location}`,
      images: [
        {
          url: `${getImageSrc(params.location)}`,
          width: 800,
          height: 600,
          alt: `${params.location}`,
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
      `${params.location}`,
    ],
    twitter: {
      card: "summary_large_image",
      title: `Top exotic vacation location around ${params.location}`,
      description: `Book trips to exotic locations around ${params.location}, spend your vacation, holidays. Xcursions`,
      siteId: "",
      creator: "@xcursionsdotng",
      creatorId: "",
      images: [
        {
          url: `${getImageSrc(params.location)}`,
          width: 800,
          height: 600,
          alt: `${params.location}`,
        },
      ],
    },
  };
}

const trips = ({ params }: { params: { location: string } }) => {
  const { location } = params;
  return (
    <div className="bg-[#ffffff]">
      <div>
        <TopNavBar />
        <Header />
        <SearchTrips location={decodeURIComponent(location)} />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
};

export default trips;
