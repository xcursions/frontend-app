"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

import Input from "@/components/lib/Input";
import { Pagination } from "@/components/lib/Pagination";
import Select from "@/components/lib/Select/Select";
import { useGetAllOutingsQuery } from "@/services/public";

import EventCard from "./EventCard/EventCard";
import styles from "./SearchEvents.module.scss";

const initialState = {
  search: "",
  location: "",
  trips: "",
  price: "",
  duration: "",
};
const optionLocation = [
  { value: "Maldives", label: "Maldives" },
  { value: "Santorini", label: "Santorini" },
  { value: "San Francisco", label: "San Francisco" },
  { value: "Bali", label: "Bali" },
];
const optionTrip = [
  { value: "All Trip", label: "All Trip" },
  { value: "Private Trip", label: "Private Trip" },
  { value: "Group Trip", label: "Group Trip" },
];
const optionPrice = [
  { value: "100k-200k", label: "100k-200k" },
  { value: "200k-300k", label: "200k-300k" },
  { value: "400k-900k", label: "400k-900k" },
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 8;
  const { data, isSuccess } = useGetAllOutingsQuery(
    `?type=event&limit=${pageLimit}&page=${currentPage}`
  );
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
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
                  onChange={handleChange}
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
                value={payload.trips}
                startIcon={"/assets/images/icons/plane.png"}
                onChange={(event) =>
                  setPayload({
                    ...payload,
                    trips: event.value,
                  })
                }
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
                value={payload.price}
                startIcon={"/assets/images/icons/dollar.png"}
                onChange={(event) =>
                  setPayload({
                    ...payload,
                    price: event.value,
                  })
                }
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
              <Select
                placeholder={"Location"}
                value={payload.location}
                startIcon={"/assets/images/icons/map.png"}
                onChange={(event) =>
                  setPayload({
                    ...payload,
                    location: event.value,
                  })
                }
                options={optionLocation.map((option) => ({
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
