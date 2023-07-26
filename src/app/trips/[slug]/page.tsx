import React, { use } from "react";

import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";
import RelatedTrips from "@/components/trips/RelatedTrips";
import TripDetails from "@/components/trips/TripDetails/TripDetails";

async function getOutingData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/outing/outings/${slug}`,
    { cache: "default" }
  );
  const data = await res.json();
  return data;
}

const Event = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = use(getOutingData(slug));

  return (
    <main>
      <div className="bg-[#ffffff]">
        <Navbar text={"black"} logo={"black"} />
        <TripDetails detailsData={data} />
        <RelatedTrips />
        <Subscription />
        <Footer />
      </div>
    </main>
  );
};

export default Event;
