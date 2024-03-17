import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import Footer from "@/components/public/Footer/Footer";
import Navbar2 from "@/components/public/Navbar2";
import Subscription from "@/components/public/Subscription/Subscription";
import RelatedTrips from "@/components/trips/RelatedTrips";
import TripDetails from "@/components/trips/TripDetails/TripDetails";
// import { useSearchOutingsQuery } from "@/services/public";

async function getOutingData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/outing/outings/${slug}`,
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
  const product = await getOutingData(params.slug);
  // const product = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/outing/outings/${id}`
  // ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: `${product.name} with Xcursions the number 1 travel and tourism company`,
    description: `${product.description}`,
    openGraph: {
      title: `${product.name} with Xcursions the number 1 travel and tourism company`,
      description: `${product.description}`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/trips/${params.slug}`,
      images: [
        {
          url: `${product.outingGallery[0].image}`,
          width: 800,
          height: 600,
          alt: `${product.name}`,
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
      `${product.name}`,
    ],
    twitter: {
      card: "summary_large_image",
      title: `${product.name} with Xcursions the number 1 travel and tourism company`,
      description: `${product.description}`,
      siteId: "",
      creator: "@xcursionsdotng",
      creatorId: "",
      images: [
        {
          url: `${product.outingGallery[0].image}`,
          width: 800,
          height: 600,
          alt: `${product.name}`,
        },
      ],
    },
  };
}
const Event = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  // const { data, isSuccess } = useSearchOutingsQuery(`/${slug}`);
  const data = await getOutingData(slug);
  // if (isSuccess && !data) {
  //   notFound();
  // }
  return (
    <main>
      <div className="bg-[#ffffff]">
        <Navbar2 />
        {data && <TripDetails detailsData={data} />}
        {/* {isSuccess && <TripDetails detailsData={data} />} */}
        <RelatedTrips />
        <Subscription />
        <Footer />
      </div>
    </main>
  );
};

export default Event;
