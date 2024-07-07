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
              <h3>Event Lineup</h3>
              <p>
                Not traveling yet? Experience culture, entertainment & all round
                fun from our carefully curated event list
              </p>
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
                  .map((post: OutingProps) => (
                    <TripCard post={post} key={`${post.id}`} />
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
                .map((post: OutingProps) => (
                  <TripCard post={post} key={`${post.id}`} />
                ))}
          </div>
          <div className=" mt-2 flex items-center justify-center md:hidden">
            <Link href={"/events"}>
              <Button className="rounded-[1000px]">View all</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AvailableEvents;
