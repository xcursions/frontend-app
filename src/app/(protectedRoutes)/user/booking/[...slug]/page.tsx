"use client";

import React from "react";

import { useGetBookingByIdQuery } from "@/services/user";
import BookedTripDetails from "@/views/booking/Details";

type RouteParams = {
  slug: string[];
};

const BookingDetails = ({ params }: { params: RouteParams }) => {
  const { slug } = params;
  const { data: bookingData, isSuccess: isBookingSuccess } =
    useGetBookingByIdQuery({
      query: slug[0],
      id: slug[1],
    });
  return (
    <div className="bg-[#F9FAFB]">
      {isBookingSuccess && <BookedTripDetails detailsData={bookingData} />}
    </div>
  );
};

export default BookingDetails;
