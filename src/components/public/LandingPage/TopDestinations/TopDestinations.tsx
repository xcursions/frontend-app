"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import Button from "@/components/lib/Button/Button";
import {
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  Gallery5,
  Gallery6,
  Gallery7,
  Gallery8,
  Gallery9,
  Gallery10,
  Gallery11,
  Gallery12,
  WomanLandscape,
} from "@/components/lib/Cloudinary/Cloudinary";
import Heading from "@/components/lib/Heading/Heading";
import Text from "@/components/lib/Text/Text";
import TripCard from "@/components/trips/SearchTrips/TripCard/TripCard";
import { useGetAllOutingsQuery } from "@/services/public";

import styles from "./TopDestinations.module.scss";

const TopDestinations = () => {
  const { data, isSuccess } = useGetAllOutingsQuery("?type=event");
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.textcontainer}>
          <Heading
            className=" font-dmSansMedium text-[36px] text-[#101828]"
            type="h3"
          >
            Book Your Next Adventure in 3 Easy Steps
          </Heading>
          <div className="font-dmSansMedium">
            <div className="flex items-start gap-3">
              <p className="h-fit w-fit rounded-full bg-[#0A83FF] px-2 py-[2px] text-xs text-[#ffffff]">
                1
              </p>
              <div className="">
                <Text className="font-dmSansMedium text-[16px] text-[#101828]">
                  Discover
                </Text>
                <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                  Explore our diverse range of thrilling trips.
                </Text>
              </div>
            </div>
            <div className="mt-[24px] flex items-start gap-3">
              <p className="h-fit w-fit rounded-full bg-[#0A83FF] px-2 py-[3px] text-xs text-[#ffffff]">
                2
              </p>
              <div className="">
                <Text className="font-dmSansMedium text-[16px] text-[#101828]">
                  Select
                </Text>
                <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                  Choose your desired adventure and explore the details.
                </Text>
              </div>
            </div>
            <div className="mt-[24px] flex items-start gap-3">
              <p className="h-fit w-fit rounded-full bg-[#0A83FF] px-2 py-[3px] text-xs text-[#ffffff]">
                3
              </p>
              <div className="">
                <Text className="font-dmSansMedium text-[16px] text-[#101828]">
                  Reserve
                </Text>
                <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                  Secure your spot quickly and easily for an unforgettable
                  experience.
                </Text>
              </div>
            </div>
          </div>
          <Link href="/trips">
            <Button className="max-w-[174px] rounded-3xl bg-[#0A83FF] hover:bg-blue-400">
              Book Now
            </Button>
          </Link>
        </div>
        <div className={styles.imagecontainer}>
          <Image
            src={WomanLandscape.url}
            title={WomanLandscape.title}
            alt={WomanLandscape.alt}
            width={452}
            height={500}
            className=""
          />
        </div>
      </div>
      {isSuccess &&
        data?.result.filter(
          (res: { showInLandingPage: any }) => res.showInLandingPage
        ).length > 0 && (
          <div className="mx-auto max-w-[1240px]">
            <div className="content-center justify-center pt-[96px]">
              <Text className="items-center justify-center text-center font-dmSansBold text-[12px] font-bold text-[#0A83FF]">
                TOP EVENTS
              </Text>
              <Text className="items-center justify-center text-center font-dmSansBold text-[24px] text-[#101828] lg:text-[36px]">
                Top Events and Hangouts
              </Text>
            </div>
            <div className="no-scrollbar mb-[50px] flex max-w-[1240px] overflow-x-auto scroll-smooth">
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${
                    data?.result?.filter(
                      (res: { showInLandingPage: any }) => res.showInLandingPage
                    ).length
                  }, 1fr)`,
                }}
              >
                {isSuccess &&
                  data?.result
                    .filter(
                      (res: { showInLandingPage: any }) => res.showInLandingPage
                    )
                    .map((post: any) => (
                      <Link key={`${post.id}`} href={`/events/${post.id}`}>
                        <TripCard post={post} />
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        )}
      {/* Gallery */}
      <div className="relative mx-auto grid max-w-[1240px] grid-cols-2 gap-4 md:grid-cols-4">
        <div className="absolute bottom-[45%] left-[40%]">
          <img
            src="/assets/images/gallery/text.png"
            alt=""
            className="hidden max-h-[136px] max-w-[270px] rounded-lg lg:block"
          />
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery1.url}
              alt={Gallery1.alt}
              title={Gallery1.title}
              width={350}
              height={350}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery2.url}
              alt={Gallery2.alt}
              title={Gallery2.title}
              width={350}
              height={350}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery3.url}
              alt={Gallery3.alt}
              title={Gallery3.title}
              width={350}
              height={350}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery4.url}
              alt={Gallery4.alt}
              title={Gallery4.title}
              width={350}
              height={350}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery5.url}
              alt={Gallery5.alt}
              title={Gallery5.title}
              width={350}
              height={350}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery6.url}
              alt={Gallery6.alt}
              title={Gallery6.title}
              width={350}
              height={350}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery7.url}
              alt={Gallery7.alt}
              title={Gallery7.title}
              width={350}
              height={350}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery8.url}
              alt={Gallery8.alt}
              title={Gallery8.title}
              width={350}
              height={350}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery9.url}
              alt={Gallery9.alt}
              title={Gallery9.title}
              width={350}
              height={350}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery10.url}
              alt={Gallery10.alt}
              title={Gallery10.title}
              width={350}
              height={350}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery11.url}
              alt={Gallery11.alt}
              title={Gallery11.title}
              width={350}
              height={350}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src={Gallery12.url}
              alt={Gallery12.alt}
              title={Gallery12.title}
              width={350}
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDestinations;
