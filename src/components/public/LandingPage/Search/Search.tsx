/* eslint-disable consistent-return */

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toaster from "react-hot-toast";
import { BsSearch } from "react-icons/bs";

import FullPageLoader from "@/components/lib/FullPageLoader";
import Heading from "@/components/lib/Heading/Heading";
import Select from "@/components/lib/Select/Select";
import useSuccessHandler from "@/hooks/useSuccessHandler";
import {
  useGetOutingByContinentsQuery,
  useGetOutingByMonthsQuery,
  useGetOutingByTypeQuery,
} from "@/services/public";

const optionPrice = [
  { value: { minPrice: "0", maxPrice: "500000" }, label: "Under 500k" },
  { value: { minPrice: "500000", maxPrice: "1000000" }, label: "500k - 1M" },
  { value: { minPrice: "1000000", maxPrice: "1500000" }, label: "1M - 1.5M" },
  { value: { minPrice: "1500000", maxPrice: "3000000" }, label: "1.5M -3M" },
  {
    value: { minPrice: "3000000", maxPrice: "20000000" },
    label: "3M and above",
  },
];

const Search = () => {
  const [price, setPrice] = useState("");
  const [queryType, setQueryType] = useState("");
  const [queryLocation, setQueryLocation] = useState("");
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [queryMonth, setQueryMonth] = useState("");
  const [continent, setContinent] = useState([]);
  const [type, setType] = useState([]);
  const [month, setMonth] = useState([]);
  const [isRouting, setIsRouting] = useState(false);
  const router = useRouter();
  const { isSuccess: continentSuccess, data: continentData } =
    useGetOutingByContinentsQuery({ type: "tour", location: queryLocation });
  const { isSuccess: typeSuccess, data: typeData } = useGetOutingByTypeQuery({
    type: "tour",
    location: queryLocation,
    subType: queryType,
    month: queryMonth,
  });

  const { isSuccess: monthSuccess, data: monthData } =
    useGetOutingByMonthsQuery({
      type: "tour",
      location: queryLocation,
      subType: queryType,
      month: queryMonth,
    });

  function splitPriceRange(priceRange: string) {
    const [min, max] = priceRange.split("-").map(Number);
    return { min, max };
  }

  useEffect(() => {
    const { min, max } = splitPriceRange(price);
    setMinPrice(min);
    setMaxPrice(max);
  }, [price]);

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

  const handleSubmitQuery = () => {
    const queryParams = [];

    if (!queryType && !queryLocation && !minPrice && !maxPrice && !queryMonth) {
      return toaster.error("Please select a search parameter");
    }

    if (queryType) {
      queryParams.push(`subType=${queryType}`);
    }
    if (queryLocation) {
      queryParams.push(`location=${queryLocation}`);
    }
    if (queryMonth) {
      queryParams.push(`month=${queryMonth}`);
    }
    if (minPrice) {
      queryParams.push(`minPrice=${minPrice}`);
    }
    if (maxPrice) {
      queryParams.push(`maxPrice=${maxPrice}`);
    }

    const newQuery = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    setIsRouting(true);
    router.push(`/trips${newQuery}`);
  };

  return (
    <div className="relative z-10">
      <div className=" mx-1 max-w-[1209px] rounded-2xl bg-[#FFFFFF] p-5 shadow-lg lg:max-h-[230px]">
        <div>
          <Heading
            type="h3"
            className="mt-3 items-center text-center text-[18px] text-[#101828]"
          >
            Where Are You Going?
          </Heading>
        </div>
        <div className=" my-2 flex flex-col items-center justify-center gap-5 text-start font-dmSansRegular text-base lg:flex-row lg:gap-2">
          {continentSuccess && (
            <Select
              placeholder={"Select Continents"}
              label="Location"
              startIcon={"/assets/images/landing-page/map.png"}
              value={queryLocation}
              onChange={(event) => setQueryLocation(event.value)}
              options={continent.map(
                (option: { continent: string; totalOuting: number }) => ({
                  value: option.continent,
                  label: `${option.continent} (${option.totalOuting})`,
                })
              )}
              showArrow
              className=" block w-[290px] cursor-pointer rounded-lg text-sm text-[#98A2B3] md:w-[350px] lg:w-[200px] xl:w-[250px]"
            />
          )}
          {typeSuccess && (
            <Select
              placeholder={"Select Type"}
              label="Trip Type"
              startIcon={"/assets/images/landing-page/map.png"}
              value={queryType}
              onChange={(event) => setQueryType(event.value)}
              options={type.map(
                (option: { type: string; totalOuting: number }) => ({
                  value: option.type,
                  label: `${option.type} (${option.totalOuting})`,
                })
              )}
              showArrow
              className=" block w-[290px] cursor-pointer rounded-lg text-sm text-[#98A2B3] md:w-[350px] lg:w-[200px] xl:w-[250px]"
            />
          )}
          {monthSuccess && (
            <Select
              placeholder={"When Are You Going?"}
              label="Select Month"
              value={queryMonth}
              startIcon={"/assets/images/landing-page/calendar.png"}
              onChange={(event) => setQueryMonth(event.value)}
              options={month.map(
                (option: { month: string; totalOuting: number }) => ({
                  value: option.month,
                  label: `${option.month} (${option.totalOuting})`,
                })
              )}
              showArrow
              className=" block w-[290px] cursor-pointer text-sm text-[#667084] md:w-[350px] lg:w-[200px] xl:w-[250px]"
            />
          )}
          <Select
            placeholder={"Select an Option"}
            label="Price"
            value={price}
            startIcon={"/assets/images/landing-page/dollar.png"}
            onChange={(event) => setPrice(event.value)}
            options={optionPrice.map((option) => ({
              value: `${option.value.minPrice}-${option.value.maxPrice}`,
              label: option.label,
            }))}
            showArrow
            className=" block w-[290px] cursor-pointer text-sm text-[#667084] md:w-[350px] lg:w-[200px] xl:w-[250px]"
          />
          <button
            className="flex w-[300px] items-center justify-center gap-3 rounded-[100px] bg-[#0A83FF] p-3 text-white lg:mt-4 lg:h-[96px] lg:w-[75px] lg:p-5"
            onClick={() => handleSubmitQuery()}
          >
            <BsSearch className="text-xl" />
            <span className="text-center lg:hidden">Search</span>
          </button>
        </div>
        {isRouting && <FullPageLoader />}
      </div>
    </div>
  );
};

export default Search;
