"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import * as Yup from "yup";

import Button from "@/components/lib/Button";
import CopyToClipboard from "@/components/lib/CopyToClipboard";
import Heading from "@/components/lib/Heading";
import Input from "@/components/lib/Input";
import Loader from "@/components/lib/Loader";
import MaskString from "@/components/lib/MaskString/MaskString";
import { Pagination } from "@/components/lib/Pagination";
import { ArrowIcon } from "@/components/lib/Svg";
import Text from "@/components/lib/Text";
import { Switch } from "@/components/ui/switch";
import { useSuccessHandler } from "@/hooks";
import type { FundUserPayload } from "@/services/admin/payload";
import {
  useFundUserMutation,
  useGetBookingByUserIdQuery,
} from "@/services/admin/transaction";
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
type BookingHistoryProp = {
  id: string;
  type: string;
  price: string;
  paymentStatus: string;
  createdAt: string;
  bookingStatus: string;
};
const FundUserSchema = Yup.object({
  amount: Yup.number().min(1000).required("An amount is required"),
});

const CustomerDetails = ({ detailsData }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(FundUserSchema) });

  const pageLimit = 10;
  const userId = detailsData.id;

  const router = useRouter();

  const {
    data: bookingHistoryData,
    isSuccess,
    isLoading,
  } = useGetBookingByUserIdQuery({
    userId,
    pageLimit,
    currentPage,
  });
  const [fundUser, { isLoading: fundingLoading }] = useFundUserMutation();

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

  const historyData = bookingHistory.map((res: any) => {
    return {
      id: res?.id,
      type: res?.outing?.type,
      price: res?.cost,
      createdAt: res?.bookingDate?.createdAt,
      bookingStatus: res?.status,
      paymentStatus: res?.bookingPayment[0].status,
    };
  });

  useSuccessHandler({
    isSuccess,
    showToast: false,
    dependencies: [bookingHistoryData],
    successFunction() {
      if (bookingHistoryData?.result) {
        setBookingHistory(bookingHistoryData?.result);
      }
    },
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const onSubmit = (formValues: FundUserPayload) => {
    fundUser({ id: userId, data: formValues })
      .unwrap()
      .then((res: any) => {
        toast.success(
          `${res?.purpose} ₦${parseInt(res?.amount, 10).toLocaleString()} ${
            res?.status
          }` ?? "Successful"
        );
        reset();
      })
      .catch((error) => console.error(error));
    reset();
    setIsOpen(!isOpen);
  };

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

  const bookingColumn: ColumnDef<BookingHistoryProp>[] = [
    {
      accessorKey: "id",
      header: () => <div className="text-sm font-semibold">Booking ID</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex gap-1 font-dmSansRegular text-sm text-[#101828]`}
          >
            {MaskString(value.id)}
            <CopyToClipboard text={value.id} />
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: () => <div className="text-sm font-semibold">Type</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex gap-1 font-dmSansRegular text-sm capitalize text-[#101828]`}
          >
            {value.type}
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="text-sm font-semibold">Amount</div>,
      cell: ({ row }) => {
        const amount = parseInt(row.getValue("price"), 10).toLocaleString();
        return (
          <div
            className={`flex gap-1 font-dmSansRegular text-sm text-[#101828]`}
          >
            ₦{amount}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentStatus",
      header: () => <div className="text-sm font-semibold">Payment Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        const status = row.getValue("paymentStatus");
        return (
          <div
            className={`w-fit rounded-3xl px-3 py-1 text-center font-dmSansRegular text-sm text-[#101828] ${
              status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            {value.paymentStatus}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-sm font-semibold">Date</div>,
      cell: ({ row }) => {
        const value = row.original;
        return (
          <div
            className={`flex gap-1 font-dmSansRegular text-sm text-[#101828]`}
          >
            {standardDate(value.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "bookingStatus",
      header: () => <div className="text-sm font-semibold">Booking Status</div>,
      cell: ({ row }) => {
        const value = row.original;
        const status = row.getValue("bookingStatus");
        return (
          <div
            className={`w-fit rounded-3xl px-3 py-1 text-center font-dmSansRegular text-sm text-[#101828] ${
              status === "successful"
                ? "bg-[#E6FAF0] text-[#12B76A]"
                : "bg-[#FFECEB] text-[#F04438]"
            }`}
          >
            {value.bookingStatus}
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
          <Text className=" font-dmSansBold  text-2xl">Customer Info</Text>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="mx-auto flex h-[35px]  items-center justify-center gap-1 rounded-[100px] text-center text-xs"
            onClick={() => {}}
          >
            <RiEdit2Fill /> Edit
          </Button>
          <Button
            className="mx-auto flex h-[35px]  items-center justify-center gap-1 rounded-[100px] text-center text-xs"
            onClick={toggleModal}
          >
            Fund Account
          </Button>
          <Button
            className="mx-auto flex h-[35px] items-center justify-center gap-1 rounded-[100px] bg-[#F04438] text-center text-xs"
            onClick={() => {}}
          >
            <RiDeleteBin6Line /> Delete
          </Button>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-3">
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
                  ₦{parseInt(detailsData?.wallet?.amount, 10).toLocaleString()}
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
              Booking History
            </Text>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="mt-[24px]">
                <DataTable columns={bookingColumn} data={historyData} />
              </div>
            )}

            {isSuccess && (
              <Pagination
                className="pagination-bar my-8"
                currentPage={currentPage}
                totalCount={bookingHistoryData?.totalElements}
                pageLimit={pageLimit}
                onPageChange={(v) => setCurrentPage(v)}
              />
            )}
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
        {isOpen ? (
          <div>
            <div
              className="fixed inset-0 z-[31] bg-[#021A3366] opacity-75"
              onClick={toggleModal}
            ></div>
            <form
              className="fixed inset-0 left-[30px] z-[32] flex w-[326px] items-center justify-center lg:left-[510px] lg:w-[418px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full rounded-3xl bg-white p-5 shadow-lg">
                <div className="flex justify-between">
                  <Heading type="h3">Fund Wallet</Heading>
                  <p
                    className="cursor-pointer font-dmSansBold text-[16px] text-[#98A2B3]"
                    onClick={toggleModal}
                  >
                    X
                  </p>
                </div>
                <Input
                  label="Amount"
                  placeholder="Enter amount here"
                  type="number"
                  register={register("amount")}
                  errorMsg={errors.amount?.message}
                />
                <Button
                  type="submit"
                  className=" mt-5 w-full rounded-3xl"
                  loading={fundingLoading}
                >
                  Credit Account
                </Button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomerDetails;
