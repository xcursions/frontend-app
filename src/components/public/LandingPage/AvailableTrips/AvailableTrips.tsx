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
          <h3>Available Trips</h3>
          <p>The best place you could spend the summer</p>
          <div className="slider">
            <p
              className={trip === "private" ? "active" : ""}
              onClick={() => setTrip("private")}
            >
              Personalized Trip
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
              .map((post: OutingProps, index: any) => (
                <div key={`${post.id}-${index}-${post.outingDestination.id}`}>
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
              <div key={`${index}-----${post.id}`}>
                <TripCard post={post} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default AvailableTrips;
