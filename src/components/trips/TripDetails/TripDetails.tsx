"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toaster from "react-hot-toast";
import {
  AiOutlineArrowLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { TbCalendar } from "react-icons/tb";

import Button from "@/components/lib/Button";
import { formatDatesRange } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import GalleryViewer from "@/components/lib/GalleryViewer";
import Heading from "@/components/lib/Heading/Heading";
import MapComponent from "@/components/lib/MapComponent/MapComponent";
import OutingGallery from "@/components/lib/OutingGallery/OutingGallery";
import Text from "@/components/lib/Text/Text";
import { useGetOutingAddOnQuery } from "@/services/public";
import type { OutingProps } from "@/types";

import Addon from "../Addon/Addon";
import styles from "./TripDetails.module.scss";

type Props = {
  detailsData: OutingProps;
};
const initialState = {
  count: 0,
  id: "",
};
const TripDetails = ({ detailsData }: Props) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState("group");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const { data: outingData, isSuccess: outingSuccess } = useGetOutingAddOnQuery(
    detailsData.id
  );
  const router = useRouter();
  const handleOpen = () => {
    setGalleryOpen(true);
  };
  const handleClose = () => {
    setGalleryOpen(false);
  };
  const toggleModal = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const handleCopyLink = () => {
    const linkToCopy = window.location.href;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => toaster("Link copied to clipboard!"))
      .catch((err) => toaster("Failed to copy link:", err));
  };
  const handleSelect = (trip: React.SetStateAction<string>) => {
    setSelectedTrip(trip);
  };
  //  console.log(detailsData);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.back} onClick={router.back}>
          <AiOutlineArrowLeft />
          Go back Home
        </p>
        <div className={styles.card_container}>
          <div className={styles.image_container}>
            {detailsData.outingGallery[0] && (
              <OutingGallery
                coverImages={detailsData.outingGallery}
                handleOpen={handleOpen}
              />
            )}
            <div className={styles.map}>
              <Text className="py-5 font-dmSansMedium text-[24px] text-[#1D2838]">
                What is Included
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {outingSuccess &&
                  outingData
                    .filter((trip: { default: any }) => trip.default)
                    .map(
                      (
                        info: React.JSX.IntrinsicAttributes & {
                          name: string;
                          description: string;
                          icon: string;
                          cost: string;
                        },
                        index: React.Key | null | undefined
                      ) => <Addon key={index} {...info} />
                    )}
                <div className="m-[10px] flex items-center justify-center rounded-[20px] bg-[#F2F4F7] text-center lg:h-[223px] lg:w-[223px]">
                  <div
                    className="flex cursor-pointer flex-col items-center justify-center"
                    onClick={toggleModal}
                  >
                    <BiPlus className="text-[30px]" />
                    <Text className="text-[16px]">New Addons</Text>
                    <Text className="mt-[5px] text-[12px] text-[#23262F]">
                      You can add other things you want on your trip here
                    </Text>
                  </div>
                </div>
              </div>
              <Text className="py-5 font-dmSansMedium text-[24px] text-[#1D2838]">
                Top Reviews
              </Text>
              <Text className="font-dmSansMediumItalic text-[18px] text-gray-400">
                No Reviews yet
              </Text>
              <Text className="pb-3 font-dmSansMedium text-[24px] text-[#1D2838]">
                Pickup City
              </Text>
              <MapComponent events={detailsData.outingPickup} />
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.icons}>
              <AiOutlineShareAlt
                className={styles.icon}
                onClick={handleCopyLink}
              />
              <GrFavorite className={styles.icon} />
            </div>
            <Heading
              type="h1"
              className="text-[24px] text-[#101828] lg:text-[36px]"
            >
              {detailsData.name}
            </Heading>
            <div
              className="text-[14px] text-[#667084]"
              dangerouslySetInnerHTML={{ __html: detailsData.description }}
            />
            <div className="mt-8 rounded-2xl border bg-[#ffffff] shadow-md">
              <div className="mx-auto pl-4">
                <div className="mr-3 flex pt-[30px]">
                  <div
                    onClick={() => handleSelect("private")}
                    className={`flex-1 rounded-3xl py-2 text-center text-[14px] ${
                      selectedTrip === "private"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-[#667084]"
                    } cursor-pointer`}
                  >
                    Private Trip
                  </div>
                  <div
                    onClick={() => handleSelect("group")}
                    className={`ml-[-15px] flex-1 rounded-3xl py-2 text-center text-[14px] ${
                      selectedTrip === "group"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-[#667084]"
                    } cursor-pointer`}
                  >
                    Group Trip
                  </div>
                </div>
                <Text className="mb-3 mt-[30px] flex items-center gap-3 font-dmSansRegular text-[14px] text-[#101828]">
                  <TbCalendar className=" text-xl" />
                  {formatDatesRange(
                    detailsData.outingDate[0].startDate,
                    detailsData.outingDate[0].endDate
                  )}
                </Text>
                <Text className="flex items-center gap-3 font-dmSansRegular text-[12px] text-[#101828]">
                  <FaRegClock className=" text-xl" />
                  No Depature time available
                </Text>
                <div className="my-5 mr-2 items-center justify-center">
                  <hr className="border-t-1 grow border-[#E4E7EC]" />
                </div>
                <div className="my-5 mr-3 flex justify-between">
                  <Text className="font-dmSansRegular text-[16px]">
                    Price of Ticket
                  </Text>
                  <Text className="font-dmSansBold text-[16px] text-[#0A83FF]">
                    ₦{parseInt(detailsData.price, 10).toLocaleString()}
                  </Text>
                </div>
                <div className="my-5 mr-3 flex justify-between">
                  <Text className="font-dmSansRegular text-[16px]">
                    Number of Ticket
                  </Text>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={payload.count === 0}
                      onClick={() =>
                        setPayload({
                          ...payload,
                          count: payload.count - 1,
                        })
                      }
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="text-[18px]"> {payload.count}</span>
                    <button
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                      onClick={() =>
                        setPayload({ ...payload, count: payload.count + 1 })
                      }
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <div className="my-5 mr-2 items-center justify-center">
                  <hr className="border-t-1 grow border-[#E4E7EC]" />
                </div>
                <div className="my-5 mr-3 pb-3 ">
                  <Link
                    href={`/checkout/?outing=${detailsData.id}&count=${payload.count}`}
                    className="w-full"
                  >
                    <Button
                      className="w-full rounded-3xl"
                      disabled={payload.count === 0}
                    >
                      Get Ticket
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isCalendarOpen && (
          <>
            <div
              className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
              onClick={toggleModal}
            ></div>
            <div className="fixed inset-0 z-[32] flex w-[326px] items-center justify-center lg:left-[422px] lg:w-[597px]">
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <p
                  className="cursor-pointer text-end font-dmSansBold text-[16px] text-[#98A2B3]"
                  onClick={toggleModal}
                >
                  X
                </p>
                <div className="mx-auto items-center text-center">
                  <Heading type="h3">Addons for your Travel</Heading>
                  <div className="grid grid-cols-3 gap-3 py-5">
                    {outingSuccess &&
                      outingData
                        .filter((trip: any) => !trip.default)
                        .map((item: any) => {
                          return (
                            <div
                              key={item.id}
                              className="flex items-center gap-2 rounded-3xl border pl-2 shadow-md"
                            >
                              <div>
                                <img
                                  src={item.icon}
                                  alt={item.name}
                                  className="h-[16px] w-[16px] "
                                />
                              </div>
                              <div>
                                <p className="text-[14px] text-[#344054]">
                                  {item.name}
                                </p>
                                <p className="text-start text-[9px] text-[#667084]">
                                  ₦{parseInt(item.cost, 10).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                  <Button className="w-full rounded-3xl">Add Addons</Button>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={styles.map_mobile}>
          <Text className="py-5 font-dmSansMedium text-[24px] text-[#1D2838]">
            What is Included
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {outingSuccess &&
              outingData.map(
                (
                  info: React.JSX.IntrinsicAttributes & {
                    name: string;
                    description: string;
                    icon: string;
                    cost: string;
                  },
                  index: React.Key | null | undefined
                ) => <Addon key={index} {...info} />
              )}
            <div className="m-[10px] flex h-[189px] w-[340px] items-center justify-center rounded-[20px] bg-[#F2F4F7] text-center">
              <div
                className="flex cursor-pointer flex-col items-center justify-center"
                onClick={toggleModal}
              >
                <BiPlus className="text-[30px]" />
                <Text className="text-[16px]">New Addons</Text>
                <Text className="mt-[5px] text-[12px] text-[#23262F]">
                  You can add other things you want on your trip here
                </Text>
              </div>
            </div>
          </div>
          <Text className="py-5 font-dmSansMedium text-[24px] text-[#1D2838]">
            Top Reviews
          </Text>
          <Text className="font-dmSansMediumItalic text-[18px] text-gray-400">
            No Reviews yet
          </Text>
          <Text className="pb-3 font-dmSansMedium text-[24px] text-[#1D2838]">
            Pickup City
          </Text>
          <MapComponent events={detailsData.outingPickup} />
        </div>
        <GalleryViewer
          galleryOpen={galleryOpen}
          handleClose={handleClose}
          unrefinedImage={detailsData.outingGallery}
          propertyForKey={"id"}
          propertyForSrc={"image"}
          pluginList={["Zoom", "Thumbnails", "Fullscreen"]}
          scenario="LightHouseOnly"
        />
      </div>
    </div>
  );
};

export default TripDetails;
