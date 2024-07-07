"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";

import Input from "@/components/lib/Input";
import { Pagination } from "@/components/lib/Pagination";
import Select from "@/components/lib/Select/Select";
import TripCard from "@/components/public/LandingPage/AvailableTrips/TripCard";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import {
  useFetchAllOutingsQuery,
  useGetOutingByContinentsQuery,
  useGetOutingByMonthsQuery,
  useGetOutingByTypeQuery,
} from "@/services/public";
import type { OutingProps } from "@/types";

import styles from "./SearchTrips.module.scss";
// import TripCard from "./TripCard/TripCard";

const optionPrice = [
  { value: { minPrice: "0", maxPrice: "500000" }, label: "Under 500,000" },
  {
    value: { minPrice: "500000", maxPrice: "1000000" },
    label: "500,000 - 1,000,000",
  },
  {
    value: { minPrice: "1000000", maxPrice: "1500000" },
    label: "1,000,000 - 1,500,000",
  },
  {
    value: { minPrice: "1500000", maxPrice: "3000000" },
    label: "1,500,000 -3,000,000",
  },
  {
    value: { minPrice: "3000000", maxPrice: "20000000" },
    label: "3,000,000 and above",
  },
];

const SearchTrips = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams?.get("location") ?? undefined;
  const maxPrice = searchParams?.get("maxPrice") ?? undefined;
  const minPrice = searchParams?.get("minPrice") ?? undefined;
  const subType = searchParams?.get("subType") ?? undefined;
  const queryMonth = searchParams?.get("month") ?? undefined;
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState([]);
  const [type, setType] = useState([]);
  const [month, setMonth] = useState([]);

  const [outingData, setOutingData] = useState<OutingProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageLimit = 16;
  const { data, isSuccess } = useFetchAllOutingsQuery({
    limit: pageLimit,
    page: currentPage,
    type: "tour",
    subType,
    month: queryMonth,
    search,
    isDraft: false,
    location,
    minPrice,
    maxPrice,
  });
  const { isSuccess: continentSuccess, data: continentData } =
    useGetOutingByContinentsQuery({
      type: "tour",
      location,
      subType,
    });
  const { isSuccess: typeSuccess, data: typeData } = useGetOutingByTypeQuery({
    type: "tour",
    location,
    subType,
    month: queryMonth,
  });

  const { isSuccess: monthSuccess, data: monthData } =
    useGetOutingByMonthsQuery({
      type: "tour",
      location,
      subType,
      month: queryMonth,
    });
  function splitPriceRange(priceRange: string) {
    const [min, max] = priceRange.split("-").map(String);
    return { min, max };
  }

  const [showFilter, setShowFilter] = useState(false);

  useSuccessHandler({
    isSuccess,
    dependencies: [data],
    successFunction: () => {
      setOutingData(data.result);
    },

    showToast: false,
  });
  useSuccessHandler({
    isSuccess: continentSuccess,
    dependencies: [continentData],
    successFunction: () => {
      setContinent(continentData);
    },

    showToast: false,
  });

  useSuccessHandler({
    isSuccess: typeSuccess,
    dependencies: [typeData || monthData],
    successFunction: () => {
      setType(typeData);
    },

    showToast: false,
  });

  useSuccessHandler({
    isSuccess: monthSuccess,
    dependencies: [monthData || typeData],
    successFunction: () => {
      setMonth(monthData);
    },

    showToast: false,
  });
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
                  name="outing name"
                  startIcon
                  value={search}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
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
              {typeSuccess && (
                <Select
                  placeholder={"Trip type"}
                  value={subType}
                  startIcon={"/assets/images/icons/plane.png"}
                  onChange={(event) => {
                    const queryParams = new URLSearchParams();
                    if (location) {
                      queryParams.set("location", location);
                    }
                    if (minPrice) {
                      queryParams.set("minPrice", minPrice);
                    }
                    if (maxPrice) {
                      queryParams.set("maxPrice", maxPrice);
                    }
                    if (queryMonth) {
                      queryParams.set("month", queryMonth);
                    }
                    queryParams.set("subType", event.value);
                    router.push(`?${queryParams.toString()}`);
                  }}
                  options={type.map(
                    (option: { type: string; totalOuting: number }) => ({
                      value: option.type,
                      label: `${
                        option.type === "private" ? "personalize" : option.type
                      } (${option.totalOuting})`,
                    })
                  )}
                  showArrow
                  className=" block w-full cursor-pointer rounded-lg  text-sm text-[#667084]"
                />
              )}
            </div>
            <div
              className={`${
                showFilter ? "block" : "hidden"
              } relative w-full lg:block`}
            >
              <Select
                placeholder={"Price"}
                value={minPrice && `${minPrice}-${maxPrice}`}
                startIcon={"/assets/images/icons/dollar.png"}
                onChange={(event) => {
                  const { min, max } = splitPriceRange(event.value);
                  const queryParams = new URLSearchParams();
                  if (location) {
                    queryParams.set("location", location);
                  }
                  if (subType) {
                    queryParams.set("subType", subType);
                  }
                  if (queryMonth) {
                    queryParams.set("month", queryMonth);
                  }
                  queryParams.set("minPrice", min);
                  queryParams.set("maxPrice", max);

                  router.push(`?${queryParams.toString()}`);
                }}
                options={optionPrice.map((option) => ({
                  value: `${option.value.minPrice}-${option.value.maxPrice}`,
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
              {continentSuccess && (
                <Select
                  placeholder={"Select Continents"}
                  value={location}
                  startIcon={"/assets/images/icons/map.png"}
                  onChange={(event) => {
                    const queryParams = new URLSearchParams();
                    if (minPrice) {
                      queryParams.set("minPrice", minPrice);
                    }
                    if (maxPrice) {
                      queryParams.set("maxPrice", maxPrice);
                    }
                    if (subType) {
                      queryParams.set("subType", subType);
                    }
                    if (queryMonth) {
                      queryParams.set("month", queryMonth);
                    }
                    queryParams.set("location", event.value);
                    router.push(`?${queryParams.toString()}`);
                  }}
                  options={continent.map(
                    (option: { continent: string; totalOuting: number }) => ({
                      value: option.continent,
                      label: `${option.continent} (${option.totalOuting})`,
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
              {monthSuccess && (
                <Select
                  placeholder={"Select Month"}
                  value={queryMonth}
                  startIcon={"/assets/images/icons/calendar1.png"}
                  onChange={(event) => {
                    const queryParams = new URLSearchParams();
                    if (minPrice) {
                      queryParams.set("minPrice", minPrice);
                    }
                    if (maxPrice) {
                      queryParams.set("maxPrice", maxPrice);
                    }
                    if (subType) {
                      queryParams.set("subType", subType);
                    }
                    if (location) {
                      queryParams.set("location", location);
                    }
                    queryParams.set("month", event.value);
                    router.push(`?${queryParams.toString()}`);
                  }}
                  options={month.map(
                    (option: { month: string; totalOuting: number }) => ({
                      value: option.month,
                      label: `${option.month} (${option.totalOuting})`,
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
        <div className="flex flex-wrap justify-between">
          {outingData.map((post) => (
            <TripCard post={post} key={`${post.id}`} />
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

export default SearchTrips;
