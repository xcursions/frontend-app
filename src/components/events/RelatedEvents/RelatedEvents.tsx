"use client";

import Link from "next/link";
import React from "react";

import Heading from "@/components/lib/Heading";
import { useSearchOutingsQuery } from "@/services/public";
import type { OutingProps } from "@/types";

import EventCard from "../SearchEvents/EventCard/EventCard";

const RelatedEvents = () => {
  const { data: eventData, isSuccess: eventSuccess } =
    useSearchOutingsQuery("?type=event");
  return (
    <div>
      <div className="mx-auto mt-[70px] max-w-[1241px] px-3 lg:mt-[54px]">
        <Heading type="h3">Related Events</Heading>
        <div className="no-scrollbar flex overflow-x-auto scroll-smooth">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${eventData?.result?.length}, 1fr)`,
            }}
          >
            {eventSuccess &&
              eventData.result?.map((post: OutingProps) => (
                <Link href={`/events/${post.id}`} key={`${post.id}`}>
                  <EventCard post={post} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedEvents;
