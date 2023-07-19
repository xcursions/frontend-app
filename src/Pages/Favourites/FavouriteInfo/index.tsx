"use client";

import React, { useState } from "react";

import Heading from "@/components/lib/Heading";
import Text from "@/components/lib/Text/Text";

import styles from "./FavouriteInfo.module.scss";

const FavouriteInfo = () => {
  const [isTrip, setIsTrip] = useState(false);
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
        <div className="mx-auto p-10 ">
          {isTrip ? (
            <Text className="my-20 font-dmSansBold text-[24px] ">
              No Favourite Trips has been added yet
            </Text>
          ) : (
            <Text className="my-20 font-dmSansBold text-[24px] ">
              No Favourite Events has been added yet
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouriteInfo;
