import { useState } from "react";

import Text from "@/components/lib/Text/Text";
import TripCard from "@/components/lib/TripCard/TripCard";
import { useAppSelector, useSuccessHandler } from "@/hooks";
import {
  useGetAllOutingsQuery,
  useSearchOutingsQuery,
} from "@/services/public";
import HeaderSection from "@/ui-components/HeaderSection";
import Section from "@/ui-components/Section";

// import styles from "./Home.module.scss";

export default function Dashboard() {
  const [trips, setTrips] = useState<any>([]);
  const { data, isSuccess } = useGetAllOutingsQuery();
  const { data: eventData, isSuccess: eventSuccess } =
    useSearchOutingsQuery("?type=event");
  const { user } = useAppSelector((state) => state.user);
  useSuccessHandler({
    isSuccess,
    showToast: false,
    successFunction: () => {
      if (data) {
        setTrips(data);
      }
    },
  });
  console.log(eventSuccess);
  console.log(eventData);
  return (
    <>
      <div className="mt-[19px] max-w-[783px] border-2">
        <div className="mx-[30px]">
          <HeaderSection
            heading={`Hello, ${user?.profile?.fullName} 🏝️`}
            subHeading={"Welcome back to your dashboard"}
          />

          <Section>
            <div className="flex w-[342px] content-center items-center rounded-2xl bg-[#e2ecf6] text-center shadow-md md:w-full lg:w-[214px]">
              <img
                src="/assets/images/icons/dashboard1.png"
                alt="dashboard"
                className=" my-8 ml-6 mr-3 max-w-[60px] items-center rounded-full shadow-lg"
              />
              <div className="items-center text-center">
                <p className="text-start text-[12px] text-[#3B9CFF]">Balance</p>
                <p className="font-dmSansBold text-[26px] font-bold text-[#021A33]">
                  ₦200k
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
                <p className="font-dmSansBold text-[26px] font-bold text-[#021A33]">
                  50
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
                <p className="font-dmSansBold text-[26px] font-bold text-[#021A33]">
                  20
                </p>
              </div>
            </div>
          </Section>
          <div className="mt-16">
            <div className="flex justify-between pr-3">
              <Text className="font-dmSansBold text-[18px] text-[#101828]">
                Available Trips
              </Text>
              <div className="hidden gap-5 md:flex">
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
              <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
                view all
              </Text>
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
                  <TripCard post={post} key={`${post.id}`} />
                ))}
            </div>
          </div>
          <div className="mt-14 flex justify-between">
            <Text className="font-dmSansBold text-[18px] text-[#101828]">
              Events Around You
            </Text>
            <Text className="p-2 font-dmSansMedium text-[12px] text-[#667084] underline">
              view all
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
