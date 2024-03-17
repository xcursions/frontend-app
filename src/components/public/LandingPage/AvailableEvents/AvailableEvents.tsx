"use client";

import Link from "next/link";
import React from "react";

import Button from "@/components/lib/Button";
import { useSearchOutingsQuery } from "@/services/public";
import type { OutingProps } from "@/types";

import TripCard from "../AvailableTrips/TripCard";

const AvailableEvents = () => {
  const { data: eventData, isSuccess: eventSuccess } =
    useSearchOutingsQuery(`?type=event&limit=20`);
  return (
    <>
      {eventData?.result?.length > 0 ? (
        <div className="xcursion_availableTrips_wrapper">
          <div className="xcursion_availableTrips_header">
            <div>
              <h3>Events</h3>
              <p>The best place you could spend the summer</p>
            </div>
            <div className="button">
              <Link href={"/events"}>
                <Button className="rounded-[1000px]">View all</Button>
              </Link>
            </div>
          </div>
          <div className="xcursion_availableTrips_card">
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
                  .map((post: OutingProps, index: any) => (
                    <div
                      key={`${post.outingDestination.id}${post?.outingGallery[0]?.id}--${post.id}-${index}`}
                    >
                      <TripCard post={post} />
                    </div>
                  ))}
            </div>
          </div>
          <div className="xcursion_availableTrips_mobile_card">
            {eventSuccess &&
              eventData.result
                ?.filter(
                  (items: OutingProps) =>
                    items.outingGallery.length > 0 &&
                    parseInt(items.outingChargePlan.costGroup, 10) > 1 &&
                    items.outingChargePlan
                )
                .slice(0, 4)
                .map((post: OutingProps, index: any) => (
                  <div
                    key={` ${index}----${post.id}${post?.outingGallery[0]?.id}`}
                  >
                    <TripCard post={post} />
                  </div>
                ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AvailableEvents;
