"use client";

import React, { useState } from "react";

import Heading from "@/components/lib/Heading/Heading";
import Input from "@/components/lib/Input/Input";

// import MultipleValues from "@/components/lib/Input/MultiInput/MultipleValuesInput";
import styles from "./Header.module.scss";

const Header = () => {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  return (
    <div className={styles.header_wrapper}>
      <div className={`${styles.header}`}>
        <div className={styles.header_content__wrap}>
          <h1 className={styles.lead_header_txt}>
            Travel, enjoy and live a new and full life
          </h1>
          <p className={styles.lead_sub_txt}>
            Built Wicket longer admire do barton vanity itself do in it.
            Preferred to sportsmen it engrossed listening. Park gate sell they
            west hard for the.
          </p>
        </div>
      </div>
      <div className={`${styles.search} `}>
        <div>
          <Heading
            type="h3"
            className="items-center py-4 text-center text-[#101828]"
          >
            Where are you going
          </Heading>
        </div>
        <div className="mx-auto flex flex-col items-center justify-center gap-5 py-4 text-center md:flex-row">
          <label className="flex flex-col">
            Location
            <select className="w-[279px]">
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
            className="w-[279px]"
          />
          <label className="flex flex-col">
            Price
            <select className="w-[279px]">
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
        </div>
      </div>
    </div>
  );
};

export default Header;
