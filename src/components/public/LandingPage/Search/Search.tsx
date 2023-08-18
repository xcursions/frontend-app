"use client";

import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

import Heading from "@/components/lib/Heading/Heading";
import Select from "@/components/lib/Select/Select";

const initialState = {
  location: "",
  price: "",
  date: "",
};
const optionLocation = [
  { value: "Maldives", label: "Maldives" },
  { value: "Santorini", label: "Santorini" },
  { value: "San Francisco", label: "San Francisco" },
  { value: "Bali", label: "Bali" },
];
const optionPrice = [
  { value: "10000-20000", label: "10000-20000" },
  { value: "20000-30000", label: "20000-30000" },
  { value: "30000-40000", label: "30000-40000" },
  { value: "50000 and above", label: "50000 and above" },
];
const optionDate = [
  { value: "383884", label: "August" },
  { value: "20000-30000", label: "September" },
  { value: "30000-40000", label: "October" },
  { value: "50000 and above", label: "anytime" },
];
const Search = () => {
  const [payload, setPayload] = useState(initialState);
  return (
    <div className=" absolute top-[60%] md:top-[80%]">
      <div className=" rounded-2xl bg-[#FFFFFF] p-5 shadow-lg">
        <div>
          <Heading
            type="h3"
            className="items-center py-4 text-center text-[#101828]"
          >
            Where are you going
          </Heading>
        </div>
        <div className="mx-auto flex flex-col items-center justify-center gap-5 py-4 text-start font-dmSansRegular text-base md:flex-row">
          <Select
            placeholder={"Select an Option"}
            label="Location"
            startIcon={"/assets/images/landing-page/map.png"}
            value={payload.location}
            onChange={(event) =>
              setPayload({
                ...payload,
                location: event.value,
              })
            }
            showArrow
            options={optionLocation.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            className=" block w-[290px] cursor-pointer rounded-lg text-sm text-[#98A2B3] md:w-auto lg:w-[270px] xl:w-[300px]"
          />
          <Select
            placeholder={"When are you going"}
            label="Date"
            value={payload.date}
            startIcon={"/assets/images/landing-page/calendar.png"}
            onChange={(event) =>
              setPayload({
                ...payload,
                date: event.value,
              })
            }
            options={optionDate.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            showArrow
            className=" block w-[290px] cursor-pointer text-sm text-[#667084] md:w-auto lg:w-[270px] xl:w-[300px]"
          />
          <Select
            placeholder={"Select an Option"}
            label="Price"
            value={payload.price}
            startIcon={"/assets/images/landing-page/dollar.png"}
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
            className=" block w-[290px] cursor-pointer text-sm text-[#667084] md:w-auto lg:w-[270px] xl:w-[300px]"
          />
          <button className="flex w-full justify-center gap-3 rounded-3xl bg-[#0A83FF] p-3 text-white lg:mt-4 lg:w-[80px] lg:p-5">
            <BsSearch />
            <span className="text-center md:hidden">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
