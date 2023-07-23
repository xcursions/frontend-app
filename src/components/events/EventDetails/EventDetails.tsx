"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toaster from "react-hot-toast";
import {
  AiOutlineArrowLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { FiFacebook, FiInstagram, FiLink, FiTwitter } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { TbCalendar } from "react-icons/tb";

import Button from "@/components/lib/Button";
import GalleryViewer from "@/components/lib/GalleryViewer";
import Heading from "@/components/lib/Heading/Heading";
import MapComponent from "@/components/lib/MapComponent/MapComponent";
import OutingGallery from "@/components/lib/OutingGallery/OutingGallery";
import Text from "@/components/lib/Text/Text";
import type { OutingProps } from "@/types";

import styles from "./EventDetails.module.scss";

type Props = {
  detailsData: OutingProps;
};
const initialState = {
  count: 0,
  id: "",
};
const EventDetails = ({ detailsData }: Props) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const router = useRouter();
  const handleOpen = () => {
    setGalleryOpen(true);
  };
  const handleClose = () => {
    setGalleryOpen(false);
  };
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });

    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }

    return `${day}${daySuffix} ${month}`;
  };

  const formatDatesRange = (
    startDateString: string | number | Date,
    endDateString: string | number | Date
  ) => {
    const startDate = formatDate(startDateString);
    const endDate = formatDate(endDateString);

    return `${startDate} - ${endDate}`;
  };

  const shareOnTwitter = () => {
    const linkToShare = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      "Check out this link: "
    )}&url=${encodeURIComponent(linkToShare)}`;
    window.open(twitterUrl, "_blank");
  };
  const shareOnFacebook = () => {
    const linkToShare = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      linkToShare
    )}`;
    window.open(facebookUrl, "_blank");
  };
  const handleCopyLink = () => {
    const linkToCopy = window.location.href;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => toaster("Link copied to clipboard!"))
      .catch((err) => toaster("Failed to copy link:", err));
  };
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
              <Text className="pb-3 font-dmSansMedium text-[24px] text-[#1D2838]">
                Event Location
              </Text>
              <MapComponent events={detailsData.outingDestination} />
              <Text className="py-5 font-dmSansMedium text-[24px] text-[#1D2838]">
                Top Reviews
              </Text>
              <Text className="font-dmSansMediumItalic text-[18px] text-gray-400">
                No Reviews yet
              </Text>
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
            <div className="mt-8 rounded-2xl bg-[#ffffff] shadow-md">
              <div className="mx-auto pl-4">
                <Text className="mb-3 font-dmSansBold text-[18px] font-bold text-[#101828]">
                  Details of the trip
                </Text>
                <Text className="mb-3 flex items-center gap-3 font-dmSansRegular text-[14px] text-[#101828]">
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
                <Text className="mb-3 font-dmSansRegular text-[16px] font-normal text-[#101828]">
                  Share on social media
                </Text>
                <div className="my-3 flex items-center gap-3 pb-3">
                  <div
                    className="cursor-pointer rounded-full bg-gray-300 p-2"
                    onClick={shareOnFacebook}
                  >
                    <FiFacebook />
                  </div>
                  <div
                    className="cursor-pointer items-center rounded-full bg-gray-300 p-2"
                    onClick={shareOnTwitter}
                  >
                    <FiTwitter />
                  </div>
                  <div
                    className="cursor-pointer rounded-full bg-gray-300 p-2"
                    onClick={handleCopyLink}
                  >
                    <FiInstagram />
                  </div>
                  <div
                    className="flex cursor-pointer items-center gap-1 rounded-3xl bg-[#EBF5FF] p-2 text-[16px] text-[#0A83FF]"
                    onClick={handleCopyLink}
                  >
                    <FiLink />
                    <span className="hidden md:flex">Copy the link</span>
                  </div>
                </div>
                <div className="my-5 mr-3 flex flex-col gap-3 pb-3 md:flex-row">
                  <Button className="w-full rounded-3xl bg-[#F2F4F7] text-[#667084]">
                    Add to Calendar
                  </Button>
                  <Button className="w-full rounded-3xl">Get Ticket</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.map_mobile}>
          <Text className="pb-3 font-dmSansMedium text-[24px] text-[#1D2838]">
            Event Location
          </Text>
          <MapComponent events={detailsData.outingDestination} />
          <Text className="py-5 font-dmSansMedium text-[24px] text-[#1D2838]">
            Top Reviews
          </Text>
          <Text className="font-dmSansMediumItalic text-[18px] text-gray-400">
            No Reviews yet
          </Text>
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

export default EventDetails;
