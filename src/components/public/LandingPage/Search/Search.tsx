"use client";

import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input";

const Search = () => {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
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
          <label className="flex flex-col">
            Location
            <select className="w-[279px] rounded-xl border-2 p-3  shadow md:w-auto lg:w-[270px]">
              <option value="">Select an option</option>
              <option
                value={location}
                onChange={() => setLocation("Malddives")}
              >
                Maldives
              </option>
              <option
                value={location}
                onChange={() => setLocation("Santorini")}
              >
                santorini
              </option>
              <option value={location} onChange={() => setLocation("Bali")}>
                Bali
              </option>
              <option value={location} onChange={() => setLocation("Dubai")}>
                Dubai
              </option>
            </select>
          </label>
          <Input
            type="date"
            label="Date"
            placeholder="When are you going"
            className="w-[279px] md:w-auto  lg:w-[270px]"
          />
          <label className="flex flex-col">
            Price
            <select className="w-[279px] rounded-xl border-2  p-3 shadow md:w-auto lg:w-[270px]">
              <option value="">Select an option</option>
              <option value={price} onChange={() => setPrice("10000-20000")}>
                10000-20000
              </option>
              <option value={price} onChange={() => setPrice("20000-30000")}>
                20000-30000
              </option>
              <option value={price} onChange={() => setPrice("40000")}>
                30000-40000
              </option>
              <option value={price} onChange={() => setPrice("70000")}>
                50000 and above
              </option>
            </select>
          </label>
          <button className="flex w-full justify-center gap-3 rounded-3xl bg-[#0A83FF] p-3  text-white lg:mt-4 lg:rounded-3xl lg:p-5">
            <BsSearch />
            <span className="text-center md:hidden">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
