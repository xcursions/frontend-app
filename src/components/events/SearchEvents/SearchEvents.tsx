"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";

import Input from "@/components/lib/Input";
import { Pagination } from "@/components/lib/Pagination";
import Select from "@/components/lib/Select/Select";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import {
  useGetOutingLocationsQuery,
  useLazyGetAllOutingsQuery,
} from "@/services/public";

import EventCard from "./EventCard/EventCard";
import styles from "./SearchEvents.module.scss";

const initialState = {
  search: "",
  location: "",
  trips: "",
  price: "",
  duration: "",
};

const optionTrip = [
  { value: "private", label: "Private Trip" },
  { value: "group", label: "Group Trip" },
];
const optionPrice = [
  { value: "1000000", label: "under 1M" },
  { value: "2000000", label: "under 2M" },
  { value: "3000000", label: "under 3M" },
  { value: "4000000", label: "under 4M" },
  { value: "5000000", label: "under 5M" },
  { value: "6000000", label: "under 6M" },
];
const optionDuration = [
  { value: "All", label: "All" },
  { value: "1 week", label: "1 week" },
  { value: "2 weeks", label: "2 weeks" },
  { value: "1 month", label: "1 month" },
  { value: "2 month", label: "2 month" },
  { value: "3 month", label: "3 month" },
];
const SearchEvents = () => {
  const [payload, setPayload] = useState(initialState);
  const { isSuccess: locationIsSuccess, data: locationData } =
    useGetOutingLocationsQuery();
  const [location, setLocation] = useState([]);
  const [queryLocation, setQueryLocation] = useState("");
  const [queryTripType, setQueryTripType] = useState("");
  const [maxPrice, setMaxPrice]: any = useState();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 8;
  const [getOuting, { data, isSuccess }] = useLazyGetAllOutingsQuery();
  const [showFilter, setShowFilter] = useState(false);

  useSuccessHandler({
    isSuccess: locationIsSuccess,
    successFunction: () => {
      setLocation(locationData?.outingDestination);
    },

    showToast: false,
  });
  useEffect(() => {
    if (queryLocation || queryTripType || maxPrice) {
      getOuting(
        `?type=event&limit=${pageLimit}&page=${currentPage}&location=${queryLocation}&subType=${queryTripType}&maxPrice=${maxPrice}`
      );
    } else {
      getOuting(`?type=event&limit=${pageLimit}&page=${currentPage}`);
    }
  }, [queryTripType, queryLocation, currentPage, maxPrice]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/** Search field */}
        <div className="flex">
          <form className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-3">
            <div className="flex w-full ">
              <div className="relative w-full">
                <Input
                  type="text"
                  name="search"
                  startIcon
                  value={payload.search}
                  onChange={() => {}}
                  id="simple-search"
                  className="block w-[280px] rounded-lg text-sm text-[#667084] focus:border-blue-500 focus:ring-blue-500 md:w-[350px] lg:w-[342px]"
                  placeholder="Search for trips, events"
                  required
                />
              </div>
              <div className="absolute right-0 lg:hidden">
                <button onClick={() => setShowFilter(!showFilter)}>
                  {showFilter ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-black"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className="w-full rounded bg-black p-3">
                      <FiFilter className="text-white" />
                    </div>
                  )}
                </button>
              </div>
            </div>
            <div
              className={`${
                showFilter ? "block" : "hidden"
              } relative w-full lg:block`}
            >
              <Select
                placeholder={"Trip type"}
                value={queryTripType}
                startIcon={"/assets/images/icons/plane.png"}
                onChange={(event) => setQueryTripType(event.value)}
                options={optionTrip.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                showArrow
                className=" block w-full cursor-pointer rounded-lg  text-sm text-[#667084]"
              />
            </div>
            <div
              className={`${
                showFilter ? "block" : "hidden"
              } relative w-full lg:block`}
            >
              <Select
                placeholder={"Price"}
                value={maxPrice}
                startIcon={"/assets/images/icons/dollar.png"}
                onChange={(event) => setMaxPrice(event.value)}
                options={optionPrice.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                showArrow
                className=" block w-full cursor-pointer  rounded-lg text-sm text-[#667084]"
              />
            </div>
            <div
              className={`${
                showFilter ? "block" : "hidden"
              } relative w-full lg:block`}
            >
              {locationData && (
                <Select
                  placeholder={"Location"}
                  value={queryLocation}
                  startIcon={"/assets/images/icons/map.png"}
                  onChange={(event) => setQueryLocation(event.value)}
                  options={location.map((option) => ({
                    value: option,
                    label: option,
                  }))}
                  showArrow
                  className=" block w-full cursor-pointer  rounded-lg text-sm text-[#667084]"
                />
              )}
            </div>
            <div
              className={`${
                showFilter ? "block" : "hidden"
              } relative w-full lg:block`}
            >
              <Select
                placeholder={"Duration"}
                value={payload.duration}
                startIcon={"/assets/images/icons/calendar1.png"}
                onChange={(event) =>
                  setPayload({
                    ...payload,
                    duration: event.value,
                  })
                }
                options={optionDuration.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
                showArrow
                className=" block w-full cursor-pointer  rounded-lg text-sm text-[#667084]"
              />
            </div>
          </form>
        </div>
        {/* Trip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {isSuccess &&
            data.result.map((post: any) => (
              <Link href={`/events/${post.id}`} key={`${post.id}`}>
                <EventCard post={post} key={`${post.id}`} />
              </Link>
            ))}
        </div>
        {data && (
          <Pagination
            className="pagination-bar my-8"
            currentPage={currentPage}
            totalCount={data?.totalElements}
            pageLimit={pageLimit}
            onPageChange={(v) => setCurrentPage(v)}
          />
        )}
      </div>
    </div>
  );
};

export default SearchEvents;
