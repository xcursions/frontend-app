"use client";

import Link from "next/link";
import type { ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";

import Input from "@/components/lib/Input";
import { Pagination } from "@/components/lib/Pagination";
import Select from "@/components/lib/Select/Select";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import {
  useGetOutingDurationsQuery,
  useGetOutingLocationsQuery,
  useGetOutingPriceRangeQuery,
  useGetOutingsByMultipleIdMutation,
  useLazyGetAllOutingsQuery,
} from "@/services/public";

import EventCard from "./EventCard/EventCard";
import styles from "./SearchEvents.module.scss";

const initialState = {
  search: "",
};

const optionTrip = [
  { value: "private", label: "Private Trip" },
  { value: "group", label: "Group Trip" },
];
const SearchEvents = () => {
  const [payload, setPayload] = useState(initialState);
  const { isSuccess: locationIsSuccess, data: locationData } =
    useGetOutingLocationsQuery("event");
  const { isSuccess: durationIsSuccess, data: durationData } =
    useGetOutingDurationsQuery();
  const { isSuccess: priceRangeSuccess, data: priceRangeData } =
    useGetOutingPriceRangeQuery();
  const [location, setLocation] = useState([]);
  const [range, setRange] = useState([]);
  const [queryLocation, setQueryLocation] = useState("");
  const [queryTripType, setQueryTripType] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 8;
  const [getOuting, { data, isSuccess }] = useLazyGetAllOutingsQuery();
  const [
    getMultipleOuting,
    { data: multipleOutingData, isSuccess: isMultipleOutingSuccess },
  ] = useGetOutingsByMultipleIdMutation();
  const [showFilter, setShowFilter] = useState(false);

  useSuccessHandler({
    isSuccess: locationIsSuccess,
    successFunction: () => {
      setLocation(locationData?.outingDestination);
    },

    showToast: false,
  });
  useEffect(() => {
    if (range.length > 0) {
      getMultipleOuting({ outingIds: range });
    } else if (queryLocation || queryTripType || payload.search) {
      getOuting(
        `?type=event&limit=${pageLimit}&page=${currentPage}&location=${queryLocation}&subType=${queryTripType}&search=${payload.search}`
      );
    } else {
      getOuting(`?type=event&limit=${pageLimit}&page=${currentPage}`);
    }
  }, [queryTripType, queryLocation, currentPage, payload.search, range]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/** Search field */}
        <div className="flex">
          <form className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-3">
            <div className="flex w-full items-center ">
              <div className="relative w-full">
                <Input
                  type="text"
                  name="search"
                  startIcon
                  value={payload.search}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPayload({
                      ...payload,
                      search: e.target.value,
                    })
                  }
                  id="simple-search"
                  className="block w-[240px] rounded-lg text-sm text-[#667084] focus:border-blue-500 focus:ring-blue-500 md:w-[350px] lg:w-[342px]"
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
              {priceRangeSuccess && (
                <Select
                  placeholder={"Price"}
                  value={""}
                  startIcon={"/assets/images/icons/dollar.png"}
                  // @ts-ignore
                  onChange={(event) => setRange(event.value)}
                  options={priceRangeData.map(
                    (option: { outingIds: any; priceRange: any }) => ({
                      value: option.outingIds,
                      label: option.priceRange,
                    })
                  )}
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
              {durationIsSuccess && (
                <Select
                  placeholder={"Duration"}
                  value={""}
                  startIcon={"/assets/images/icons/calendar1.png"}
                  // @ts-ignore
                  onChange={(event) => setRange(event.value)}
                  options={durationData.map(
                    (option: { outingIds: any; duration: any }) => ({
                      value: option.outingIds,
                      label: option.duration,
                    })
                  )}
                  showArrow
                  className=" block w-full cursor-pointer  rounded-lg text-sm text-[#667084]"
                />
              )}
            </div>
          </form>
        </div>
        {/* Trip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {isMultipleOutingSuccess
            ? multipleOutingData?.result
                .filter((outing: any) => outing.type === "event")
                .map((post: any) => (
                  <Link key={`${post.id}`} href={`/events/${post.id}`}>
                    <EventCard post={post} />
                  </Link>
                ))
            : isSuccess &&
              data?.result.map((post: any) => (
                <Link key={`${post.id}`} href={`/events/${post.id}`}>
                  <EventCard post={post} />
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
