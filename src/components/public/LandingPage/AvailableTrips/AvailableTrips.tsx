"use client";

import Link from "next/link";
import React, { useState } from "react";

import Button from "@/components/lib/Button";
import { useSearchOutingsQuery } from "@/services/public";
import type { OutingProps } from "@/types";

import TripCard from "./TripCard";

const AvailableTrips = () => {
  const [trip, setTrip] = useState<"private" | "group">("group");
  const { data: eventData, isSuccess: eventSuccess } = useSearchOutingsQuery(
    `?type=tour&limit=20&subType=${trip}`
  );
  return (
    <div className="xcursion_availableTrips_wrapper">
      <div className="xcursion_availableTrips_header">
        <div>
          <h3>Must-See Adventures in 2024</h3>
          <p>
            Go all in with these fun-filled adventures carefully curated to
            create your most memorable year yet
          </p>
          <div className="slider">
            <p
              className={trip === "private" ? "active" : ""}
              onClick={() => setTrip("private")}
            >
              Personalised Trip
            </p>
            <p
              className={trip === "group" ? "active" : ""}
              onClick={() => setTrip("group")}
            >
              Group Trip
            </p>
          </div>
        </div>
        <div className="button">
          <Link href={"/trips"}>
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
        <Link href={"/trips"}>
          <Button className="rounded-[1000px]">View all</Button>
        </Link>
      </div>
    </div>
  );
};

export default AvailableTrips;
