import React, { use } from "react";

import EventDetails from "@/components/events/EventDetails/EventDetails";
import RelatedEvents from "@/components/events/RelatedEvents/RelatedEvents";
import Footer from "@/components/public/Footer/Footer";
import Navbar from "@/components/public/Navbar/Navbar";
import Subscription from "@/components/public/Subscription/Subscription";

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
        <EventDetails detailsData={data} />
        <RelatedEvents />
        <Subscription />
        <Footer />
      </div>
    </main>
  );
};

export default Event;