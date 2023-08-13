"use client";

import Link from "next/link";
import React, { useState } from "react";

import EventCard from "@/components/lib/EventCard/EventCard";
import Heading from "@/components/lib/Heading";
import Text from "@/components/lib/Text/Text";
import TripCard from "@/components/lib/TripCard/TripCard";
import { useGetOutingLikeQuery } from "@/services/user";

import styles from "./FavouriteInfo.module.scss";

const FavouriteInfo = () => {
  const [isTrip, setIsTrip] = useState(false);
  const { data: likedData } = useGetOutingLikeQuery("");
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Heading type="h1" className="ml-5 py-4 text-[18px]">
          Favourite
        </Heading>
      </div>
      <div className={styles.wrapper}>
        <div className="flex gap-5 p-4">
          <p
            onClick={() => setIsTrip(true)}
            className={`${
              isTrip ? "font-extrabold underline decoration-sky-500" : ""
            } cursor-pointer font-dmSansRegular text-[16px]`}
          >
            Trips
          </p>
          <p
            onClick={() => setIsTrip(false)}
            className={`${
              !isTrip ? "font-extrabold underline decoration-sky-500" : ""
            } cursor-pointer font-dmSansRegular text-[16px]`}
          >
            Events
          </p>
        </div>
        <div className="mx-auto lg:p-10 ">
          {isTrip ? (
            <div className="no-scrollbar flex max-w-[702px] overflow-x-auto scroll-smooth">
              <div
                className=" grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${likedData?.result?.length}, 1fr)`,
                }}
              >
                {isTrip &&
                  likedData?.result
                    ?.filter((res: any) => res.outing.type === "tour")
                    ?.map((post: any) => (
                      <Link
                        href={`/trips/${post.outing.id}`}
                        key={`${post.id}`}
                      >
                        <TripCard post={post.outing} liked={true} />
                      </Link>
                    ))}
              </div>
              {likedData?.result?.filter(
                (res: any) => res.outing.type === "tour"
              ).length === 0 && (
                <Text className="my-20 font-dmSansBold text-[24px] ">
                  No Favourite Trip has been added yet
                </Text>
              )}
            </div>
          ) : (
            <div className="no-scrollbar flex max-w-[702px] overflow-x-auto scroll-smooth">
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${likedData?.result?.length}, 1fr)`,
                }}
              >
                {likedData?.result
                  ?.filter((res: any) => res.outing.type === "event")
                  ?.map((post: any) => (
                    <Link href={`/events/${post.outing.id}`} key={`${post.id}`}>
                      <EventCard post={post.outing} liked={true} />
                    </Link>
                  ))}
              </div>
              {likedData?.result?.filter(
                (res: any) => res.outing.type === "event"
              ).length === 0 && (
                <Text className="my-20 font-dmSansBold text-[24px] ">
                  No Favourite Event has been added yet
                </Text>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouriteInfo;
