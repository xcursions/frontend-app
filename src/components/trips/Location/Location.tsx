"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

import Button from "@/components/lib/Button";
import Loader from "@/components/lib/Loader";
import { RightArrowIcon } from "@/components/lib/Svg";
import { useGetOutingByContinentsQuery } from "@/services/public";

interface Props {
  continent: string;
  totalOuting: number;
}

const getImageSrc = (continent: string) => {
  switch (continent) {
    case "Africa":
      return "/assets/images/trip/africa.png"; // Replace with your actual image path
    case "Asia":
      return "/assets/images/trip/asia.png";
    case "Europe":
      return "/assets/images/trip/europe.png";
    case "North America":
      return "/assets/images/trip/north-america.png";
    case "South America":
      return "/assets/images/trip/south-america.png";
    case "Australia":
      return "/assets/images/trip/australia.png";
    case "Antarctica":
      return "/assets/images/trip/antartica.png";
    default:
      return "/images/default.jpg";
  }
};

const ContinentCard = ({ continent, totalOuting }: Props) => (
  <Link
    className=" relative w-full max-w-[95vw] cursor-pointer rounded-[24px] md:max-w-[45vw] lg:max-w-[30vw] xl:max-w-[390px]"
    href={`/trips/${continent.toLowerCase()}`}
  >
    <Image
      width={390}
      height={256}
      alt={continent}
      src={getImageSrc(continent)}
      className="w-full rounded-[24px]"
    />
    <h3 className="absolute inset-x-0 top-0 m-2 overflow-hidden text-center font-dmSans text-[49px] font-bold text-white">
      {continent}
    </h3>
    <div className=" absolute right-[10px] top-[10px] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-white">
      <AiOutlineHeart className="text-lg" />
    </div>
    <Button className="absolute bottom-[80px] right-[10px] flex items-center gap-2 rounded-3xl text-center">
      Explore Now
      <RightArrowIcon />
    </Button>
    <p className=" font-dmSansBold text-lg font-bold">{continent}</p>
    <p className=" font-dmSansMedium text-sm text-[#475467]">
      {totalOuting} Destinations
    </p>
  </Link>
);

const Location = () => {
  const { isSuccess, data } = useGetOutingByContinentsQuery({
    type: "tour",
  });
  return (
    <div className="w-full p-5">
      <div className="relative mx-auto min-h-[400px] max-w-[1241px]">
        <div className="flex flex-wrap justify-between gap-5">
          {isSuccess ? (
            data.map((val: Props, index: number | string) => (
              <ContinentCard
                key={index}
                continent={val.continent}
                totalOuting={val.totalOuting}
              />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;
