"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Fullcalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import * as bootstrap from "bootstrap";
import React from "react";

import {
  formatDatesRange,
  formatedDate,
} from "@/components/lib/FormatWeekRange/FormatWeekRage";
import { useGetUpcomingScheduleQuery } from "@/services/user";
import type UpcomingOutingProps from "@/types/UpcomingOutingProps";

const ScheduleInfo = () => {
  const { data, isSuccess } = useGetUpcomingScheduleQuery();
  const events =
    isSuccess &&
    data?.result
      .filter((res: { status: string }) => res.status === "successful")
      .map((res: UpcomingOutingProps) => {
        return {
          title: res.outing.name,
          start: res.bookingDate.startDate,
          extendedProps: {
            description: res.outing.description,
            image: res.outing.outingGallery[0].image,
            updatedAt: res.updatedAt,
            endDate: res.bookingDate.endDate,
          },
          end: "",
          backgroundColor: "#FFF5EB",
          textColor: "#FF860A",
          borderColor: "#FFF5EB",
          classNames: [
            "h-[70px]",
            "lg:h-[100px]",
            "bg-[#fff5eb]",
            "rounded-2xl",
          ],
        };
      });
  return (
    <div className="max-w-[950px] p-10">
      <div className="rounded-2xl border p-3">
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "title",
            center: "",
            end: "prev,next",
          }}
          // height={"90vh"}
          events={events}
          eventDidMount={(info) => {
            return new bootstrap.Popover(info.el, {
              title: info.event.title,
              placement: "top",
              trigger: "hover",
              customClass: "popoverStyle",
              content: `${formatDatesRange(
                // @ts-ignore
                info.event.start,
                info.event.extendedProps.endDate
              )} <br /> <br /> <img src=${
                info.event.extendedProps.image ||
                "/assets/images/user/schedule.png"
              } alt="outing" /> <br /> <p>${
                info.event.extendedProps.description
              }</p> <br /> <hr /> <br /> last updated ${formatedDate(
                info.event.extendedProps.updatedAt
              )}`,
              html: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default ScheduleInfo;
