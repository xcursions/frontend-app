"use client";

import Link from "next/link";
import { useState } from "react";

import EventCard from "@/components/lib/EventCard/EventCard";
import Text from "@/components/lib/Text/Text";
import TripCard from "@/components/lib/TripCard/TripCard";
import { useAppSelector, useErrorHandler, useSuccessHandler } from "@/hooks";
import {
  useGetAllOutingsQuery,
  useSearchOutingsQuery,
} from "@/services/public";
import {
  useGetBookingHistoryQuery,
  useGetUserProfileQuery,
  useGetWalletBalanceQuery,
} from "@/services/user";
import HeaderSection from "@/ui-components/HeaderSection";
import Section from "@/ui-components/Section";

export default function Dashboard() {
  const [trips, setTrips] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const { data, isSuccess } = useGetAllOutingsQuery("?type=tour");
  const { data: walletBalance, isSuccess: walletBallanceSuccess } =
    useGetWalletBalanceQuery();
  const { data: eventData, isSuccess: eventSuccess } =
    useSearchOutingsQuery("?type=event");
  // const { user } = useAppSelector((state) => state.user);
  const { auth } = useAppSelector((state) => state.user);
  useSuccessHandler({
    isSuccess,
    showToast: false,
    successFunction: () => {
      if (data) {
        setTrips(data);
      }
    },
  });
  useSuccessHandler({
    isSuccess: eventSuccess,
    showToast: false,
    successFunction: () => {
      if (eventData) {
        setEvents(eventData);
      }
    },
  });
  const {
    data: userProfile,
    isSuccess: userSuccess,
    isError: isUserError,
    error: userError,
  } = useGetUserProfileQuery();
  const {
    data: outingData,
    isSuccess: outingSuccess,
    isError: isOutingError,
    error: outingError,
  } = useGetBookingHistoryQuery("?limit=100");

  useErrorHandler({
    isError: isOutingError,
    error: outingError,
    showToast: false,
  });
  useErrorHandler({ isError: isUserError, error: userError, showToast: false });
  return (
    <>
      <div className="mt-[19px] max-w-[783px] border-2">
        <div className="mx-[30px]">
          {auth === "regular-auth" ? (
            <HeaderSection
              heading={`Hello, ${userSuccess && userProfile.data.username} 🏝️`}
              subHeading={"Welcome back to your dashboard"}
            />
          ) : (
            <HeaderSection
              heading={`Hello, ${
                (userSuccess && userProfile.data.lastName) ||
                (userSuccess && userProfile?.data?.fullName.split(" ")[0])
              } 🏝️`}
              subHeading={"Welcome back to your dashboard"}
            />
          )}
          <Section>
            <div className="flex w-[346px] content-center items-center rounded-2xl bg-[#e2ecf6] text-center shadow-md md:w-full lg:w-[224px]">
              <img
                src="/assets/images/icons/dashboard1.png"
                alt="dashboard"
                className=" my-8 ml-5 mr-2 max-w-[60px] items-center rounded-full shadow-lg"
              />
              <div className="items-center text-center">
                <p className="text-start text-[12px] text-[#3B9CFF]">Balance</p>
                <p className="font-dmSansBold text-[20px] font-bold text-[#021A33]">
                  ₦
                  {walletBallanceSuccess &&
                    parseInt(walletBalance.amount, 10).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex w-[342px] content-center items-center rounded-2xl bg-[#FFF8F0] text-center shadow-md md:w-full lg:w-[214px]">
              <img
                src="/assets/images/icons/dashboard2.png"
                alt="dashboard"
                className=" my-8 ml-6 mr-3 max-w-[60px] items-center rounded-full shadow-lg"
              />
              <div className="items-center text-center">
                <p className="text-start text-[12px] text-[#FF9E3B]">Trips</p>
                <p className="font-dmSansBold text-[20px] font-bold text-[#021A33]">
                  {outingSuccess && outingData.result.length > 0 ? (
                    <div>
                      {
                        outingData.result.filter(
                          (res: any) =>
                            res.status === "successful" &&
                            res.outing.type === "tour"
                        ).length
                      }
                    </div>
                  ) : (
                    <div>0</div>
                  )}
                </p>
              </div>
            </div>
            <div className="flex w-[342px] content-center items-center rounded-2xl bg-[#F8F0FF] text-center shadow-md md:w-full lg:w-[214px]">
              <img
                src="/assets/images/icons/dashboard3.png"
                alt="dashboard"
                className=" my-8 ml-6 mr-3 max-w-[60px] items-center rounded-full shadow-lg"
              />
              <div className="items-center text-center">
                <p className="text-start text-[12px] text-[#9E3BFF]">Events</p>
                <p className="font-dmSansBold text-[20px] font-bold text-[#021A33]">
                  {outingSuccess && outingData.result.length > 0 ? (
                    <div>
                      {
                        outingData.result.filter(
                          (res: any) =>
                            res.status === "successful" &&
                            res.outing.type === "event"
                        ).length
                      }
                    </div>
                  ) : (
                    <div>0</div>
                  )}
                </p>
              </div>
            </div>
          </Section>
          <div className="mt-16">
            <div className="flex justify-between pr-3">
              <Text className="font-dmSansBold text-[18px] text-[#101828]">
                Available Trips
              </Text>
              {/* <div className="hidden gap-5 md:flex">
                <Text className="rounded-3xl bg-[#101828] p-2 px-4 font-dmSansRegular text-[12px] text-[#FFFFFF]">
                  Most Popular
                </Text>
                <Text className="p-2 font-dmSansRegular text-[12px] text-[#475467]">
                  Best Price
                </Text>
                <Text className="p-2 font-dmSansRegular text-[12px] text-[#475467]">
                  Near Me
                </Text>
              </div> */}
              <Link href="/trips">
                <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
                  view all
                </Text>
              </Link>
            </div>
            <div className="flex gap-5 md:hidden">
              <Text className="rounded-3xl bg-[#101828] p-2 px-4 font-dmSansRegular text-[12px] text-[#FFFFFF]">
                Most Popular
              </Text>
              <Text className="p-2 font-dmSansRegular text-[12px] text-[#475467]">
                Best Price
              </Text>
              <Text className="p-2 font-dmSansRegular text-[12px] text-[#475467]">
                Near Me
              </Text>
            </div>
          </div>
          <div className="no-scrollbar flex max-w-[682px] overflow-x-auto scroll-smooth">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${trips?.result?.length}, 1fr)`,
              }}
            >
              {isSuccess &&
                trips.result?.map((post: { id: any }) => (
                  <Link href={`/trips/${post.id}`} key={`${post.id}`}>
                    <TripCard post={post} />
                  </Link>
                ))}
            </div>
          </div>
          <div className="mt-14 flex justify-between">
            <Text className="font-dmSansBold text-[18px] text-[#101828]">
              Events Around You
            </Text>
            <Link href="/events">
              <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
                view all
              </Text>
            </Link>
          </div>
          <div className="no-scrollbar flex max-w-[682px] overflow-x-auto scroll-smooth">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${events?.result?.length}, 1fr)`,
              }}
            >
              {eventSuccess &&
                events.result?.map((post: { id: any }) => (
                  <Link href={`/events/${post.id}`} key={`${post.id}`}>
                    <EventCard post={post} />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
