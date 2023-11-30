"use client";

import React from "react";

import BookedTripDetails from "@/Pages/booking/Details";
import { useGetBookingByIdQuery } from "@/services/user";
import Layout from "@/ui-components/layout";

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
      <Layout>
        {isBookingSuccess && <BookedTripDetails detailsData={bookingData} />}
      </Layout>
    </div>
  );
};

export default BookingDetails;
