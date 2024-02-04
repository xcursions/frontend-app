"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";

import Button from "@/components/lib/Button";
import { ArrowIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import { Switch } from "@/components/ui/switch";
import type { IUser } from "@/types";
import { standardDate } from "@/utils/standardDate";

import { DataTable } from "../../services/DataTable";

type Props = {
  detailsData: IUser;
};

type Payment = {
  id: number;
  name: string;
  email: string;
  status: any;
  image: string;
};
const CustomerDetails = ({ detailsData }: Props) => {
  const router = useRouter();
  const data = detailsData?.userReferrals.map((res, idx) => {
    return {
      name: res?.referredUser?.profile?.fullName,
      email: res?.referredUser?.email,
      id: idx ? idx + 1 : 1,
      status: res?.status,
      image:
        res?.referredUser?.profile?.avatarUrl ||
        "/assets/images/icons/profile_avatar.jpeg",
    };
  });
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-sm font-semibold">S/N</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer items-center gap-3 text-xs font-medium text-[#101828]`}
          >
            <div className="flex flex-col font-dmSansMedium">
              <span>{value.id}.</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => <div className="text-sm font-semibold">Name</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex cursor-pointer items-center gap-3 text-xs font-medium text-[#101828]`}
          >
            <Image
              src={value.image}
              alt={`${value.name}`}
              width={50}
              height={50}
              className="h-[50px] w-[50px] rounded-full"
            />
            <div className="flex flex-col font-dmSansMedium">
              <span>{value.name}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => <div className="text-sm font-semibold">Email Address</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`cursor-pointer text-[14px]  font-medium text-[#101828]`}
          >
            {value.email}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-sm font-semibold">Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`max-w-max cursor-pointer rounded-2xl bg-[#E6FAF0] px-2 py-1 text-[14px] font-medium capitalize text-[#12B76A]`}
          >
            {value.status}
          </div>
        );
      },
    },
  ];
  return (
    <div className=" mx-[50px] pb-[80px] text-[#101828]">
      <div className="mx-auto mt-[40px] flex w-full justify-between">
        <div className="flex items-center gap-2">
          <span onClick={router.back} className="cursor-pointer">
            <ArrowIcon />
          </span>
          <Text className=" font-dmSansBold  text-2xl">Trip Details</Text>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="mx-auto flex h-[35px]  items-center justify-center gap-1 rounded-[100px] border-[#0A83FF] text-center text-xs"
            onClick={() => {}}
          >
            <RiEdit2Fill /> Edit
          </Button>
          <Button
            className="mx-auto flex h-[35px] items-center justify-center gap-1 rounded-[100px] bg-[#F04438] text-center text-xs"
            onClick={() => {}}
          >
            <RiDeleteBin6Line /> Delete
          </Button>
        </div>
      </div>
      <div className="mt-5 flex max-w-[875px] flex-col gap-3">
        <div className=" w-full bg-[#ffffff]">
          <div className=" p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              Personal Details
            </Text>
            <Image
              src={
                detailsData?.profile?.avatarUrl ||
                "/assets/images/icons/profile_avatar.jpeg"
              }
              alt={detailsData?.profile?.fullName}
              width={64}
              height={64}
              className="mt-[24px] h-[64px] w-[64px] rounded-full"
            />
            <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
              <div>
                <Text className="text-sm">Full name</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  {detailsData?.profile?.fullName}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Username</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  {detailsData?.profile?.username}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Email Address</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  {detailsData?.email}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Date Joined</Text>
                <Text className="font-dmSansBold text-sm font-bold capitalize">
                  {standardDate(detailsData?.createdAt)}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Last Time Updated</Text>
                <Text className="font-dmSansBold text-sm font-bold capitalize">
                  {standardDate(detailsData?.updatedAt)}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Status</Text>
                <Switch checked={!detailsData?.suspended} />
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full bg-[#ffffff]">
          <div className=" p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">Stats</Text>
            <div className="mt-[24px] grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-9">
              <div>
                <Text className="text-sm">Balance</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  ₦
                  {parseInt(
                    detailsData?.user_booking_info?.totalAmountPaid,
                    10
                  ).toLocaleString()}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Trips</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  {detailsData?.user_booking_info?.totalTour}
                </Text>
              </div>
              <div>
                <Text className="text-sm">Events</Text>
                <Text className="font-dmSansBold text-sm font-bold">
                  {detailsData?.user_booking_info?.totalEvent}
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full bg-[#ffffff]">
          <div className=" p-[24px]">
            <Text className="font-dmSansBold text-[16px] font-bold">
              Referral History
            </Text>
            <div className="mt-[24px]">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
