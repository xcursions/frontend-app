"use client";

import type { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

import { DataTable } from "@/components/admin/services/DataTable";
import Heading from "@/components/lib/Heading";
import { EyeIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import { useErrorHandler, useSuccessHandler } from "@/hooks";
import {
  useGetReferralHistoryQuery,
  useGetWalletBalanceQuery,
} from "@/services/user";
import type ReferralProps from "@/types/ReferralProps";

import styles from "../Referral.module.scss";

export type Payment = {
  id: string;
  name: string;
  email: string;
  status: string;
  image: string;
};

const BalanceView = () => {
  const [referralData, setReferralData] = useState<ReferralProps[]>([]);
  const [showBalance, setShowBalance] = useState(false);
  const { data, isSuccess, isError, error } = useGetReferralHistoryQuery();
  const { data: walletBalance } = useGetWalletBalanceQuery();
  useSuccessHandler({
    isSuccess,
    showToast: false,
    dependencies: [data],
    successFunction: () => {
      setReferralData(data.result);
    },
  });
  useErrorHandler({
    isError,
    error,
  });
  const profileImage = "/assets/images/icons/profile_avatar.jpeg";
  const tableData = referralData.map((res) => {
    return {
      image: res?.referredUser?.profile?.avatarUrl || profileImage,
      name: res?.referredUser?.profile?.fullName,
      email: res?.referredUser?.email,
      status: res?.status,
    };
  });

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-xs font-semibold">Name</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer items-center gap-3 text-[12px] font-medium text-[#101828]`}
          >
            <img
              src={value.image}
              alt={`${value.name}`}
              className="h-[24px] w-[24px] rounded-[100px]"
            />
            <span>{value.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="hidden text-xs font-semibold md:block">Email</div>
      ),
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={` hidden text-[12px] font-medium text-[#101828] md:block`}
          >
            {value.email}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-xs font-semibold">Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        const status = row.getValue("status");
        return (
          <div
            className={`w-fit rounded-3xl px-3 py-1 text-center text-[12px] font-medium text-[#101828] ${
              status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            {status === "successful" ? (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                >
                  <circle cx="3" cy="3" r="3" fill="#12B76A" />
                </svg>
                {value.status}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 6 6"
                  fill="none"
                >
                  <circle cx="3" cy="3" r="3" fill="#FF860A" />
                </svg>
                {value.status}
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Text className=" text-xxs leading-[160%] text-[#475467]">
        Total Balance
      </Text>
      <div
        className={`${
          showBalance ? "items-center" : " mt-2 items-start"
        } flex cursor-pointer gap-2`}
        onClick={() => setShowBalance(!showBalance)}
      >
        <Text className=" justify-center text-center font-dmSansBold text-[30px] leading-[130%] text-[#101828]">
          {showBalance ? (
            <>
              {parseInt(
                walletBalance?.user?.referralPointAccount?.amount ?? 0,
                10
              ).toLocaleString()}
              <span className="text-[20px]"> Points</span>
            </>
          ) : (
            "***"
          )}
        </Text>
        <EyeIcon />
      </div>
      <Heading className="mt-[26px] text-[16px] lg:mt-[36px] lg:text-[18px]">
        List of People Referred
      </Heading>
      <div className="lg:mt-[24px mt-[16px]">
        <DataTable
          data={tableData}
          // @ts-ignore
          columns={columns}
        />
      </div>
    </div>
  );
};

export default BalanceView;
