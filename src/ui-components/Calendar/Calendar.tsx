import React from "react";
import { TbCalendar } from "react-icons/tb";

import Button from "@/components/lib/Button/Button";
import { formatDatesRange } from "@/components/lib/FormatWeekRange/FormatWeekRage";
import Text from "@/components/lib/Text/Text";
import { Calendar } from "@/components/ui/calendar";
import { useGetBookingHistoryQuery } from "@/services/user";

import styles from "./Calendar.module.scss";

const CalendarComponent = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { data, isSuccess } = useGetBookingHistoryQuery("?limit=10");
  return (
    <div className={styles.container}>
      <Text className="pl-2 font-dmSansBold text-[18px] text-[#101828]">
        Upcoming Schedule
      </Text>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="w-full max-w-[290px] rounded-2xl border bg-[#F2F4F7]"
      />
      {isSuccess && data?.result.length > 0 ? (
        <div>
          <Text className="py-3 pl-2 font-dmSansBold text-[18px] font-bold">
            Next Schedules
          </Text>
          {data.result
            .filter((res: { status: string }) => res.status === "successful")
            .map(
              (info: {
                id: React.Key | null | undefined;
                outing: {
                  name:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined;
                };
                bookingDate: {
                  startDate: string | number | Date;
                  endDate: string | number | Date;
                };
              }) => (
                <div
                  key={info.id}
                  className="my-3 flex gap-2 rounded-xl border p-2 shadow-md"
                >
                  <img
                    src="/assets/images/dashboard/dashboard.png"
                    alt="booking image"
                    className="h-[65px] w-[65px]"
                  />
                  <div>
                    <p className="text-[14px] font-semibold">
                      {info.outing.name}
                    </p>
                    <p className=" my-5 flex gap-3 font-dmSansRegular text-[12px] text-[#475467]">
                      <TbCalendar className=" text-xl text-[#0A83FF]" />
                      {formatDatesRange(
                        info?.bookingDate?.startDate,
                        info?.bookingDate?.endDate
                      )}
                    </p>
                  </div>
                </div>
              )
            )}
        </div>
      ) : (
        <div className="mx-auto max-w-[200px] content-center items-center justify-center py-10">
          <div className="mx-auto content-center items-center justify-items-center">
            <img
              src="/assets/images/dashboard/Illustration.png"
              alt="book a trip"
              className="mx-auto h-[100px] w-[124px]"
            />
            <Text className="mx-auto mb-5 mt-7 text-center text-[12px]">
              Sorry you don’t have any schedule at the moment
            </Text>
            <Button className=" mx-auto w-[191px] justify-center rounded-3xl">
              Book a trip
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
