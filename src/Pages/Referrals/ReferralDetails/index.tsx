"use client";

import React, { useState } from "react";

import Heading from "@/components/lib/Heading";
import { ShortHorizontalLineIcon } from "@/components/lib/Svg";

import styles from "./Referral.module.scss";
import BalanceView from "./views/BalanceView";
import ReferralView from "./views/ReferralView";

const ReferralDetails = () => {
  const [showBalance, setShowBalance] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Heading type="h1" className="ml-[24px] py-4 text-[18px] lg:ml-[45px]">
          Referrals
        </Heading>
      </div>
      <div className=" mx-auto w-full lg:border">
        <div className="flex gap-4 pl-[24px] pt-[25px] lg:pl-[46px]">
          <div
            onClick={() => setShowBalance(false)}
            className={` ${
              !showBalance
                ? " text-base font-medium  text-[#101828]"
                : " text-base font-light text-[#667084]"
            } flex cursor-pointer flex-col gap-3`}
          >
            <p>Referral</p>
            {!showBalance ? <ShortHorizontalLineIcon /> : null}
          </div>
          <div
            onClick={() => setShowBalance(true)}
            className={` ${
              showBalance
                ? " text-base font-medium  text-[#101828]"
                : " text-base font-light text-[#667084]"
            } flex cursor-pointer flex-col gap-3`}
          >
            <p>Balance</p>
            {showBalance ? <ShortHorizontalLineIcon /> : null}
          </div>
        </div>
        {showBalance ? <BalanceView /> : <ReferralView />}
      </div>
    </div>
  );
};

export default ReferralDetails;
