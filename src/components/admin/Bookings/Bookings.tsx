import React, { useState } from "react";

import styles from "./Bookings.module.scss";
import Trips from "./Trips/Trips";

const AllBookings = () => {
  const [type, setType] = useState<
    "flight" | "accomodation" | "custom" | "trip"
  >("trip");
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className="flex gap-5">
          <p
            className={`cursor-pointer text-[16px] ${
              type === "trip"
                ? " border-b-2 border-[#0A83FF] px-3 pb-3 font-bold text-[#0A83FF]"
                : "text-[#344054]"
            }`}
            onClick={() => setType("trip")}
          >
            Trips/Events
          </p>
          <p
            className={`cursor-pointer text-[16px] ${
              type === "flight"
                ? " border-b-2 border-[#0A83FF] px-3 pb-3 font-bold text-[#0A83FF]"
                : "text-[#344054]"
            }`}
            onClick={() => setType("flight")}
          >
            Flights
          </p>
          <p
            className={`cursor-pointer text-[16px]  ${
              type === "accomodation"
                ? " border-b-2 border-[#0A83FF] px-3 pb-3 font-bold text-[#0A83FF]"
                : "text-[#344054]"
            }`}
            onClick={() => setType("accomodation")}
          >
            Accomodations
          </p>
          <p
            className={`cursor-pointer text-[16px]  ${
              type === "custom"
                ? " border-[#0A83FF]font-bold border-b-2 px-3 pb-3 text-[#0A83FF]"
                : "text-[#344054]"
            }`}
            onClick={() => setType("custom")}
          >
            Custom Trips
          </p>
        </div>
        {type === "trip" && <Trips />}
      </div>
    </div>
  );
};

export default AllBookings;
