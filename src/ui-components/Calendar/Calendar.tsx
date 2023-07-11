import React from "react";

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
    </div>
  );
};

export default CalendarComponent;
