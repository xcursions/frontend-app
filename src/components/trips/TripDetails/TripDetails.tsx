// @ts-nocheck

"use client";

import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import toaster from "react-hot-toast";
import {
  AiOutlineArrowLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { TbCalendar } from "react-icons/tb";

import Review from "@/components/admin/Review/Review";
import Button from "@/components/lib/Button";
import {
  formatDatesRange,
  formatWeeksRange,
} from "@/components/lib/FormatWeekRange/FormatWeekRage";
import GalleryViewer from "@/components/lib/GalleryViewer";
import Heading from "@/components/lib/Heading/Heading";
import MapComponent from "@/components/lib/MapComponent/MapComponent";
import OutingGallery from "@/components/lib/OutingGallery/OutingGallery";
import Select from "@/components/lib/Select/Select";
import { SubtractDate } from "@/components/lib/SubtractDate/SubtractDate";
import Text from "@/components/lib/Text/Text";
import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import {
  useAppDispatch,
  useAppSelector,
  useErrorHandler,
  useSuccessHandler,
} from "@/hooks";
import { useGetReviewsQuery } from "@/services/admin";
import {
  useGetOutingAddOnQuery,
  useGetOutingChargePlanQuery,
} from "@/services/public";
import {
  useCreateBookingMutation,
  useCreateOutingLikeMutation,
  useGetBookingCostMutation,
  useGetOutingLikeQuery,
} from "@/services/user";
import { setUserBooking } from "@/store/slices/userSlice";
import type { OutingProps } from "@/types";

import Addon from "../Addon/Addon";
import styles from "./TripDetails.module.scss";

type Props = {
  detailsData: OutingProps;
};
const initialState = {
  outingDateId: "",
  numOfAdults: 1,
  numOfChildren: 0,
  numOfInfants: 0,
  outingSubType: "",
  numOfPeopleSharing: 0,
  addonIds: [],
  startDate: "",
  endDate: "",
};
const TripDetails = ({ detailsData }: Props) => {
  const dispatch = useAppDispatch();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 4),
  });
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<"private" | "group">(
    "private"
  );
  const { user } = useAppSelector((state) => state.user);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [payload, setPayload] = useState(initialState);
  const { data: outingData, isSuccess: outingSuccess } = useGetOutingAddOnQuery(
    detailsData.id
  );
  const { data: chargePlanData, isSuccess: chargePlanSuccess } =
    useGetOutingChargePlanQuery(detailsData.id);
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
  const { data: likedData } = useGetOutingLikeQuery("?type=tour");
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
    const linkToCopy = window?.location.href;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => toaster("Link copied to clipboard!"))
      .catch((err) => toaster("Failed to copy link:", err));
  };
  const handleSelect = (trip: React.SetStateAction<string>) => {
    setSelectedTrip(trip);
  };
  const handleItemClick = (item: any) => {
    // @ts-ignore
    const addOnExists = payload.addonIds.includes(item.id);
    const itemExists = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id
    );
    if (itemExists && addOnExists) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
      setPayload({
        ...payload,
        addonIds: payload.addonIds.filter(
          // @ts-ignore
          (selectedItem) => selectedItem !== item.id
        ),
      });
    } else {
      setSelectedItems([...selectedItems, item]);
      // @ts-ignore
      setPayload({ ...payload, addonIds: [...payload.addonIds, item.id] });
    }
  };
  const { numOfAdults } = payload || 0;
  const { numOfChildren } = payload || 0;
  const { numOfInfants } = payload || 0;
  const goingWithYou = numOfAdults + numOfChildren + numOfInfants;
  useEffect(() => {
    if (selectedTrip === "private") {
      setPayload({
        ...payload,
        outingDateId: undefined,
        startDate: date?.from,
        endDate: date?.to,
        outingSubType: selectedTrip,
      });
    } else {
      setPayload({
        ...payload,
        startDate: undefined,
        endDate: undefined,
        outingSubType: selectedTrip,
      });
    }
  }, [selectedTrip, date]);
  useEffect(() => {
    bookingCost({ query: detailsData.id, data: payload });
  }, [payload]);
  useErrorHandler({ isError: isBookingError, error: bookingError });
  useSuccessHandler({
    isSuccess: bookingSuccess,
    successFunction: () => {
      if (bookingData) {
        dispatch(setUserBooking(bookingData));
        router.push(`/checkout/trips`);
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
  const handleSubmit = () => {
    if (!user) {
      router.push("/login");
    } else {
      createBooking({ query: detailsData.id, data: payload });
    }
  };
  const handleLike = () => {
    if (user) {
      createLike({ query: detailsData.id, data: { liked: true } });
    }
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
            <OutingGallery
              coverImages={detailsData.outingGallery}
              handleOpen={handleOpen}
            />
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
                          default: boolean;
                        },
                        index: React.Key | null | undefined
                      ) => <Addon key={index} {...info} />
                    )}
                {selectedItems.length > 0 &&
                  selectedItems.map((info, index) => (
                    <div key={info.id} className="relative">
                      <div
                        className="absolute right-4 top-4 cursor-pointer"
                        onClick={() => handleItemClick(info)}
                      >
                        <GiCancel className="text-[#98A2B3]" />
                      </div>
                      <Addon key={index} {...info} />
                    </div>
                  ))}
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
                    Pesonalized Trip
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
                {selectedTrip === "private" ? (
                  <div className="mb-3 mt-[30px]">
                    <DatePickerWithRange date={date} setDate={setDate} />
                    {!date && (
                      <p className="text-[10px] text-[#F04438]">
                        Please select Duration of your trip
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="mb-3 mt-[30px] flex cursor-pointer items-center gap-3 text-[14px] text-[#101828]">
                      <TbCalendar className=" text-xl" />
                      <Select
                        placeholder={"Select Date"}
                        options={detailsData.outingDate.map((option) => ({
                          value: option.id,
                          label: formatDatesRange(
                            option.startDate,
                            option.endDate
                          ),
                        }))}
                        onChange={(event) =>
                          setPayload({ ...payload, outingDateId: event.value })
                        }
                        className="w-[250px] lg:w-[300px]"
                      />
                    </div>
                    {!payload.outingDateId && (
                      <p className="mb-3 text-[10px] text-[#F04438]">
                        Please select Date of your trip
                      </p>
                    )}
                  </>
                )}
                {selectedTrip === "private" ? (
                  <Text className="flex items-center gap-3 font-dmSansRegular text-[14px] text-[#101828]">
                    <FaRegClock className=" text-xl" />
                    {Math.floor(formatWeeksRange(date?.from, date?.to))} weeks
                  </Text>
                ) : (
                  <Text className="flex items-center gap-3 font-dmSansRegular text-[14px] text-[#101828]">
                    <FaRegClock className=" text-xl" />
                    {Math.floor(
                      formatWeeksRange(
                        detailsData?.outingDate[0]?.startDate,
                        detailsData?.outingDate[0]?.endDate
                      )
                    )}{" "}
                    weeks
                  </Text>
                )}
                {selectedTrip === "private" ? (
                  <div className="mr-3 mt-7 flex items-center gap-3 rounded-3xl bg-[#FFECEB] py-2">
                    <RiErrorWarningLine className="ml-3 text-[#F04438]" />{" "}
                    <Text className="text-[12px] text-[#601B16]">
                      Deadline for payment is{" "}
                      {SubtractDate(date?.from, detailsData?.deadlineGap)}
                    </Text>
                  </div>
                ) : (
                  <div className="mr-3 mt-7 flex items-center gap-3 rounded-3xl bg-[#FFECEB] py-2">
                    <RiErrorWarningLine className="ml-3 text-[#F04438]" />{" "}
                    <Text className="text-[12px] text-[#601B16]">
                      Deadline for payment is{" "}
                      {SubtractDate(
                        detailsData?.outingDate[0]?.startDate,
                        detailsData?.deadlineGap
                      )}
                    </Text>
                  </div>
                )}
                <Text className="mt-[24px] text-[14px]  text-[#101828]">
                  Price
                </Text>
                <div className="flex gap-[25px] lg:gap-[32px]">
                  <div>
                    <Text className="text-[14px] text-[#667084]">
                      Single Occupancy
                    </Text>
                    {selectedTrip === "private" ? (
                      <p className="font-dmSansBold text-[18px]">
                        ₦
                        {chargePlanSuccess &&
                          parseInt(
                            chargePlanData.singleOccupancyAmount,
                            10
                          ).toLocaleString()}
                      </p>
                    ) : (
                      <p className="font-dmSansBold text-[18px]">
                        ₦
                        {chargePlanSuccess &&
                          parseInt(
                            chargePlanData.singleOccupancyGroupAmount,
                            10
                          ).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <Text className="text-[14px] text-[#667084]">
                      Per Person Sharing
                    </Text>
                    {selectedTrip === "private" ? (
                      <p className="font-dmSansBold text-[18px]">
                        ₦
                        {chargePlanSuccess &&
                          parseInt(
                            chargePlanData.perPersonSharingAmount,
                            10
                          ).toLocaleString()}
                      </p>
                    ) : (
                      <p className="font-dmSansBold text-[18px]">
                        ₦
                        {chargePlanSuccess &&
                          parseInt(
                            chargePlanData.perPersonSharingGroupAmount,
                            10
                          ).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="my-5 mr-2 items-center justify-center">
                  <hr className="border-t-1 grow border-[#E4E7EC]" />
                </div>
                <Text className="font-dmSansBold text-[18px]">
                  Going ({goingWithYou})
                </Text>
                <div className="my-5 mr-3 flex justify-between">
                  <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                    Adult
                  </Text>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={payload.numOfAdults === 0}
                      onClick={() =>
                        setPayload({
                          ...payload,
                          numOfAdults: payload.numOfAdults - 1,
                        })
                      }
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="text-[18px]"> {payload.numOfAdults}</span>
                    <button
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                      onClick={() =>
                        setPayload({
                          ...payload,
                          numOfAdults: payload.numOfAdults + 1,
                        })
                      }
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <div className="my-5 mr-3 flex justify-between">
                  <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                    Children(2-11)
                  </Text>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={payload.numOfChildren === 0}
                      onClick={() =>
                        setPayload({
                          ...payload,
                          numOfChildren: payload.numOfChildren - 1,
                        })
                      }
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="text-[18px]">
                      {" "}
                      {payload.numOfChildren}
                    </span>
                    <button
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                      onClick={() =>
                        setPayload({
                          ...payload,
                          numOfChildren: payload.numOfChildren + 1,
                        })
                      }
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <div className="my-5 mr-3 flex justify-between">
                  <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                    Infant(0-2)
                  </Text>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={payload.numOfInfants === 0}
                      onClick={() =>
                        setPayload({
                          ...payload,
                          numOfInfants: payload.numOfInfants - 1,
                        })
                      }
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="text-[18px]"> {payload.numOfInfants}</span>
                    <button
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                      onClick={() =>
                        setPayload({
                          ...payload,
                          numOfInfants: payload.numOfInfants + 1,
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
                <Text className="font-dmSansBold text-[18px]">Sharing</Text>
                <div className="my-5 mr-3 flex justify-between">
                  <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                    Number of People Sharing
                  </Text>
                  <div className="flex items-center gap-3">
                    <button
                      disabled={payload.numOfPeopleSharing === 0}
                      onClick={() =>
                        setPayload({
                          ...payload,
                          numOfPeopleSharing: payload.numOfPeopleSharing - 1,
                        })
                      }
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="text-[18px]">
                      {" "}
                      {payload.numOfPeopleSharing}
                    </span>
                    <button
                      className="cursor-pointer rounded-full bg-white text-2xl text-[#667084] shadow-md"
                      onClick={() =>
                        setPayload({
                          ...payload,
                          numOfPeopleSharing: payload.numOfPeopleSharing + 1,
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
                <Text className="font-dmSansBold text-[18px]">Addons</Text>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {selectedItems.length > 0 &&
                    selectedItems.map((info) => (
                      <div key={info.id} className="relative max-w-[180px]">
                        <div
                          className="absolute right-4 top-2 cursor-pointer"
                          onClick={() => handleItemClick(info)}
                        >
                          <GiCancel className="text-[#98A2B3]" />
                        </div>
                        <Text className="w-auto rounded-3xl border pl-2">
                          {info.name}
                        </Text>
                      </div>
                    ))}
                </div>
                <div className="my-5 mr-2 items-center justify-center">
                  <hr className="border-t-1 grow border-[#E4E7EC]" />
                </div>
                <div className="mr-3 flex justify-between">
                  <Text className="font-dmSansMedium text-[14px] font-semibold">
                    Total
                  </Text>
                  <Text>
                    ₦
                    {bookingPriceSuccess &&
                      parseInt(bookingPrice, 10).toLocaleString()}
                  </Text>
                </div>
                <div className="my-5 mr-3 pb-3 ">
                  <Button
                    className="w-full rounded-3xl"
                    onClick={handleSubmit}
                    disabled={
                      goingWithYou === 0 ||
                      (selectedTrip === "group" && !payload.outingDateId)
                    }
                  >
                    Proceed to Checkout
                  </Button>
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
                  <div className="grid grid-cols-2 gap-3 py-5 lg:grid-cols-3">
                    {outingSuccess &&
                      outingData
                        .filter((trip: any) => !trip.default)
                        .map((item: any) => {
                          const isSelected = selectedItems.some(
                            (selectedItem) => selectedItem.id === item.id
                          );
                          return (
                            <div
                              key={item.id}
                              className={`flex items-center gap-2 rounded-3xl border pl-2 shadow-md ${
                                isSelected
                                  ? "bg-[#000000] text-[#ffffff]"
                                  : "bg-[#F2F4F7] text-[#344054]"
                              }`}
                              onClick={() => handleItemClick(item)}
                            >
                              <div>
                                <img
                                  src={item.icon}
                                  alt={item.name}
                                  className="h-[16px] w-[16px]"
                                />
                              </div>
                              <div>
                                <p className="text-[14px]">{item.name}</p>
                                <p className="text-start text-[9px]">
                                  ₦{parseInt(item.cost, 10).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                  <Button className="w-full rounded-3xl" onClick={toggleModal}>
                    Add Addons({selectedItems.length})
                  </Button>
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
              outingData
                .filter((trip: { default: any }) => trip.default)
                .map(
                  (
                    info: React.JSX.IntrinsicAttributes & {
                      name: string;
                      description: string;
                      icon: string;
                      cost: string;
                      default: boolean;
                    },
                    index: React.Key | null | undefined
                  ) => <Addon key={index} {...info} />
                )}
            {selectedItems.length > 0 &&
              selectedItems.map((info, index) => (
                <div key={info.id} className="relative">
                  <div
                    className="absolute right-4 top-2 cursor-pointer"
                    onClick={() => handleItemClick(info)}
                  >
                    <GiCancel className="text-[#98A2B3]" />
                  </div>
                  <Addon key={index} {...info} />
                </div>
              ))}
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
