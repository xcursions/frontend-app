"use client";

import { addDays } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import toaster from "react-hot-toast";
import {
  AiOutlineArrowLeft,
  AiOutlineMinus,
  AiOutlinePlus,
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
import { InfoIcon } from "@/components/lib/Svg";
import { EventCopyLinkIcon } from "@/components/lib/Svg/CopyIcon";
import Text from "@/components/lib/Text/Text";
import { CalculateVat } from "@/components/lib/VatCalculator/VatCalculator";
import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import { Switch } from "@/components/ui/switch";
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
  useLazyGetOutingLikeQuery,
} from "@/services/user";
import { setUserBooking } from "@/store/slices/userSlice";
import type { OutingProps } from "@/types";
import { HandleCopyLink } from "@/utils/handleCopyLink";

import Addon from "../Addon/Addon";
import styles from "./TripDetails.module.scss";

type Props = {
  detailsData: OutingProps;
};
interface State {
  numOfAdults: number;
  numOfChildren: number;
  numOfInfants: number;
  outingSubType: string | null;
  numOfPeopleSharing: number;
  useCoupleCost: boolean;
  addonIds: string[];
  startDate: string | undefined;
  endDate: string | undefined;
  outingDateId: string | null | undefined;
}
const initialState: State = {
  numOfAdults: 1,
  numOfChildren: 0,
  numOfInfants: 0,
  outingSubType: "",
  numOfPeopleSharing: 0,
  useCoupleCost: false,
  addonIds: [],
  startDate: undefined,
  endDate: undefined,
  outingDateId: undefined,
};

function formatDateToDDMMYYYY(date: Date) {
  if (date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date?.getFullYear();

    return `${year}-${month}-${day}`;
  }
  return "";
}
interface GenerateQueryStringParams {
  type: string;
  dateId: string;
  dateFrom: Date;
  dateTo: Date;
  adults: number;
  children?: number;
  infants?: number;
  sharing?: number;
}

const generateQueryString = ({
  type,
  dateId,
  dateFrom,
  dateTo,
  adults,
  children,
  infants,
  sharing,
}: GenerateQueryStringParams): string => {
  const queryParams: Record<string, string> = {
    type,
  };

  if (adults !== undefined) {
    queryParams.num_of_adult = String(adults);
  }
  if (children !== 0) {
    queryParams.num_of_children = String(children);
  }
  if (infants !== 0) {
    queryParams.num_of_infant = String(infants);
  }
  if (sharing !== 0) {
    queryParams.num_of_sharing = String(sharing);
  }
  if (type === "private") {
    queryParams.start_date = formatDateToDDMMYYYY(dateFrom);
    queryParams.end_date = formatDateToDDMMYYYY(dateTo);
  }
  if (type === "group") {
    queryParams.date_id = dateId;
  }

  return new URLSearchParams(queryParams).toString();
};

