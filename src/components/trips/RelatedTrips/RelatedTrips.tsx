"use client";

import Link from "next/link";
import React from "react";

import Heading from "@/components/lib/Heading";
import { useSearchOutingsQuery } from "@/services/public";
import type { OutingProps } from "@/types";

import TripCard from "../SearchTrips/TripCard/TripCard";

const RelatedTrips = () => {
  const { data: eventData, isSuccess: eventSuccess } = useSearchOutingsQuery(
    "?type=tour&limit=15"
  );
  return (
    <div>
      <div className="mx-auto mt-[70px] max-w-[1241px] px-3 lg:mt-[54px]">
        <Heading type="h3">Related Trips</Heading>
        <div className="no-scrollbar flex overflow-x-auto scroll-smooth">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${eventData?.result?.length}, 1fr)`,
            }}
          >
            {eventSuccess &&
              eventData.result
                ?.filter(
                  (items: OutingProps) =>
                    items.outingGallery.length > 0 &&
                    parseInt(items.outingChargePlan.costGroup, 10) > 1 &&
                    items.outingChargePlan
                )
                .map((post: OutingProps) => (
                  <Link
                    href={`/trips/${post.outingDestination.continent.toLowerCase()}/${
                      post.slug
                    }`}
                    key={`${post.id}`}
                  >
                    <TripCard post={post} />
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedTrips;
