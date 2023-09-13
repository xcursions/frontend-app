"use client";

import Image from "next/image";
import React from "react";

import { Progress } from "@/components/ui/progress";
import type UpcomingPaymentProps from "@/types/UpcomingPaymentProps";

import { formatedDate } from "../FormatWeekRange/FormatWeekRage";
import Text from "../Text/Text";
import styles from "./UpcomingPaymentCard.module.scss";

type Props = {
  detailsData: UpcomingPaymentProps;
  view?: boolean;
};

const UpcomingPaymentCard = ({ detailsData, view }: Props) => {
  const percentagePaid =
    (parseFloat(detailsData.amountSaved) * 100) /
    (parseFloat(detailsData.amountSaved) +
      parseFloat(detailsData.remainingAmountToBeCharged));
  const amountDue =
    parseFloat(detailsData.remainingAmountToBeCharged) /
    detailsData.remainingTrials;
  return (
    <div className={view ? `${styles.container1}` : `${styles.container}`}>
      <div className="m-[12px]">
        <div className={view ? `${styles.top1}` : `${styles.top}`}>
          <Image
            src={detailsData.outing.outingGallery[0].image}
            alt={detailsData.outing.name}
            width={101}
            height={110}
            className={view ? `${styles.image1}` : `${styles.image}`}
          />
          <div>
            <Text className={styles.title}>{detailsData.outing.name}</Text>
            <Text className="mt-[10px] text-[12px] text-[#475467]">
              Amount Due:{" "}
              <span className={styles.title}>
                ₦{Math.ceil(amountDue).toLocaleString()}
              </span>
            </Text>
            <Text className="mt-[10px] text-[12px] text-[#475467]">
              Deadline:{" "}
              <span className="rounded-3xl bg-[#FFECEB] p-3 text-[#F04438]">
                {formatedDate(detailsData.nextChargeDate)}
              </span>
            </Text>
          </div>
        </div>
        <div className={styles.progress}>
          <Progress value={percentagePaid} className="w-[100%]" />
          <span className="font-dmSansBold text-[12px] text-[#667084]">
            {Math.ceil(percentagePaid)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPaymentCard;
