"use client";

import type { FormEvent } from "react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input";
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
const Search = () => {
  const [payload, setPayload] = useState(initialState);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setPayload({
      ...payload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
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
            className=" block w-[290px] cursor-pointer  rounded-lg border border-gray-300 bg-gray-50 text-sm text-[#667084] shadow-md md:w-auto lg:w-[270px] xl:w-[300px]"
          />
          <Input
            type="date"
            label="Date"
            name="date"
            value={payload.date}
            onChange={handleChange}
            placeholder="When are you going"
            className=" block w-[290px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-[#667084] shadow-md focus:border-blue-500
            focus:ring-blue-500 md:w-auto lg:w-[270px] xl:w-[300px]"
          />
          <Select
            placeholder={"Select an Option"}
            label="Price"
            value={payload.price}
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
            className=" block w-[290px] cursor-pointer  rounded-lg border border-gray-300 bg-gray-50 text-sm text-[#667084] shadow-md md:w-auto lg:w-[270px] xl:w-[300px]"
          />
          <button className="flex w-full justify-center gap-3 rounded-3xl bg-[#0A83FF] p-3  text-white lg:mt-4 lg:p-5">
            <BsSearch />
            <span className="text-center md:hidden">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
