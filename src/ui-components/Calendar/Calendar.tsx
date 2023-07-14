import React from "react";

import Button from "@/components/lib/Button/Button";
import Text from "@/components/lib/Text/Text";
import { Calendar } from "@/components/ui/calendar";

import styles from "./Calendar.module.scss";

const CalendarComponent = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
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
    </div>
  );
};

export default CalendarComponent;