const TripDetails = ({ detailsData }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const tripType = searchParams?.get("type")
    ? (searchParams.get("type") as string)
    : "private";
  const dateId = searchParams?.get("date_id")
    ? (searchParams.get("date_id") as string)
    : "";
  const startDate = searchParams?.get("start_date");
  const endDate = searchParams?.get("end_date");
  const adults = searchParams?.get("num_of_adult")
    ? (searchParams?.get("num_of_adult") as string)
    : "1";
  const children = searchParams?.get("num_of_children")
    ? (searchParams?.get("num_of_children") as string)
    : "0";
  const infants = searchParams?.get("num_of_infant")
    ? (searchParams?.get("num_of_infant") as string)
    : "0";
  const sharing = searchParams?.get("num_of_sharing")
    ? (searchParams.get("num_of_sharing") as string)
    : "0";

  const { user } = useAppSelector((state) => state.user);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState<DateRange>({
    from: addDays(
      new Date(),
      detailsData.deadlineGap ? detailsData.deadlineGap + 1 : 31
    ),
    to: addDays(
      new Date(),
      detailsData.defaultOutingDurationInDays
        ? (detailsData.deadlineGap ? detailsData.deadlineGap + 1 : 31) +
            detailsData.defaultOutingDurationInDays
        : 35
    ),
  });
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [useCouple, setUseCouple] = useState(false);
  const [payload, setPayload] = useState(initialState);

  const goingWithYou = Number(adults) + Number(children) + Number(infants);

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
  const [
    bookingCost,
    {
      data: bookingPrice,
      isSuccess: bookingPriceSuccess,
      isError: isBookingPriceError,
      error: bookingPriceError,
    },
  ] = useGetBookingCostMutation();
  const [getLikeData, { data: likedData }] = useLazyGetOutingLikeQuery();
  const { data: reviewData, isSuccess: reviewSuccess } = useGetReviewsQuery(
    detailsData.id
  );
  const [
    createLike,
    { isSuccess: isLikeSuccess, isError: isLikeError, error: likeError },
  ] = useCreateOutingLikeMutation();

  const groupQueryString = generateQueryString({
    type: detailsData?.subType === "private" ? "private" : "group",
    dateId,
    dateFrom: date?.from ?? new Date(),
    dateTo: date?.to ?? new Date(),
    adults: Number(adults),
    children: Number(children),
    infants: Number(infants),
    sharing: Number(sharing),
  });

  const privateQueryString = generateQueryString({
    type: "private",
    dateId,
    dateFrom: date?.from ?? new Date(),
    dateTo: date?.to ?? new Date(),
    adults: Number(adults),
    children: Number(children),
    infants: Number(infants),
    sharing: Number(sharing),
  });

  useEffect(() => {
    if (dateId) {
      bookingCost({
        query: detailsData.id,
        data: {
          numOfAdults: adults,
          numOfChildren: children,
          numOfInfants: infants,
          outingSubType: tripType,
          numOfPeopleSharing: sharing,
          useCoupleCost: useCouple,
          addonIds: payload.addonIds,
          startDate: undefined,
          endDate: undefined,
          outingDateId: dateId,
        },
      });
    }
    if (tripType === "private") {
      bookingCost({
        query: detailsData.id,
        data: {
          numOfAdults: adults,
          numOfChildren: children,
          numOfInfants: infants,
          outingSubType: tripType,
          numOfPeopleSharing: sharing,
          useCoupleCost: useCouple,
          addonIds: payload.addonIds,
          startDate: date?.from,
          endDate: date?.to,
          outingDateId: undefined,
        },
      });
    }
  }, [
    payload,
    date,
    dateId,
    tripType,
    sharing,
    adults,
    infants,
    children,
    useCouple,
  ]);

  useEffect(() => {
    if (user) {
      getLikeData("?type=tour");
    }
  }, []);

  useEffect(() => {
    if (date) {
      const queryParams = generateQueryString({
        type: tripType,
        dateId,
        dateFrom: date?.from ?? new Date(),
        dateTo: date?.to ?? new Date(),
        adults: Number(adults),
        children: Number(children),
        infants: Number(infants),
        sharing: Number(sharing),
      });
      router.push(`?${queryParams}`);
    }
  }, [date]);

  useEffect(() => {
    if (payload.numOfChildren || payload.numOfAdults || payload.numOfInfants) {
      const queryParams = generateQueryString({
        type: tripType,
        dateId,
        dateFrom: date?.from ?? new Date(),
        dateTo: date?.to ?? new Date(),
        adults: payload.numOfAdults,
        children: payload.numOfChildren,
        infants: payload.numOfInfants,
        sharing: payload.numOfPeopleSharing,
      });
      router.push(`?${queryParams}`);
    }
  }, [
    payload.numOfChildren,
    payload.numOfAdults,
    payload.numOfInfants,
    payload.numOfPeopleSharing,
  ]);

  const handleOpen = () => {
    setGalleryOpen(true);
  };
  const handleClose = () => {
    setGalleryOpen(false);
  };
  const toggleModal = () => {
    setIsCalendarOpen(!isCalendarOpen);
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

  useErrorHandler({ isError: isBookingError, error: bookingError });
  useErrorHandler({ isError: isBookingPriceError, error: bookingPriceError });
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
    if (tripType === "private") {
      createBooking({
        query: detailsData.id,
        data: {
          numOfAdults: adults,
          numOfChildren: children,
          numOfInfants: infants,
          outingSubType: tripType,
          numOfPeopleSharing: sharing,
          useCoupleCost: useCouple,
          addonIds: payload.addonIds,
          startDate: date?.from,
          endDate: date?.to,
          outingDateId: undefined,
        },
      });
    } else {
      createBooking({
        query: detailsData.id,
        data: {
          numOfAdults: adults,
          numOfChildren: children,
          numOfInfants: infants,
          outingSubType: tripType,
          numOfPeopleSharing: sharing,
          useCoupleCost: useCouple,
          addonIds: payload.addonIds,
          startDate: undefined,
          endDate: undefined,
          outingDateId: dateId,
        },
      });
    }
  };
  useEffect(() => {
    setPayload({
      ...payload,
      numOfAdults: Number(adults),
      numOfChildren: Number(children),
      numOfInfants: Number(infants),
      numOfPeopleSharing: Number(sharing),
    });
    if (startDate && endDate) {
      setDate({
        from: new Date(startDate),
        to: new Date(endDate),
      });
    }
  }, []);

  const handleLike = () => {
    if (user) {
      createLike({ query: detailsData.id, data: { liked: true } });
    } else {
      toaster.error("You need to be signed in");
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
              <HandleCopyLink icon={EventCopyLinkIcon} styles={styles.icon} />
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
                  <Link
                    href={`?${privateQueryString}`}
                    className={`flex-1 rounded-3xl py-2 text-center text-[14px] ${
                      tripType === "private"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-[#667084]"
                    } cursor-pointer`}
                  >
                    Pesonalized Trip
                  </Link>
                  <Link
                    href={`?${groupQueryString}`}
                    className={`ml-[-15px] flex-1 rounded-3xl py-2 text-center text-[14px] ${
                      tripType === "group"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-[#667084]"
                    } ${
                      detailsData?.subType === "private"
                        ? " cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    Group Trip
                  </Link>
                </div>
                {tripType === "private" ? (
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
                        onChange={
                          (event) => {
                            const queryParams = generateQueryString({
                              type: tripType,
                              dateId: event.value,
                              dateFrom: date?.from ?? new Date(),
                              dateTo: date?.to ?? new Date(),
                              adults: Number(adults),
                              children: Number(children),
                              infants: Number(infants),
                              sharing: Number(sharing),
                            });
                            // router.replace(`?${queryParams}`);
                            router.push(`?${queryParams}`);
                          }
                          // setPayload({ ...payload, outingDateId: event.value })
                        }
                        className="w-[250px] lg:w-[300px]"
                      />
                    </div>
                    {!dateId && (
                      <p className="mb-3 text-[10px] text-[#F04438]">
                        Please select Date of your trip
                      </p>
                    )}
                  </>
                )}
                {tripType === "private" ? (
                  <Text className="flex items-center gap-3 font-dmSansRegular text-[14px] text-[#101828]">
                    <FaRegClock className=" text-xl" />
                    {date?.from && date?.to
                      ? formatWeeksRange(date?.from, date?.to)
                      : null}
                  </Text>
                ) : (
                  <Text className="flex items-center gap-3 font-dmSansRegular text-[14px] text-[#101828]">
                    <FaRegClock className=" text-xl" />
                    {formatWeeksRange(
                      detailsData?.outingDate[0]?.startDate,
                      detailsData?.outingDate[0]?.endDate
                    )}
                  </Text>
                )}
                {tripType === "private" ? (
                  <div className="mr-3 mt-7 flex items-center gap-3 rounded-3xl bg-[#FFECEB] py-2">
                    <RiErrorWarningLine className="ml-3 text-[#F04438]" />{" "}
                    <Text className="text-[12px] text-[#601B16]">
                      Deadline for payment is{" "}
                      {date?.from
                        ? SubtractDate(date?.from, detailsData?.deadlineGap)
                        : null}
                    </Text>
                  </div>
                ) : (
                  <div className="mr-3 mt-7 flex items-center gap-3 rounded-3xl bg-[#FFECEB] py-2">
                    <RiErrorWarningLine className="ml-3 text-[#F04438]" />{" "}
                    <Text className="text-[12px] text-[#601B16]">
                      Deadline for payment is {detailsData?.deadlineGap} days
                      before trip start date
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
                    {tripType === "private" ? (
                      <p className="font-dmSansBold text-[18px]">
                        ₦
                        {chargePlanSuccess && useCouple
                          ? parseInt(
                              chargePlanData?.coupleAmount,
                              10
                            ).toLocaleString()
                          : parseInt(
                              chargePlanData?.singleOccupancyAmount,
                              10
                            ).toLocaleString()}
                      </p>
                    ) : (
                      <p className="font-dmSansBold text-[18px]">
                        ₦
                        {chargePlanSuccess && useCouple
                          ? parseInt(
                              chargePlanData?.coupleGroupAmount,
                              10
                            ).toLocaleString()
                          : parseInt(
                              chargePlanData?.singleOccupancyGroupAmount,
                              10
                            ).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <Text className="text-[14px] text-[#667084]">
                      Per Person Sharing
                    </Text>
                    {tripType === "private" ? (
                      <p className="font-dmSansBold text-[18px]">
                        ₦
                        {!useCouple &&
                          chargePlanSuccess &&
                          parseInt(
                            chargePlanData.perPersonSharingAmount,
                            10
                          ).toLocaleString()}
                      </p>
                    ) : (
                      <p className="font-dmSansBold text-[18px]">
                        ₦
                        {!useCouple &&
                          chargePlanSuccess &&
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
                      disabled={payload.numOfPeopleSharing === 0 || useCouple}
                      onClick={() =>
                        setPayload({
                          ...payload,
                          numOfPeopleSharing: payload.numOfPeopleSharing - 1,
                        })
                      }
                      className=" rounded-full bg-white text-2xl text-[#667084] shadow-md"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="text-[18px]">
                      {" "}
                      {payload.numOfPeopleSharing}
                    </span>
                    <button
                      className=" rounded-full bg-white text-2xl text-[#667084] shadow-md"
                      disabled={useCouple}
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
                <Text className="font-dmSansBold text-[18px]">Couples</Text>
                <div className="my-5 mr-3 flex justify-between">
                  <Text className="font-dmSansRegular text-[14px] text-[#667084]">
                    Book as a couple
                  </Text>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={useCouple}
                      // value={useCouple}
                      onCheckedChange={() => setUseCouple(!useCouple)}
                    />
                  </div>
                </div>
                <div className="my-5 mr-2 items-center justify-center">
                  <hr className="border-t-1 grow border-[#E4E7EC]" />
                </div>
                <Text className="font-dmSansBold text-[18px]">Addons</Text>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {selectedItems.length > 0 &&
                    selectedItems.map((info) => (
                      <div
                        key={info.id}
                        className="relative max-w-[180px] items-center"
                      >
                        <div
                          className="absolute inset-y-1 right-4 cursor-pointer"
                          onClick={() => handleItemClick(info)}
                        >
                          <GiCancel className="text-[#98A2B3]" />
                        </div>
                        <Text className="min-h-[30px] w-auto rounded-3xl border pl-2">
                          {info.name}
                        </Text>
                      </div>
                    ))}
                </div>
                <div className="my-5 mr-2 items-center justify-center">
                  <hr className="border-t-1 grow border-[#E4E7EC]" />
                </div>
                <div className="mr-3  flex items-center justify-between">
                  <div className=" flex items-center gap-2">
                    <Text className="font-dmSansMedium text-[12px] text-[#667084]">
                      Vat
                    </Text>
                    <InfoIcon />
                  </div>
                  <Text className="font-dmSansBold text-[14px] text-[#101828]">
                    ₦
                    {bookingPriceSuccess
                      ? CalculateVat(
                          bookingPrice,
                          detailsData?.vat
                        ).toLocaleString()
                      : null}
                  </Text>
                </div>
                <div className="mr-3  flex items-center justify-between">
                  <Text className="font-dmSansMedium text-[14px] font-semibold">
                    Total
                  </Text>
                  <Text className="font-dmSansBold text-[24px] text-[#0A83FF]">
                    ₦
                    {bookingPriceSuccess
                      ? parseInt(bookingPrice, 10).toLocaleString()
                      : null}
                  </Text>
                </div>
                <div className="my-5 mr-3 pb-3 ">
                  <Button
                    className="w-full rounded-3xl"
                    onClick={handleSubmit}
                    disabled={
                      goingWithYou === 0 || (tripType === "group" && !dateId)
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
