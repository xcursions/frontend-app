"use client";

import Image from "next/image";
import React from "react";

import Button from "@/components/lib/Button/Button";
import Heading from "@/components/lib/Heading";
import Text from "@/components/lib/Text";

import styles from "./booking.module.scss";

const Booking = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Heading className="pl-[24px] pt-[40px] font-dmSansBold text-[24px] text-[#101828] lg:pl-[40px]">
          Wallet
        </Heading>
        <Text className="pl-[24px] text-[14px] text-[#667084] lg:pl-[40px] lg:text-[16px]">
          Welcome back to your dashboard
        </Text>
        <div className={styles.card_container}>
          <div className={`${styles.card} lg:ml-[40px]`}>
            <div className="flex flex-row-reverse lg:flex-col">
              <Image
                src="/assets/images/dashboard/flight.png"
                width={150}
                height={150}
                alt="flight icon"
                className="mx-auto mt-[28px] max-w-[100px]"
              />
              <div className="mx-auto">
                <Text className="my-5 text-center font-dmSansMedium text-[18px] text-[#101828]">
                  Flights
                </Text>
                <Button className="mb-5 rounded-3xl bg-black">
                  Book Flight
                </Button>
              </div>
            </div>
          </div>
          <div className={`${styles.card}`}>
            <div className="flex flex-row-reverse lg:flex-col">
              <Image
                src="/assets/images/dashboard/trip.png"
                width={150}
                height={150}
                alt="flight icon"
                className="mx-auto mt-[28px] max-w-[100px] items-center"
              />
              <div className="mx-auto">
                <Text className="my-5 text-center font-dmSansMedium text-[18px] text-[#101828]">
                  Trips
                </Text>
                <Button className="mb-5 rounded-3xl bg-black">
                  Check Our Trips
                </Button>
              </div>
            </div>
          </div>
          <div className={`${styles.card}`}>
            <div className="flex flex-row-reverse lg:flex-col">
              <Image
                src="/assets/images/dashboard/accomodation.png"
                width={150}
                height={150}
                alt="flight icon"
                className="mx-auto mt-[28px] max-w-[100px] items-center"
              />
              <div className="mx-auto">
                <Text className="my-5 text-center font-dmSansMedium text-[18px] text-[#101828]">
                  Accomodations
                </Text>
                <Button className="mb-5 rounded-3xl bg-black">
                  Book Accomodations
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[48px] lg:ml-[40px] lg:mt-[40px]">
          <div className="flex justify-between pr-5">
            <Heading type="h3">Booking History</Heading>
            <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
              view all
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
