"use client";

import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

import postData from "./data";
import styles from "./SearchTrips.module.scss";
import TripCard from "./TripCard/TripCard";

const initialState = {
  search: "",
  location: "",
  trips: "",
  price: "",
  duration: "",
};
const SearchTrips = () => {
  const [payload, setPayload] = useState(initialState);
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/** Search field */}
        <div className="flex">
          <form className="flex flex-col items-center gap-10 lg:flex-row lg:gap-3">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="flex w-full ">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  value={payload.search}
                  onChange={handleChange}
                  id="simple-search"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-[#667084] shadow-md focus:border-blue-500  focus:ring-blue-500"
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
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <div className="flex py-2">
                  <img
                    src="/assets/images/icons/plane.png"
                    alt=""
                    className="h-[20px w-[20px]"
                  />
                  <p className=" text-[12px]">Trip Type:</p>
                </div>
              </div>
              <select
                name="trips"
                value={payload.trips}
                onChange={handleChange}
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-20 text-sm text-[#667084]
                 shadow-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option>All Trip</option>
                <option>Private Trip</option>
                <option>Group Trip</option>
              </select>
            </div>
            <div
              className={`${
                showFilter ? "block" : "hidden"
              } relative w-full lg:block`}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <div className="flex py-2">
                  <img
                    src="/assets/images/icons/dollar.png"
                    alt=""
                    className="h-[20px w-[20px]"
                  />
                  <p className="ml-1 text-[12px]">Price:</p>
                </div>
              </div>
              <select
                name="price"
                value={payload.price}
                onChange={handleChange}
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-16 text-sm text-[#667084]
                 shadow-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option>All</option>
                <option>100k-200k</option>
                <option>300k-400k</option>
                <option>400k-900k</option>
              </select>
            </div>
            <div
              className={`${
                showFilter ? "block" : "hidden"
              } relative w-full lg:block`}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <div className="flex py-2">
                  <img
                    src="/assets/images/icons/map.png"
                    alt=""
                    className="h-[20px w-[20px]"
                  />
                  <p className="ml-1 text-[12px]">Location:</p>
                </div>
              </div>
              <select
                name="location"
                value={payload.location}
                onChange={handleChange}
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-20 text-sm text-[#667084]
                 shadow-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option>All</option>
                <option>Nigeria</option>
                <option>Peru</option>
                <option>Finland</option>
                <option>England</option>
                <option>United States</option>
              </select>
            </div>
            <div
              className={`${
                showFilter ? "block" : "hidden"
              } relative w-full lg:block`}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <div className="flex py-2">
                  <img
                    src="/assets/images/icons/calendar1.png"
                    alt=""
                    className="h-[20px w-[20px]"
                  />
                  <p className="ml-1 text-[12px]">Duration:</p>
                </div>
              </div>
              <select
                name="duration"
                value={payload.duration}
                onChange={handleChange}
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-20 text-sm text-[#667084]
                 shadow-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option>All</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>1 Month</option>
                <option>2 Months</option>
                <option>3 Months</option>
              </select>
            </div>
            <button
              type="submit"
              className="ml-2 hidden rounded-lg border border-blue-700 bg-blue-700 p-2.5 text-sm
               font-medium text-white hover:bg-blue-800 focus:outline-none
                focus:ring-4 focus:ring-blue-300 lg:block"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
            {showFilter && (
              <button
                type="submit"
                className="ml-2 w-full rounded-2xl border bg-[#0A83FF] p-2.5 text-sm font-medium
               text-white focus:outline-none focus:ring-4
                focus:ring-blue-300 lg:hidden"
              >
                Search
              </button>
            )}
          </form>
        </div>
        {/* Trip Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {postData.map((post) => (
            <TripCard post={post} key={post.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchTrips;
