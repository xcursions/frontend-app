"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toaster from "react-hot-toast";
import {
  AiFillApple,
  AiOutlineArrowLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { FaMicrosoft, FaRegClock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiFacebook, FiInstagram, FiLink, FiTwitter } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import { TbCalendar } from "react-icons/tb";

import Review from "@/components/admin/Review/Review";
import Button from "@/components/lib/Button";
import { formatDatesRange } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import GalleryViewer from "@/components/lib/GalleryViewer";
import Heading from "@/components/lib/Heading/Heading";
import MapComponent from "@/components/lib/MapComponent/MapComponent";
import OutingGallery from "@/components/lib/OutingGallery/OutingGallery";
import Text from "@/components/lib/Text/Text";
import { useAppSelector, useErrorHandler, useSuccessHandler } from "@/hooks";
import useAppDispatch from "@/hooks/useAppDispatch";
import { useGetReviewsQuery } from "@/services/admin";
import {
  useCreateBookingMutation,
  useCreateOutingLikeMutation,
  useGetBookingCostMutation,
  useLazyGetOutingLikeQuery,
} from "@/services/user";
import { setUserBooking } from "@/store/slices/userSlice";
import type { OutingProps } from "@/types";

import styles from "./EventDetails.module.scss";

type Props = {
  detailsData: OutingProps;
};
const initialState = {
  outingDateId: "",
  numOfAdults: 1,
  outingSubType: "group",
  numOfChildren: 0,
  numOfInfants: 0,
  numOfPeopleSharing: 0,
  // addonIds: [],
  ticketQuantity: 0,
};
const EventDetails = ({ detailsData }: Props) => {
  const dispatch = useAppDispatch();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const [payload, setPayload] = useState(initialState);
  const router = useRouter();
  // const { data: chargePlanData, isSuccess: chargePlanSuccess } =
  //   useGetOutingChargePlanQuery(detailsData.id);
  const [
    createBooking,
    {
      data: bookingData,
      isSuccess: bookingSuccess,
      isError: isBookingError,
      error: bookingError,
    },
  ] = useCreateBookingMutation();
  const [bookingCost, { data: bookingPrice, isSuccess: bookingPriceSuccess }] =
    useGetBookingCostMutation();
  const { data: reviewData, isSuccess: reviewSuccess } = useGetReviewsQuery(
    detailsData.id
  );
  const [
    createLike,
    { isSuccess: isLikeSuccess, isError: isLikeError, error: likeError },
  ] = useCreateOutingLikeMutation();
  const [getLikeData, { data: likedData }] = useLazyGetOutingLikeQuery();
  const handleOpen = () => {
    setGalleryOpen(true);
  };
  const handleClose = () => {
    setGalleryOpen(false);
  };
  const toggleModal = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const shareOnTwitter = () => {
    const linkToShare = window?.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      "Check out this link: "
    )}&url=${encodeURIComponent(linkToShare)}`;
    window.open(twitterUrl, "_blank");
  };
  const shareOnFacebook = () => {
    const linkToShare = window?.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      linkToShare
    )}`;
    window.open(facebookUrl, "_blank");
  };
  const handleCopyLink = () => {
    const linkToCopy = window?.location.href;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => toaster("Link copied to clipboard!"))
      .catch((err) => toaster("Failed to copy link:", err));
  };
  useEffect(() => {
    setPayload({
      ...payload,
      outingDateId: detailsData.outingDate[0].id,
    });
  }, []);
  useEffect(() => {
    if (payload.outingDateId) {
      bookingCost({ query: detailsData.id, data: payload });
    }
  }, [payload]);
  useErrorHandler({ isError: isBookingError, error: bookingError });
  useSuccessHandler({
    isSuccess: bookingSuccess,
    successFunction: () => {
      if (bookingData) {
        dispatch(setUserBooking(bookingData));
        router.push(`/checkout`);
      }
      return null;
    },
    toastMessage: "Proceed to CheckOut!",
  });
  useErrorHandler({ isError: isLikeError, error: likeError });
  useSuccessHandler({
    isSuccess: isLikeSuccess,
    toastMessage: "Outing has been added to your favorites",
  });
  const handleLike = () => {
    if (user) {
      createLike({ query: detailsData.id, data: { liked: true } });
    } else {
      toaster.error("You need to be signed in");
    }
  };
  const handleSubmit = () => {
    createBooking({ query: detailsData.id, data: payload });
  };
  useEffect(() => {
    if (user) {
      getLikeData("?type=event");
    }
  }, []);
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
              <div className="mx-[-5px] mt-[25px] grid gap-[24px]">
                {reviewSuccess && reviewData.result.length ? (
                  reviewData.result.map((info: any) => (
                    <Review key={info.id} detailsData={info} design={true} />
                  ))
                ) : (
                  <Text className="ml-2 font-dmSansMediumItalic text-[18px] text-gray-400">
                    No Reviews yet
                  </Text>
                )}
              </div>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.icons}>
              <AiOutlineShareAlt
                className={styles.icon}
                onClick={handleCopyLink}
              />
              {likedData?.result.some(
                (res: any) => detailsData.id === res.outing.id
              ) ? (
                <MdFavorite className={`${styles.icon}`} />
              ) : (
                <GrFavorite className={styles.icon} onClick={handleLike} />
              )}
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
                    ₦
                    {bookingPriceSuccess &&
                      parseInt(bookingPrice, 10).toLocaleString()}
                  </Text>
                </div>
                <div className="my-5 mr-3 flex justify-between">
                  <Text className="font-dmSansRegular text-[16px]">
                    Number of Ticket
                  </Text>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={payload.ticketQuantity === 0}
                      onClick={() =>
                        setPayload({
                          ...payload,
                          ticketQuantity: payload.ticketQuantity - 1,
                        })
                      }
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="text-[18px]">
                      {" "}
                      {payload.ticketQuantity}
                    </span>
                    <button
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                      onClick={() =>
                        setPayload({
                          ...payload,
                          ticketQuantity: payload.ticketQuantity + 1,
                        })
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
                  <Button
                    className="w-full rounded-3xl bg-[#F2F4F7] text-[#667084]"
                    onClick={toggleModal}
                  >
                    Add to Calendar
                  </Button>
                  <div className="w-full ">
                    {user ? (
                      <Button
                        className="w-full rounded-3xl"
                        onClick={handleSubmit}
                        disabled={payload.ticketQuantity === 0}
                      >
                        Proceed to Checkout
                      </Button>
                    ) : (
                      <Button className="w-full rounded-3xl">
                        <Link href={"/login"}>Please login to continue</Link>
                      </Button>
                    )}
                  </div>
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
            <div className="fixed inset-0 z-[32] flex w-[326px] items-center justify-center lg:left-[510px] lg:w-[418px]">
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <p
                  className="cursor-pointer text-end font-dmSansBold text-[16px] text-[#98A2B3]"
                  onClick={toggleModal}
                >
                  X
                </p>
                <div className="mx-auto items-center text-center">
                  <Heading type="h3">Add to calendar</Heading>
                  <div className="mx-auto my-5 flex justify-center gap-3">
                    <div>
                      <div className="mx-auto max-w-[40px] cursor-pointer items-center rounded-full bg-[#F2F4F7] p-2">
                        <FcGoogle />
                      </div>
                      <span className="text-[12px]">Google</span>
                    </div>
                    <div>
                      <div className="mx-auto max-w-[40px] cursor-pointer items-center rounded-full bg-[#000000] p-2 text-[#ffffff]">
                        <AiFillApple />
                      </div>
                      <span className="text-[12px]">Apple</span>
                    </div>
                    <div>
                      <div className=" mx-auto max-w-[40px] cursor-pointer items-center rounded-full bg-[#F2F4F7] p-2">
                        <FaMicrosoft />
                      </div>
                      <span className="text-[12px]">Microsoft</span>
                    </div>
                  </div>
                  <Text className=" my-5 flex gap-3 px-12 font-dmSansRegular text-[14px] text-[#101828] lg:pl-20">
                    <TbCalendar className=" text-xl text-[#0A83FF]" />
                    {formatDatesRange(
                      detailsData.outingDate[0].startDate,
                      detailsData.outingDate[0].endDate
                    )}
                  </Text>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={styles.map_mobile}>
          <Text className="pb-3 font-dmSansMedium text-[24px] text-[#1D2838]">
            Event Location
          </Text>
          <MapComponent events={detailsData.outingDestination} />
          <Text className="py-5 font-dmSansMedium text-[24px] text-[#1D2838]">
            Top Reviews
          </Text>
          <div className="mx-[-5px] mt-[25px] grid gap-[24px]">
            {reviewSuccess && reviewData.result.length ? (
              reviewData.result.map((info: any) => (
                <Review key={info.id} detailsData={info} design={true} />
              ))
            ) : (
              <Text className="ml-2 font-dmSansMediumItalic text-[18px] text-gray-400">
                No Reviews yet
              </Text>
            )}
          </div>
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
